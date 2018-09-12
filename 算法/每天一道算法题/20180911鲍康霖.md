### 30 2018年9月11日
学习「计数排序」一节，写一个函数`sort`，将计数排序改写成一个可以用来排序字符串算法，忽略大小写。


```
sort('javascript') // aacijprstv
sort('dbca') // abcd
```


### 附加题
学习「外部排序」节中描述的算法。如果磁盘上有90M个整数需要排序，但内存不足，最多读入10M个整数。如何将磁盘文件排序。最大允许使用内存空间100M。

注：32位整数，一个占4字节。所以10M数据，占40M字节，但是考虑其他（比如nodejs程序）允许额外使用60M的空间。 

目的： 训练node.js流和缓冲区使用技巧，锻炼实战能力。

1. 使用node.js生成90M个32位数字，存储到文件。要求数字按照二进制存储。 
2. 按照「外部排序」一节中的算法对90M数据进行排序，每次最多只能读入10M数据。
3. 请使用node --max-old-space-size=100 来限制自己使用的内存不超过100M。


周六直播课公布答案。


答案一:
```js
const sort = str => [...str].sort((x,y)=>x.toLowerCase().charCodeAt() - y.toLowerCase().charCodeAt()).join('')
console.assert(sort('javascript')==='aacijprstv','sort example 01 wrong')
console.assert(sort('dbca')==='abcd','sort example 02 wrong')
console.log(sort('javascript'))
```
