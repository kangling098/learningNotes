import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import Filter from '@/components/Filters/MediumFilter'
import List from './components/List'
import {handleRefreshCreator} from 'utils'
const NAMESPACE = 'logsSystem'


const PageCom = (props) => {
    const {
        location, dispatch, modelState, loading,
    } = props
    const handleRefresh = handleRefreshCreator(location,dispatch) // 生成筛选页面方法 可以用于filter筛选和列表筛选
    const { query } = location
    const {
        list, pagination, isMotion, selectedRowKeys,
    } = modelState

    const options = [
        { key: 'user_id', value: '会员ID' },
        { key: 'title', value: '标题' },
        { key: 'from_ip', value: '终端' },
        { key: 'system', value: '操作系统' },
        { key: 'browser ', value: '浏览器' },
      ]
    const filterProps = {
        filter: {
          ...query,
        },
        options,
        onFilterChange (value) {
          handleRefresh({
            ...value,
            page: 1,
          })
        },
      }

    const listProps = {
        dataSource: list,
        loading,
        pagination,
        location,
        handleRefresh,
        onDeleteItem (id) {
            dispatch({
                type: `${NAMESPACE}/delete`,
                payload: id,
            })
            .then(()=>{
                handleRefresh({
                    page: (list.length === 1 && pagination.current > 1) ? pagination.current - 1 : pagination.current,
                })
            })
        },
        onEditItem () {
            console.log('EditItem')
        },
        rowSelection: {
            selectedRowKeys,
            onChange: (keys) => {
                dispatch({
                    type: `${NAMESPACE}/updateState`,
                    payload: {
                        selectedRowKeys: keys,
                    },
                })
            },
        },
    }
    return (
        <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
        </Page>
    )
}

PageCom.propTypes = {
    modelState: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.bool,
  }
  
export default connect(({[NAMESPACE]:modelState, loading})=>({modelState, loading: loading.models[NAMESPACE] }))(PageCom)


