import React,{Fragment} from 'react'
import {connect} from 'dva'
import List from './components/List'
const Member = (props)=>{
    console.log(props)
    let {dataSource} = props;
    return (
        <Fragment>
            <List dataSource={dataSource}></List>
        </Fragment>
    )
}
export default connect(({ member }) => member)(Member)
