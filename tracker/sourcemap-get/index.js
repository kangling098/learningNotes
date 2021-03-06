var fs = require('fs'),  
  path = require('path'),  
  sourceMap = require('source-map')  
  
// 要解析的map文件路径./test/vendor.8b1e40e47e1cc4a3533b.js.map  
const path1 = path.resolve(__dirname, './5.d06f7c35.async.js.map')
// 读取map文件，实际就是一个json文件  
    var rawSourceMap = fs.readFileSync(path1).toString();  
    // 通过sourceMap库转换为sourceMapConsumer对象  
    var consumer =  new sourceMap.SourceMapConsumer(rawSourceMap).then(data => {
      consumer = data;
    // 传入要查找的行列数，查找到压缩前的源文件及行列数  
    var sm = consumer.originalPositionFor({  
      line: 1,  // 压缩后的行数  
      column: 1983  // 压缩后的列数  
    });  
    // 压缩前的所有源文件列表  
    var sources = consumer.sources;  
    // 根据查到的source，到源文件列表中查找索引位置  
    var smIndex = sources.indexOf(sm.source);  
    // 到源码列表中查到源代码  
    var smContent = consumer.sourcesContent[smIndex];  
    // 将源代码串按"行结束标记"拆分为数组形式  
    const rawLines = smContent.split(/\r?\n/g);  
    // 输出源码行，因为数组索引从0开始，故行数需要-1  
    console.log(rawLines[sm.line]);  
    });  
    