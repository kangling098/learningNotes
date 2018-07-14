import React,{Component} from 'react';
import {bindActionCreators} from '../redux';
import store from '../store';
import actions from '../store/actions'
let bindActions = bindActionCreators(actions,store.dispatch);
export default class Counter extends Component {
    state = {
        number: store.getState().number
    }
    componentDidMount(){
        store.subscribe(()=>{
            this.setState({number:store.getState().number})
        })
    }
    render(){
        return (
            <div>
                <p>{this.state.number}</p>
                {/* <button onClick={()=>store.dispatch(actions.add())}>+</button> */}
                <button onClick={()=>bindActions.add(1)}>+</button>
                {/* <button onClick={()=>store.dispatch(actions.minus())} >-</button> */}
                <button onClick={()=>bindActions.minus(2)} >-</button>
            </div>
            
        )
    }
}