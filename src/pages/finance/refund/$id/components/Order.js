import React from 'react'
import { Table, InputNumber, Popconfirm, Form, Radio } from 'antd'
import Link from 'umi/link'
const FormItem = Form.Item
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  getInput = () => {
    return <InputNumber />
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

const Order = ({
  packageOpt,
}) => {

  const { packageData, dispatchHandle, changePackage, editingKey, virtualMoneyName, status } = packageOpt

  const isEditing = record => {
    return record.id === editingKey
  }

  const cancel = () => {
    dispatchHandle({
      editingKey: '',
    })
  }

  const edit = key => {
    dispatchHandle({
      editingKey: key,
    })
  }

  const save = (form, record) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...packageData];
      const index = newData.findIndex(item => record.id === item.id);
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
      changePackage({
        id: record.id,
        refund_money: row.refund_money,
        refund_virtual: row.refund_virtual,
      });
    });
  }

  let columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      render: text => <Link to={`/finance/order/childDetail/${text}`}>{text}</Link>
    },
    {
      title: '现金账户消费',
      dataIndex: 'pay_money',
      render: text => `￥ ${text}`
    },
    {
      title: '现金账户退款',
      dataIndex: 'refund_money',
      editable: true,
      render: text => `￥ ${text}`,
    },
    {
      title: `${virtualMoneyName}账户消费`,
      dataIndex: 'pay_virtual',
    },
    {
      title: `${virtualMoneyName}账户退款`,
      dataIndex: 'refund_virtual',
      editable: true,
    },
    {
      title: '管理',
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
                      <Popconfirm
                        title="确定修改此退款金额？"
                        onConfirm={() => save(form, record)}
                        onCancel={() => cancel(form, record.id)}
                      >
                        <a style={{ marginRight: 8 }}>确定</a>
                      </Popconfirm>
                      <a href="javascript:;" onClick={() => cancel(form, record.id)}>
                        取消
                      </a>
                    </div>
                  )}
                </EditableContext.Consumer>
              </span>
            ) : (
              <div>
                {
                  status == 1 ? (
                    <a onClick={() => edit(record.id)} style={{ marginRight: 8 }}>编辑</a>
                  ) : '-'
                }
              </div>
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
      rowKey={record => record.id}
      dataSource={packageData}
      columns={columns}
    />
  )
}

export default Order
