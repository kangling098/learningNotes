import React from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Page } from 'components'
import { Form, Button } from 'antd'
import queryString from 'query-string'

import Sort from '@/components/Sort'
import List from './components/List'

import { sortDataFormat } from 'utils'


const Product = ({
  location, dispatch, product, loading,
}) => {
  const {
    list, isMotion, selectedRowKeys, isApi, aide, seoOpen, sortVisible
  } = product

  const { query, pathname } = location

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const listProps = {
    dataSource: list,
    aide,
    pagination: false,
    loading: loading.effects['product/query'],
    location,
    isMotion,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onDeleteItem (params, resolve) {
      dispatch({
        type: 'product/remove',
        payload: {
          ...params,
          resolve,
        },
      })
    },
    onEditItem (item) {
      if(item.type === 'api') {
        dispatch({
          type: 'product/selectApi',
        })
      }
      dispatch(
        routerRedux.push({
        pathname: '/product/add',
        query: {id: item.id, type: item.type}
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: () => {
        
      },
    },
  }

  const createProduct = () => {
    dispatch(
      routerRedux.push({
      pathname: '/product/add'
    }))
  }

  const sortHandler = () => {
    dispatch({
      type: 'product/updateState',
      payload: {
        sortVisible: true,
      }
    })
  }
  const sortProps = {
    visible: sortVisible,
    maskClosable: false,
    title: '产品排序',
    data: sortDataFormat(list),
    types: [{value: 'soft', text: '软件'}, {value: 'api', text: 'API'}],
    confirmLoading: loading.effects['app/sort'],
    wrapClassName: 'vertical-center-modal',
    onOk (data, type) {
      dispatch({
        type: 'app/sort',
        payload: {
          module: `product_${type}`,
          sequence: JSON.stringify(data),
        }
      }).then(res => {
        if(res && res.success) {
          dispatch({
            type: 'product/updateState',
            payload: {
              sortVisible: false,
            }
          })
          dispatch({
            type: 'product/query',
          })
        }
      })
    },
    onCancel () {
      dispatch({
        type: 'product/updateState',
        payload: {
          sortVisible: false,
        }
      })
    },
  }

  return (
    <Page inner>
      <div style={{ paddingBottom: 10 }}>
        <Button type="ghost" onClick={createProduct}>新增</Button>
        <Button type="primary" onClick={sortHandler} style={{marginLeft: 10}}>排序</Button>
      </div>
      <List {...listProps} />
      {sortVisible && <Sort {...sortProps} />}
    </Page>
  )
}

Product.propTypes = {
  
}

export default connect(({ product, loading }) => ({ product, loading }))(Form.create()(Product))
