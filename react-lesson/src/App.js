import React, {
    Component
} from 'react';

class App extends Component {
    componentWillMount(){
        console.log('componentWillMount',document.body)
        console.log('componentWillMount',window)
    }
    componentDidMount(){
        console.log('componentDidMount',document.body)
        console.log('componentDidMount',window)
        this.div = document.createElement('div')
        this.div.innerHTML = 'aaaaaaaaaaaaaa'
        document.body.appendChild(this.div)
    }
    render() {
        console.log('render',document)
        console.log('render',window)
        return ( 
            <div className = "App" >
                <div onClick={()=>{
                    document.body.removeChild(this.div)
                }}
                >dianwo </div>
            </div>
        );
    }
}

export default App;