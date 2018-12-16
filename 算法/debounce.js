function throttle(fn,wait){
    let prev = 0
    return function(...args){
        const context = this
        const now = Date.now()
        if(now - prev > wait){
            fn.apply(context,args)
            prev = now
        }
    }
}
const b = throttle(()=>{console.log(100)},10000)
setInterval(function(){
    b()
},500)
function debounce(fn,wait){
    let timer
    return function(...args){
        const context = this
        clearTimeout(timer)
        timer = setTimeout(function(){
            fn.apply(context,args)
            
        },wait)
    }
}
const a = debounce(()=>{console.log(100)},2000)
a()