## loader中的pitch的介绍
The loaders are called from right to left. 
loader的调用是从右向左的
But in some cases loaders do not care about the results of the previous loader or the resource. 
但是在某些情况下，loader并不在乎之前的loader和资源
They only care for metadata. 
他们只关心原始的内容
The pitch method on the loaders is called from left to right before the loaders are called.
在loaders上的pitch方法在所有的loaders被调用之前从左向右调用

 If a loader delivers a result in the pitch method 
如果说一个loader在pitch 方法中传递了一个result
the process turns around and skips the remaining loaders,
这个流程会转身并且调用剩下的loader 
 continuing with the calls to the more left loaders.
继续执行左边剩下的loader
 data can be passed between pitch and normal call.
数据可以在pitch方法和normal调用之间传递
In the complex case, when multiple loaders are chained, 
在复杂的情况下，当多个loader被链式调用的时候
only the last loader gets the resource file 
只有最后边的loader能获取到资源文件
and only the first loader is expected to give back one or two values (JavaScript and SourceMap).
只有最左边的loader被期待返回一个可以在浏览器中执行脚本
 Values that any other loader give back are passed to the previous loader.
任何的loader返回的值都被传递给了上一下loader