export default function bindActionCreators(actions,dispatch){
    // actions = {add(){return {type:ADD}},minus(){return {type:MINUS}}}
    // let newActions = {};
    // for (let key in actions){
    //     newActions[key] = ()=>{
    //         return dispatch(actions[key]())
    //     }
    // }
    // return newActions;
    return Object.keys(actions).reduce(
        (memo,key)=>{
            memo[key] = (...args)=>dispatch(actions[key](...args));
            return memo
        },{})
}