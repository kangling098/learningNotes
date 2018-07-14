import {ADD,MINUS} from './action-types';
let initState = { number: 0 };
export default function reducer(state = initState,action){
    switch(action.type){
        case ADD:
            return {number: state.number + (action.payload || 1)};
        case MINUS: 
            return {number: state.number - (action.payload || 1)};
        default :
            return state;
    }
}