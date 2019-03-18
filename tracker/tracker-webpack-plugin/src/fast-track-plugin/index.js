const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const OSS = require('ali-oss');
const request = require('request');
const {isObject, isString, get} = require('lodash');
const { handleError, validateOptions } = require('./helpers');
const { DEFAULT_STS_URL } = require('./constants');

function FastTrackPlugin({
  app_key, // APP密钥
  prefix_path = '', // 不填时,我们上传的文件目录与 webpack outputPath 下的文件目录一致,填了prefix_path之后,会在目录之前增加目录前缀
  project_data = {}, // 当前项目相关数据 包含 product_code app_code
  sts_url = DEFAULT_STS_URL, // 获取STS接口
  is_delete_source_map = true, // 是否删除生成的sourceMap文件,默认删除
}) {
  this.app_key = app_key;
  this.prefix_path = prefix_path;
  this.project_data = project_data;
  this.project_data.timestamp = ~~(Date.now()/1000); 
  this.sts_url = sts_url;
  this.is_delete_source_map = is_delete_source_map;
  this.ignore_files = [];

  const hmac = crypto.createHmac('sha1',this.app_key);
  const string = Object.keys(this.project_data).sort().map((val) => val + '=' + this.project_data[val]).join('&');
  hmac.update(string);
  this.signature = hmac.digest('hex');
  this.final_sts_url = this.sts_url + '?' + string + '&signature=' + this.signature;
}
// 文件输出之后回调
FastTrackPlugin.prototype.afterEmit = function(compilation, cb) {
  const errors = validateOptions(this);

  if (errors) {
    compilation.errors.push(...handleError(errors));
    return cb();
  }

  this.uploadSourceMaps(compilation, (err) => {
    if (err) {
      compilation.errors.push(...handleError(err));
    }
    cb();
  });
}

// 插件调用处
FastTrackPlugin.prototype.apply = function(compiler) {
  this.outputPath = get(compiler, 'options.output.path', '');
  if (compiler.hooks) {
    compiler.hooks.afterEmit.tapAsync('after-emit', this.afterEmit.bind(this));
  } else {
    compiler.plugin('after-emit', this.afterEmit.bind(this));
  }
}

FastTrackPlugin.prototype.isMinOrMap = function(file) {
  return /\.js$/.test(file) || /\.js\.map$/.test(file)
}

FastTrackPlugin.prototype.isMap = function(file) {
  return /\.js\.map$/.test(file)
}

FastTrackPlugin.prototype.deepUpload = function(dir, compilation, callback) {
  const self = this;
  fs.readdir(dir,(err, files) => {
    if (err) compilation.errors.push(...handleError(err));

    !function next(index) {
      if(index == files.length){
        return callback();
      }
      let child = path.join(dir,files[index]);

      fs.stat(child,(err, stat)=>{
        if (err) compilation.errors.push(...handleError(err));

        if (stat.isDirectory()) {
          self.deepUpload(child, () => next(index+1));
        } else {
          if (self.isMinOrMap(child)) {
            let relativePath = child.replace(self.outputPath, '');
            if (relativePath.startsWith('\\')) {
              relativePath = relativePath.replace('\\', '');
            }
            if (relativePath.startsWith('/')) {
              relativePath = relativePath.replace('/', '');
            }
            relativePath = path.join(self.oss_prefix_path, self.prefix_path, relativePath).replace(/\\/g, '/');

            // 对oss中是否存在文件进行判断 存在该文件时,判断是否为map文件,如果是map文件,再根据配置决定是否删除
            if (self.ignore_files.includes(relativePath)) {

              self.dealFile(child)
            } else {
              self.ossClient.put(relativePath, fs.createReadStream(child)).then((result) => {
                self.dealFile(child);
              }).catch( err => {
                console.log('err', err)
                self.dealFile(child);
              })
            }
            
            
          };
          next(index+1);
        }
      })
    }(0)
  })
}

FastTrackPlugin.prototype.dealFile = function(file) {
  if (this.isMap(file) && this.is_delete_source_map) {
    fs.unlink(file, (err) => {
      if (err) console.log(err)
    })
  }
}

FastTrackPlugin.prototype.uploadSourceMaps = function(compilation, cb) {
  const self = this;
  // 获取sts完整url
  const final_sts_url = this.final_sts_url;
  request(final_sts_url, (error, response, body) => {
    if(error) return compilation.errors.push(...handleError(error)) && cb();
    let bodyData;
    try {
      bodyData = JSON.parse(body);
    } catch (e) {
      return compilation.errors.push(...handleError(e)) && cb();
    }
    bodyData = isObject(bodyData) ? bodyData : {};

    // 非result === true,展示原因
    if (!bodyData.result) return console.log(bodyData.msg || 'STS权限获取失败')
    const secureData = bodyData.data;
    const credentials = secureData.credentials;
    try {
      self.ossClient = new OSS({
        endpoint: secureData.endpoint,
        accessKeyId: credentials.AccessKeyId,
        accessKeySecret: credentials.AccessKeySecret,
        stsToken: credentials.SecurityToken,
        bucket: secureData.bucket,
      });
    } catch (e) {
      return compilation.errors.push(...handleError(e)) && cb();
    }

    self.oss_prefix_path = secureData.sourcemap_path; // oss文件存储路径

    // 获取oss端已存在的oss文件名
    self.ossClient.list({
      prefix: secureData.sourcemap_path + '/',
    }).then((data) => {

      self.ignore_files = Array.isArray(data.objects) ? data.objects.map( v => v.name ) : [];
      // 获取压缩文件和sourceMap文件
      const outputPath = path.resolve(__dirname, self.outputPath);

      fs.access(outputPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (err) return compilation.errors.push(...handleError(err)) && cb();
        this.deepUpload(outputPath, compilation, cb)
      });

    }).catch((e) => {
      compilation.errors.push(...handleError(e)) && cb();
    })
    
  });
}


module.exports = FastTrackPlugin;