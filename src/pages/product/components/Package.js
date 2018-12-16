import React from 'react'
import { connect } from 'dva'
import { Table, Input, InputNumber, Popconfirm, Form, Radio } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber min={0} max={10000000} />
    }
    if(this.props.inputType === 'radio') {
      return (
        <RadioGroup>
          <Radio value={1}>上架</Radio>
          <Radio value={0}>暂不上架</Radio>
        </RadioGroup>
      )
    }
    return <Input />
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

const EditableTable = ({
  packageOpt,
}) => {

  const { packageData, dispatch, editingKey } = packageOpt

  const isEditing = record => {
    return record.key === editingKey;
  };

  const cancel = () => {
    dispatch({
      type: 'product/packageChange',
      payload: {
        editingKey: '',
      },
    })
  }

  const edit = key => {
    dispatch({
      type: 'product/packageChange',
      payload: {
        editingKey: key,
      },
    })
  }

  const remove = key => {
    const item = packageData.filter(item => item.key !== key)
    dispatch({
      type: 'product/packageChange',
      payload: {
        packageData: item,
      },
    })
  }

  const save = (form, key) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...packageData];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        newData.push(row);
      }
      dispatch({
        type: 'product/packageChange',
        payload: {
          packageData: newData,
          editingKey: ''
        },
      })
    });
  }

  let columns = [
    {
      title: '名称',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: '总次数',
      dataIndex: 'times',
      editable: true,
    },
    {
      title: '有效时长',
      dataIndex: 'month',
      editable: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      editable: true,
    },
    {
      title: '原价',
      dataIndex: 'origin_price',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'left',
      editable: true,
      render: text => {
        if(text == 1) {
          return <span style={{color: 'green'}}>上架</span>
        }
        return <span style={{color: 'red'}}>未上架</span>
      }
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
                      <a href="javascript:;" onClick={() => save(form, record.key)} style={{ marginRight: 8 }}>
                        保存
                      </a>
                      <a href="javascript:;" onClick={() => cancel(form, record.key)}>
                        取消
                      </a>
                    </div>
                  )}
                </EditableContext.Consumer>
              </span>
            ) : (
              <div>
                <a onClick={() => edit(record.key)} style={{ marginRight: 8 }}>编辑</a>
                <Popconfirm
                  title="确定删除此套餐？"
                  onConfirm={() => remove(record.key)}
                >
                  <a>删除</a>
                </Popconfirm>
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
        inputType: (col.dataIndex === 'times' || col.dataIndex === 'month') ? 'number' : ((col.dataIndex === 'status') ? 'radio' : 'text'),
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
      dataSource={packageData}
      columns={columns}
    />
  )
}

export default connect(({ product, loading }) => ({ product, loading }))(Form.create()(EditableTable))
