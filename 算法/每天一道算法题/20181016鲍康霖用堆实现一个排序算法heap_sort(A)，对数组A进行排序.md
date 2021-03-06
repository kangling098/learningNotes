52 2018年10月16日 答案
用堆实现一个排序算法heap_sort(A)，对数组A进行排序

解法一:
```js
function heap_sort(A) { // 时间复杂度O(nlgn)
    let list = new Heap(A);
    console.log(list.list)
    while (list.heapSize) {
        A[list.heapSize - 1] = list.extract();
    }
    return A
}
class Heap {
    constructor(data, Max = 10000) {
        this.list = data
        this.heapSize = data.length
        this.build()
    }
    extract() {
        if (this.heapSize === 0) return null;
        let item = this.list[0];
        this.swap(0, this.heapSize - 1);
        this.heapSize--
        this.max_heapify(0);
        return item;
    }

    build() {
        let k = ~~(this.heapSize / 2) - 1;
        while (k >= 0) {
            this.max_heapify(k--);
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
        this.swap( maxIndex, i)
            this.max_heapify(maxIndex)
        }
    }
    swap(i, j) {
        let hash = this.list[i]
        this.list[i] = this.list[j];
        this.list[j] = hash;
    }
}
const A = [33, 44, 22, 11, 3, 5, 6, 7, 43, 234, 3]
console.log(heap_sort(A))
console.log(A)
```


标准答案:
```js
function swap(A, i, j) {
  const t = A[i]
  A[i] = A[j]
  A[j] = t
}
class MaxHeap{
  constructor(data){
    this.list = data
    this.heapSize = data.length
    this.build()
  }

  build(){
    let i = Math.floor(this.heapSize/2) - 1
    while(i >= 0) {
      this.max_heapify(i--)
    }
  }

  extract() {
    if (this.heapSize === 0) return null
    const item = this.list[0]
    swap(this.list, 0, this.heapSize - 1)
    this.heapSize--
    this.max_heapify(0)
    return item
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

function heap_sort(A){
  const heap = new MaxHeap(A)
  console.log(heap.list)
  while(heap.heapSize > 0){
    A[heap.heapSize-1] = heap.extract()
  }
}
```