import React from 'react'
import { Table, InputNumber, Popconfirm, Form, Radio } from 'antd'

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

const Package = ({
  packageOpt,
}) => {

  const { packageData, dispatchHandle, changePackage, editingKey } = packageOpt

  const isEditing = record => {
    return record.id === editingKey;
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
        last_times: row.last_times,
      });
    });
  }

  let columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '套餐总次数',
      dataIndex: 'total_times',
    },
    {
      title: '剩余次数',
      dataIndex: 'last_times',
      editable: true,
    },
    {
      title: '购买时间',
      dataIndex: 'create_time',
    },
    {
      title: '到期时间',
      dataIndex: 'end_time',
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
                      <Popconfirm
                        title="确定修改此套餐？"
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
                <a onClick={() => edit(record.id, record.total_times)} style={{ marginRight: 8 }}>编辑</a>
                <a>退款</a>
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

export default Package
