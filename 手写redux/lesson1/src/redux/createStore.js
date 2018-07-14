export default function createStore(reducer){
    let state;
    let listeners = [];
    function getState(){
        console.log(state)
        return JSON.parse(JSON.stringify(state));
    }
    function subscribe(listener){
        listeners.push(listener);
        return function(){
            listeners.filter(val=>val!==listener)
        }
    }
    function dispatch(action){
        state = reducer(state,action);
        listeners.forEach(l=>l())
    }
    dispatch({type:"@@INIT"})
    return {
        getState,
        subscribe,
        dispatch
    }
}