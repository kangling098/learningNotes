import React,{Component} from 'react';
import {ADD,MINUS} from '../store/action-types'
import store from '../store'
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
                <button onClick={()=>store.dispatch({type:ADD})}>+</button>
                <button onClick={()=>store.dispatch({type:MINUS})} >-</button>
            </div>
            
        )
    }
}