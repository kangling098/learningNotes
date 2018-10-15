51 2018年10月15日
观看数据结构堆一节，实现建堆build和max_heapify(i)操作，构建一个最大堆。
```js
class Heap {
  constructor(data, Max = 10000){
    this.list = Array(Max)
    for(let i = 0; i < data.length; i++) {
      this.list[i] = data[i]
    }
    this.heapSize = data.length
    this.build()
  }

  build(){
    /// TODO
  }

  max_heapify(i) {
    /// TODO 
  }
}

const heap = new Heap([2,5,8,3,7,12,9,6])
console.log(heap.list)
// [ 12, 7, 9, 6, 5, 8, 2, 3, <9992 empty items> ]
```

解法一:
```js

class Heap {
    constructor(data, Max = 10000) {
        this.list = Array(Max)
        for (let i = 0; i < data.length; i++) {
            this.list[i] = data[i]
        }
        this.heapSize = data.length
        this.build()
    }

    build() {
        let k = ~~(this.heapSize / 2) - 1;
        while (k >= 0) {
            this.max_heapify(k--);
        }
    }

    max_heapify(i) {
        let h = this.list[i];
        let l = this.list[2 * i + 1];
        let r = this.list[2 * i + 2];
        let max;
        if (l === undefined) {
            return;
        } else if (r === undefined) {
            max = Math.max(h, l);
        } else {
            max = Math.max(h, l, r);
        }
        if (max === l) {
            this.swap(i, 2 * i + 1);
            this.max_heapify(2 * i + 1)
        } else if (max === r) {
            this.swap(i, 2 * i + 2);
            this.max_heapify(2 * i + 2)
        }
    }
    swap(i, j) {
        let hash = this.list[i]
        this.list[i] = this.list[j];
        this.list[j] = hash;
    }
}

const heap = new Heap([2, 5, 8, 3, 7, 12, 9, 6])
console.log(heap.list)
// [ 12, 7, 9, 6, 5, 8, 2, 3, <9992 empty items> ]

```
标准答案:
```js
function swap(A, i, j) {
  const t = A[i]
  A[i] = A[j]
  A[j] = t
}
class Heap {
  constructor(data, Max = 10000){
    this.list = Array(Max)
    for(let i = 0; i < data.length; i++) {
      this.list[i] = data[i]
    }
    this.heapSize = data.length
    this.build()
  }

  build(){
    let i = Math.floor(this.heapSize / 2) - 1
    while(i >= 0) {
      this.max_heapify(i--)
    }
  }

  max_heapify(i) {
    const leftIndex = 2*i + 1
    const rightIndex = 2*i + 2
    let maxIndex = i
    if(leftIndex < this.heapSize && this.list[leftIndex] > this.list[maxIndex]) {
      maxIndex = leftIndex
    }
    if(rightIndex < this.heapSize && this.list[rightIndex] > this.list[maxIndex]) {
      maxIndex = rightIndex
    }
    if(i !== maxIndex) {
      swap(this.list, maxIndex, i)
      this.max_heapify(maxIndex)
    }
  }
}
```