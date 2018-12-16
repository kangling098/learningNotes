import React from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Select } from 'antd'
import { handleRefreshCreator, listOnChangeCreator } from 'utils'

import List from './components/List'
import Filter from '@/components/Filters/SimpleFilter'

const Solution = ({
  location, dispatch, solution, loading,
}) => {
  const {
    list, isMotion, workorderClass, pagination,
  } = solution

  const { query } = location

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const listProps = {
    dataSource: list,
    loading: loading.effects['solution/query'],
    location,
    isMotion,
    pagination,
    workorderClass,
    onChange: onListChange,
    onDeleteItem (params, resolve) {
      dispatch({
        type: 'solution/remove',
        payload: {
          ...params,
          resolve,
        },
      })
    },
    onEditItem (item) {
      dispatch(
        routerRedux.push({
        pathname: '/workorder/solution/add',
        query: {id: item.id }
      }))
    },
  }

  const createHandle = () => {
    dispatch(
      routerRedux.push({
      pathname: '/workorder/solution/add',
    }))
  }

  const options = [
    { key: 'title', value: '标题' },
    { key: 'content', value: '内容' },
  ]

  const filterProps = {
    filter: {
      ...query,
    },
    options,
    createHandle,
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }

  return (
    <Page inner>
      <div style={{ paddingBottom: 10 }}>
        <Filter {...filterProps} />
      </div>
      <List {...listProps} />
    </Page>
  )
}

Solution.propTypes = {
  
}

export default connect(({ solution, loading }) => ({ solution, loading }))(Form.create()(Solution))
