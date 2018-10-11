// ### 49 2018年10月11日
// 写一个程序has_cycle检查一个链表是否有循环应用。

// 解法一: 时间复杂度O(n) 使用WeakMap,用来判断是否有重复引用,而且由于WeakMap不会计入引用计数,所以不会影响垃圾回收
const has_cycle = list => {
    let p = list.head;
    const hash = new WeakMap;
    while (p) {
        if (hash.has(p)) {
            return true;
        }
        hash.set(p);
        p = p.next;
    }
    return false;
}