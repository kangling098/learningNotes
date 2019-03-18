"use strict";


const fs = require('fs');
const path = require('path');
const { ConcatSource, RawSource } = require("webpack-sources");
const ModuleFilenameHelpers = require("webpack/lib/ModuleFilenameHelpers");
const SourceMapDevToolModuleOptionsPlugin = require("webpack/lib/SourceMapDevToolModuleOptionsPlugin");
// 文件夹压缩包
const compressing = require('compressing');

const createHash = require("webpack/lib/util/createHash");

const VError = require('verror');
const request = require('request');
const isString = require('lodash.isstring');
const reduce = require('lodash.reduce');
const get = require('lodash.get');


const basename = name => {
	if (!name.includes("/")) return name;
	return name.substr(name.lastIndexOf("/") + 1);
};
const handleError = function(err, prefix = 'FastTrackPlugin') {
  if (!err) {
    return [];
  }

  const errors = [].concat(err);
  return errors.map(e => new VError(e, prefix));
}
// 同步递归删除文件夹
function rmSync(dir) {
  try {
    let stat = fs.statSync(dir);
    if (stat.isFile()) {
      fs.unlinkSync(dir);
    } else {
      let files=fs.readdirSync(dir);
      files
          .map(file => path.join(dir,file))
          .forEach(item=>rmSync(item));
      fs.rmdirSync(dir);
    }
  } catch (e) {
    console.log('删除失败!');
  }
}
// 使用WeakMap做缓存
const assetsCache = new WeakMap();

const getTaskForFile = (file, chunk, options, compilation) => {
  const asset = compilation.assets[file];
	const cache = assetsCache.get(asset);
	if (cache && cache.file === file) {
		for (const cachedFile in cache.assets) {
			compilation.assets[cachedFile] = cache.assets[cachedFile];
			if (cachedFile !== file) chunk.files.push(cachedFile);
		}
		return;
	}
	let source, sourceMap;
	if (asset.sourceAndMap) {
		const sourceAndMap = asset.sourceAndMap(options);
		sourceMap = sourceAndMap.map;
		source = sourceAndMap.source;
	} else {
		sourceMap = asset.map(options);
		source = asset.source();
	}
	if (sourceMap) {
		return {
			chunk,
			file,
			asset,
			source,
			sourceMap,
			modules: undefined
		};
	}
};



class FastTrackPlugin {
	/**
	 * @param {SourceMapDevToolPluginOptions=} options options object
	 */
	constructor(options = {}) {
		if (arguments.length > 1) {
			throw new Error(
				"SourceMapDevToolPlugin only takes one argument (pass an options object)"
			);
    }
    // 上传地址
    this.updateUrl = options.updateUrl || '';
    // 是否禁用
    this.disabled = typeof options.disabled === 'undefined' ? false : !!options.disabled;
    // 是否禁止提示
    this.silent = typeof options.silent === 'undefined' ? false : !!options.silent;
		// validateOptions(schema, options, "SourceMap DevTool Plugin");
    // 定义生成的 source map 的名称 这里filename写死 
		this.sourceMapFilename = 'fastTrackerSourcemaps/placeholder/[file].map';
		/** @type {string | false} */
		this.sourceMappingURLComment =
			options.append === false
				? false
				: options.append || "\n//# sourceMappingURL=[url]";
		this.moduleFilenameTemplate =
			options.moduleFilenameTemplate || "webpack://[namespace]/[resourcePath]";
		this.fallbackModuleFilenameTemplate =
			options.fallbackModuleFilenameTemplate ||
			"webpack://[namespace]/[resourcePath]?[hash]";
		this.namespace = options.namespace || "";
    this.options = options;
    this.includeChunks = [];
    // 输出路径
    this.outputPath = ''; 
	}

	apply(compiler) {
    console.log(compiler)
    if(this.disabled) return;
    this.outputPath = get(compiler, 'options.output.path', '');
		const sourceMapFilename = this.sourceMapFilename;
		const sourceMappingURLComment = this.sourceMappingURLComment;
		const moduleFilenameTemplate = this.moduleFilenameTemplate;
		const namespace = this.namespace;
		const fallbackModuleFilenameTemplate = this.fallbackModuleFilenameTemplate;
		const requestShortener = compiler.requestShortener;
		const options = this.options;
		options.test = options.test || /\.(m?js|css)($|\?)/i;

		const matchObject = ModuleFilenameHelpers.matchObject.bind(
			undefined,
			options
		);

		compiler.hooks.compilation.tap("SourceMapDevToolPlugin", compilation => {
			new SourceMapDevToolModuleOptionsPlugin(options).apply(compilation);

			compilation.hooks.afterOptimizeChunkAssets.tap(
				{
					name: "SourceMapDevToolPlugin",
					context: true
				},
				(context, chunks) => {
					const moduleToSourceNameMapping = new Map();
					const reportProgress =
						context && context.reportProgress
							? context.reportProgress
							: () => {};

					const files = [];
					for (const chunk of chunks) {
						for (const file of chunk.files) {
							if (matchObject(file)) {
								files.push({
									file,
									chunk
								});
							}
						}
					}

					reportProgress(0.0);
					const tasks = [];
					files.forEach(({ file, chunk }, idx) => {
						reportProgress(
							(0.5 * idx) / files.length,
							file,
							"generate SourceMap"
						);
						const task = getTaskForFile(file, chunk, options, compilation);

						if (task) {
							const modules = task.sourceMap.sources.map(source => {
								const module = compilation.findModule(source);
								return module || source;
							});

							for (let idx = 0; idx < modules.length; idx++) {
								const module = modules[idx];
								if (!moduleToSourceNameMapping.get(module)) {
									moduleToSourceNameMapping.set(
										module,
										ModuleFilenameHelpers.createFilename(
											module,
											{
												moduleFilenameTemplate: moduleFilenameTemplate,
												namespace: namespace
											},
											requestShortener
										)
									);
								}
							}

							task.modules = modules;

							tasks.push(task);
						}
					});

					reportProgress(0.5, "resolve sources");
					const usedNamesSet = new Set(moduleToSourceNameMapping.values());
					const conflictDetectionSet = new Set();

					// all modules in defined order (longest identifier first)
					const allModules = Array.from(moduleToSourceNameMapping.keys()).sort(
						(a, b) => {
							const ai = typeof a === "string" ? a : a.identifier();
							const bi = typeof b === "string" ? b : b.identifier();
							return ai.length - bi.length;
						}
					);

					// find modules with conflicting source names
					for (let idx = 0; idx < allModules.length; idx++) {
						const module = allModules[idx];
						let sourceName = moduleToSourceNameMapping.get(module);
						let hasName = conflictDetectionSet.has(sourceName);
						if (!hasName) {
							conflictDetectionSet.add(sourceName);
							continue;
						}

						// try the fallback name first
						sourceName = ModuleFilenameHelpers.createFilename(
							module,
							{
								moduleFilenameTemplate: fallbackModuleFilenameTemplate,
								namespace: namespace
							},
							requestShortener
						);
						hasName = usedNamesSet.has(sourceName);
						if (!hasName) {
							moduleToSourceNameMapping.set(module, sourceName);
							usedNamesSet.add(sourceName);
							continue;
						}

						// elsewise just append stars until we have a valid name
						while (hasName) {
							sourceName += "*";
							hasName = usedNamesSet.has(sourceName);
						}
						moduleToSourceNameMapping.set(module, sourceName);
						usedNamesSet.add(sourceName);
					}
					tasks.forEach((task, index) => {
						reportProgress(
							0.5 + (0.5 * index) / tasks.length,
							task.file,
							"attach SourceMap"
						);
						const assets = Object.create(null);
						const chunk = task.chunk;
						const file = task.file;
						const asset = task.asset;
						const sourceMap = task.sourceMap;
						const source = task.source;
						const modules = task.modules;
						const moduleFilenames = modules.map(m =>
							moduleToSourceNameMapping.get(m)
						);
						sourceMap.sources = moduleFilenames;
						if (options.noSources) {
							sourceMap.sourcesContent = undefined;
						}
						sourceMap.sourceRoot = options.sourceRoot || "";
						sourceMap.file = file;
						assetsCache.set(asset, { file, assets });
						/** @type {string | false} */
						let currentSourceMappingURLComment = sourceMappingURLComment;
						if (
							currentSourceMappingURLComment !== false &&
							/\.css($|\?)/i.test(file)
						) {
							currentSourceMappingURLComment = currentSourceMappingURLComment.replace(
								/^\n\/\/(.*)$/,
								"\n/*$1*/"
							);
						}
            const sourceMapString = JSON.stringify(sourceMap);
						let filename = file;
            let query = "";
            const idx = filename.indexOf("?");
            if (idx >= 0) {
              query = filename.substr(idx);
              filename = filename.substr(0, idx);
            }
            let sourceMapFile = compilation.getPath(sourceMapFilename, {
              chunk,
              filename: options.fileContext
                ? path.relative(options.fileContext, filename)
                : filename,
              query,
              basename: basename(filename),
              contentHash: createHash("md4")
                .update(sourceMapString)
                .digest("hex")
            });
            const sourceMapUrl = options.publicPath
              ? options.publicPath + sourceMapFile.replace(/\\/g, "/")
              : path
                  .relative(path.dirname(file), sourceMapFile)
                  .replace(/\\/g, "/");
            if (currentSourceMappingURLComment !== false) {
              assets[file] = compilation.assets[file] = new ConcatSource(
                new RawSource(source),
                currentSourceMappingURLComment.replace(
                  /\[url\]/g,
                  sourceMapUrl
                )
              );
            }
            assets[sourceMapFile] = compilation.assets[
              sourceMapFile
            ] = new RawSource(sourceMapString);
            chunk.files.push(sourceMapFile);
					});
					reportProgress(1.0);
				}
			);
    });

    // 文件上传相关代码
    // 在文件输出之后,挂上钩子函数
    if (compiler.hooks) {
      compiler.hooks.afterEmit.tapAsync('after-emit', this.afterEmit.bind(this));
    } else {
      compiler.plugin('after-emit', this.afterEmit.bind(this));
    }
  }

  afterEmit(compilation, cb) {
    this.uploadSourceMaps(compilation, (err) => {
      if (err) {
        compilation.warnings.push(...handleError(err))
      }
      cb();
    });
  }

  getAssets(compilation) {
    const { includeChunks } = this;
    const { chunks } = compilation.getStats().toJson();

    return reduce(chunks, (result, chunk) => {
      const chunkName = chunk.names[0];
      if (includeChunks.length && includeChunks.indexOf(chunkName) === -1) {
        return result;
      }

      const sourceFile = find(chunk.files, file => /\.js$/.test(file));
      const sourceMap = find(chunk.files, file => /\.js\.map$/.test(file));

      if (!sourceFile || !sourceMap) {
        return result;
      }

      return [
        ...result,
        { sourceFile, sourceMap }
      ];
    }, {});
  }
  
  getPublicPath(sourceFile) {
    if (isString(this.publicPath)) {
      return `${this.publicPath}/${sourceFile}`;
    }
    return this.publicPath(sourceFile);
  }

  uploadSourceMap(compilation, zlibEntryPath, zlibOutputPath, cb) {
    
    // fs.createReadStream(this.zlibOutputPath).pipe(fs.createWriteStream('doodle.zip'),()=>{
    //   console.log(222)
    // })

    // 文件上传
    console.log('this.updateUrl', this.updateUrl)
    var r = request.post(this.updateUrl, (err, httpResponse, body) => {
      console.log('err, httpResponse, body \r\n\r\n', err, httpResponse, body)
      if (err && !this.silent) {
        console.log('fastTracker upload error \r\n', err)
      }
      // try {
      //   // 删除文件夹
      //   rmSync(zlibEntryPath)
      // } catch (e) {
      //   console.log('e',e)
      // }
      // try {
      //   // 删除压缩文件包
      //   console.log('uploadSourceMap', zlibOutputPath)
      //   fs.unlink(zlibOutputPath,(err) => console.log(err))
      // } catch (e) {
      //   console.log(e)
      // }
      
    })
    var form = r.form();
    // form.append('my_field', 'my_value');
    if (this.publicPath) {
      form.append('public_path', this.publicPath);
    }
    form.append('zip_file', fs.createReadStream(zlibOutputPath), {filename: 'fastTrackerSourcemaps.zip'});

    console.log('form  \r\n\r\n',form)
    console.log(' \r\n\r\n333')
    // fs.createReadStream(this.zlibOutputPath).pipe(request.post('http://mysite.com/obj.json'))
    
  }
  uploadSourceMaps(compilation, cb) {
    const self = this;

    // 获取压缩文件
    const outputPath = this.outputPath;
    const zlibEntryPath = this.zlibEntryPath = path.resolve(outputPath, 'fastTrackerSourcemaps');
    const zlibOutputPath = this.zlibOutputPath = path.resolve(outputPath, 'fastTrackerSourcemaps.zip');
    compressing.zip.compressDir(zlibEntryPath, zlibOutputPath)
    .then(function(data) {
      self.uploadSourceMap(compilation, zlibEntryPath, zlibOutputPath, cb)
    })
    .catch((err) => console.log('err', err));


    // console.log(compilation)
    // console.log('compilation', compilation)
    // this.uploadSourceMap(compilation, zlibOutputPath, cb)

  }
}

module.exports = FastTrackPlugin;