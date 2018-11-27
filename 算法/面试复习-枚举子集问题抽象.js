function find_subsets(S,decision){
    if(S.length === decision.length){
        let str = '';
        decision.forEach((val,key)=>{
            console.log(val,key,S[key])
            if(val) str += S[key]
        })
        return [str]
    }
    let r = [];
    r = r.concat(find_subsets(S,decision.concat(true)))
    r = r.concat(find_subsets(S,decision.concat(false)))
    return r
}
console.log(find_subsets(['a','b','c','d'],[]))