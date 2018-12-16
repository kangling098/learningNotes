import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form } from 'antd'
import { handleRefreshCreator, listOnChangeCreator } from 'utils'

import List from './components/list'
import Filter from '@/components/Filters/MediumFilter'

const WorkOrder = ({
  location, dispatch, workorder, loading,
}) => {
  const { query } = location
  const {
    list, isMotion, workorderClass, pagination,
  } = workorder

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const listProps = {
    dataSource: list,
    workorderClass,
    loading: loading.effects['workorder/query'],
    location,
    isMotion,
    pagination,
    onChange: onListChange,
  }

  const options = [
    { key: 'num', value: '工单编号' },
    { key: 'content', value: '工单内容' },
    { key: 'user_id', value: '会员ID' },
    { key: 'admin_id', value: '接单人ID' },
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

  return (
    <Page inner>
      <div style={{ paddingBottom: 10 }}>
        <Filter {...filterProps} />
      </div>
      <List {...listProps} />
    </Page>
  )
}

WorkOrder.propTypes = {
  
}

export default connect(({ workorder, loading }) => ({ workorder, loading }))(Form.create()(WorkOrder))
