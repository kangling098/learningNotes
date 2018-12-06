// const messageQueue = () => {
//     let isRun = false
//     let queue = new queue(1000)
//     return () => {
//         if(isRun) return 
//         isRun = true
//         queue.
//     }
// }
class MessageQueue {
    constructor(max){
        this.isRun = false
        this.max = max
        this.queue = new queue(max)
    }
    push (message) {
        if(this.queue.size)
        this.queue.enqueue(data)
    }
    get () {
        return this.queue.enqueue()
    }
    showMessage () {
        if(this.isRun) return 
        this.isRun = true
        
        let id = setTimeout(() => {
            const data = this.get()
            if(data){
                
            }
        }, 3);
        
    }
}