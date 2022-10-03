import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Modal, Popconfirm, Space, Table, Tag, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

interface DataType {
    key: number;
    name: string;
    age: number;
    address: string;
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: DataType;
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
const Tcrud: React.FC = () => {
    const [form] = Form.useForm();
    const [gridData, setgridData] = useState<DataType[]>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [editingKey, setEditingKey] = useState<string | number>('')
    const [editRow, setEditRow] = useState(true);
    //edit function
    const isEditing = (record: DataType) => record.key === editingKey;

    const edit = (record: Partial<DataType> & { key: React.Key }) => {
      form.setFieldsValue({ name: '', age: '', address: '', ...record });
      setEditingKey(record.key);
    };
    const save = async (key: React.Key) => {
      try {
        const row = (await form.validateFields()) as DataType;

        const newData = [...gridData];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setgridData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setgridData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
    //fetch api 
    useEffect(() => {
      dataSource();
    }, []);

    const dataSource = async () => {
      setloading(true);
        const response =await axios.get(
          "http://localhost:5000/table"
        );
        setgridData(response.data);
        setloading(false)
    }
    //delete and cancel
    const handleDelete = (key: React.Key) => {
        const newData = gridData.filter(item => item.key !== key);
        setgridData(newData);
    };
    const cancel = () => {
      setEditingKey('');
    };
    //counter and randomizer for adding data
    const [count, setCount] = useState(11);

    function randomNumber(min:number, max:number) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    
    const config: Config = {
      dictionaries: [names,names],
      style:'capital',
      separator:' '
    }
    const cofigTwo: Config = {
      dictionaries: [names,names,names],
      style:'capital',
      separator:' '
    }    
    const twoCharacterName: string = uniqueNamesGenerator(config);
    const threeCharacterName: string = uniqueNamesGenerator(cofigTwo);
    const array = [twoCharacterName, threeCharacterName];
    const index = Math.floor(Math.random() * array.length);
    const characterName = array[index];

    const handleAdd = () => {
        const newData: DataType = {
          key: count,
          name: characterName,
          age: randomNumber(20,40),
          address: `City, address no. ${randomNumber(100,999)}`,
        };
        console.log(newData)
        setgridData([...gridData, newData]);
        setCount(count + 1);
      };

    //columns   
    const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width:'25%',
        editable: true,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width:'6%',
        editable: true,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        editable: true,
    },
    {
        title: 'Action',
        dataIndex: 'action',
        width:'150px',
        // align:'center',
        key: 'action',
        render: (_: any, record: DataType) => {
          const editable = isEditing(record);
          return editable ? (
            <Space className='button-table' size="middle"  >
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
                    <Button type="primary" danger  disabled={editingKey !== ''} style={{ borderRadius: '4px'}} onClick={() => showModal(record)} >
                        <DeleteOutlined />
                    </Button>
                  </Tooltip>          
            </Space>
            </>
          );
        },                 
    },
    ];

    //merging column
    const mergedColumns = columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record: DataType) => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });

    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modaldata, setmodaldata] = useState<any>([]);
    const showModal = (record:any) => {
    console.log(record);
    setmodaldata(record);
    setIsModalVisible(true);
    };
    
    const handleOk = () => {
    handleDelete(modaldata.key);
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };

    return(
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
      <div  style={{ display:'flex',padding:'10px 0'}}>
        <Typography.Title level={2}  style={{ margin: 0 }}>
          Table    
        </Typography.Title>
        <Button style={{ width:'auto', marginLeft:'auto'}} type="primary" onClick={handleAdd}>
          Add Random Data
        </Button>
      </div>
      <Form form={form} component={false}>
        <Table 
        components={{
            body: {
              cell: EditableCell,
            },
          }}
        // columns={columns} 
        dataSource={gridData} 
        scroll={{ x: 500 }} 
        columns={mergedColumns}
        rowClassName="editable-row"
        rowKey='name'
        pagination={{ defaultPageSize: 5, showSizeChanger: true,pageSizeOptions: ['5', '10', '20']}} />
    </Form>
    <Modal title="Delete Products" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure delete {modaldata.name}?</p>
    </Modal>
    </div>
    </div>
    )
};

export default Tcrud;

// const [dataSource, setDataSource] = useState<DataType[]>([
//     {
//       key: '0',
//       name: 'Edward King 0',
//       age: 32,
//       address: 'London, Park Lane no. 0',
//     },
//   ]);
    //modified data 
    // const dataChange = gridData.map(({address,...item}: DataType) => ({
    //     ...item,
    //     key: item.id,
    //     alamat: address
    // }))
    // const dataChange = gridData.map(({address,...item}: DataType) => ({
    //     ...item,
    //     key: item.id,
  
    // }))
    // console.log("dataChange",dataChange);

      // const counter = (key: React.Key) => {
    //     // const lastValue = Object.values(gridData).pop();
    //     gridData.filter(item => item.key.)
    //     // const newData = gridData.filter(item => item.key !== key);
    //     // setgridData(newData);
    // };
    // const lastValue = gridData[-1];
    // // type ObjectKey = keyof typeof lastValue;
    // // const myVar = 'id' as ObjectKey;
    // const dataLength:number = Object.keys(gridData).length
    
  