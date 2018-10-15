// 51 2018年10月15日
// 观看数据结构堆一节，实现建堆build和max_heapify(i)操作，构建一个最大堆。
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