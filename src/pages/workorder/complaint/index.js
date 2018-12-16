import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { Form } from 'antd'
import { handleRefreshCreator, listOnChangeCreator } from 'utils'

import List from './components/list'
import Filter from '@/components/Filters/MediumFilter'

const Complaint = ({
  location, dispatch, complaint, loading,
}) => {
  const { query } = location
  const {
    list, isMotion, pagination,
  } = complaint

  const handleRefresh = handleRefreshCreator(location,dispatch)
  const onListChange = listOnChangeCreator(handleRefresh)

  const listProps = {
    dataSource: list,
    loading: loading.effects['complaint/query'],
    location,
    isMotion,
    pagination,
    onChange: onListChange,
  }
  const options = [
    { key: 'title', value: '标题' },
    { key: 'user_id', value: '会员ID' },
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

Complaint.propTypes = {
  
}

export default connect(({ complaint, loading }) => ({ complaint, loading }))(Form.create()(Complaint))
