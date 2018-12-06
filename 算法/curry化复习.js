const curry = (fn, ...oldArgs) => {
    const g = (...newArgs) => oldArgs.length + newArgs.length >= fn.length ? fn(...oldArgs,...newArgs) : (...args) => g(...newArgs,...args))
    return g
}