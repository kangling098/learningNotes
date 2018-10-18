// ### 53 2018年10月17日
// 用堆实现求一个数组前k大值的函数`maxk(A, k)`
function maxk(A, k) { // 时间复杂度O(nlgn)
    if(k>=A)return A;

    const list = new Heap(A);
    const arr = [] 
    while (k) {
        arr[--k] = list.extract();
    }
    return arr
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
const A = [10,7,5,6,4,3,2,1,9,8]
console.log(maxk(A,5))
console.log(A)