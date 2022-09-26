import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [loading, setloading] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  useEffect(() => {
    dataSource();
}, []);
//fetch data
const dataSource = async () => {
    setloading(true);
    const response =await axios.get(
        "http://localhost:5000/table"
    );
    setData(response.data);
    setloading(false)
}
  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <Space className='button-table' size="middle" >
            <Button onClick={() => save(record.key)} style={{ borderRadius: '4px'}}>
                    Save
                </Button>
               
                <Button  style={{ borderRadius: '4px'}} onClick={cancel}>
                    Cancel
                </Button>
          </Space>
        ) : (
          <>
          <Space className='button-table' size="middle" >
                <Tooltip placement="bottom" title='Edit'>
                <Button style={{ borderRadius: '4px'}} disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <EditOutlined />
                </Button>
                </Tooltip>
                <Tooltip placement="bottom" title='Delete'>
                <Button type="primary" danger style={{ borderRadius: '4px'}} onClick={() => showModal(record)} >
                    <DeleteOutlined />
                </Button>
                </Tooltip>          
          </Space>
          </>
        );
        
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modaldata, setmodaldata] = useState<any>([]);
  const showModal = (record:any) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
    };
  const handleDelete = (key: React.Key) => {
      const newData = data.filter(item => item.key !== key);
      setData(newData);
  };  
  const handleOk = () => {
    handleDelete(modaldata.key);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div 
    style={{ 
    display:'flex',
    flexDirection:'column',
    padding:'20px 0 80px',
    width:'100vw',
    height:'inherit',
    alignItems:'center',
    overflow:'auto'
    }}
    >
      <div style={{ width:'90%',maxWidth:'1200px',minWidth:''}} >
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    <Modal title="Delete Products" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure delete {modaldata.name}?</p>
    </Modal>
    </div>
    </div>

  );
};

export default App;