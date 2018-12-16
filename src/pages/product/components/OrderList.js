import React from 'react'
import { Table, InputNumber, Form } from 'antd'
import Link from 'umi/link'

const FormItem = Form.Item
const EditableContext = React.createContext()

let PAYMENT_MAX = 100

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  getInput = () => {
    return <InputNumber max={PAYMENT_MAX} />
  };

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0, width: 100, }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `请输入 ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

const OrderList = ({
  packageOpt,
}) => {

  const { packageData, dispatchHandle, editingKey } = packageOpt

  const isEditing = record => {
    return record.order_id === editingKey;
  };

  const cancel = () => {
    dispatchHandle({
      editingKey: '',
    })
  }

  const edit = (key, payment) => {
    PAYMENT_MAX = parseInt(payment)
    dispatchHandle({
      editingKey: key,
    })
  }

  const save = (form, key) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...packageData];
      const index = newData.findIndex(item => key === item.order_id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        newData.push(row);
      }
      dispatchHandle({
        packageData: newData,
        editingKey: ''
      })
    });
  }

  let columns = [
    {
      title: '订单编号',
      dataIndex: 'number',
      render: text => <Link to={`/user/detail/${text}`}>{text}</Link>,
    },
    {
      title: '总消费',
      dataIndex: 'payment',
    },
    {
      title: '退款金额',
      dataIndex: 'refund_money',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const editable = isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <div>
                      <a href="javascript:;" onClick={() => save(form, record.order_id)} style={{ marginRight: 8 }}>
                        确定
                      </a>
                      <a href="javascript:;" onClick={() => cancel(form, record.order_id)}>
                        取消
                      </a>
                    </div>
                  )}
                </EditableContext.Consumer>
              </span>
            ) : (
              <a onClick={() => edit(record.order_id, record.payment)}>修改退款金额</a>
            )}
          </div>
        );
      },
    },
  ]

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };

  columns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Table
      pagination={false}
      components={components}
      bordered
      rowKey={record => record.order_id}
      dataSource={packageData}
      columns={columns}
    />
  )
}

export default OrderList
