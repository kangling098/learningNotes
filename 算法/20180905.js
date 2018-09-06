// ```sc("Aab")``` 返回 ```"Aa"```

// ```sc("AabBc")``` 返回 ```"AabB"```

// ```sc("AaaaAaab")``` 返回 ```"AaaaAaa"```

// ```sc("aAAAaAAb")``` 返回 ```"aAAAaAA"```

const sc = s => {
    let o = {};
    for(let i of s){
        o[i] = 1
    }
    for(let v in o){
        o[v.toLowerCase()] && o[v.toUpperCase()] ? 0 : s = s.replace(new RegExp(v,'g'),'')
    }
    return s
}

const sc = s => [...s].filter(v=>s.includes(v.toLowerCase())&&s.includes(v.toUpperCase())).join('')

console.assert(sc("Aab") === 'Aa')
console.assert(sc("AabBc") === 'AabB')
console.assert(sc("AaaaAaab") === 'AaaaAaa')
console.assert(sc("aAAAaAAb") === 'aAAAaAA')
console.log(sc('FfATherurTheR'))