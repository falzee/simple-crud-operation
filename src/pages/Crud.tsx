import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Modal, Popconfirm, Space, Table, Tag, Tooltip, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const Crud: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: 'Edward King 0',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
    {
      key: '2',
      name: 'Edward King 2',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    {
      key: '3',
      name: 'Edward King 3',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
    {
      key: '4',
      name: 'Edward King 4',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    {
      key: '5',
      name: 'Edward King 5',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
    {
      key: '6',
      name: 'Edward King 6',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    {
      key: '7',
      name: 'Edward King 7',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
    {
      key: '8',
      name: 'Edward King 8',
      age: 32,
      address: 'London, Park Lane no. 0',
    },
    {
      key: '9',
      name: 'Edward King 9',
      age: 32,
      address: 'London, Park Lane no. 1',
    },
  ]);
  
  //hapus data
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
  };
  // const handleDelete = (key) => {
  //   setData(data => data.filter(item => item.studentId !== stid));
  // };
  // data table
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (index, record)=> 
        dataSource.length >= 1 ?(
        <Space className='button-table' size="middle" >
          <Tooltip placement="bottom" title='Edit'>
            <Button style={{ borderRadius: '4px'}}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip placement="bottom" title='Delete'>
            <Button type="primary" danger style={{ borderRadius: '4px'}} onClick={() => showModal(record)} >
              <DeleteOutlined />
            </Button>
          </Tooltip>  
          </Space>
      ): null,
      width:'150px',
      align: 'center'
    },
    
    // delete worked(resolved)
    // name still aughhh(resolved)
  ];
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
      <div style={{ display:'flex',padding:'10px 0'}}>
        <Typography.Title level={2}  style={{ margin: 0 }}>
          Table    
          </Typography.Title>
        <Button style={{ width:'auto', marginLeft:'auto'}} type="primary">Add Table</Button>
      </div>
    <Table columns={columns} dataSource={dataSource} scroll={{ x: 500 }} pagination={{ defaultPageSize: 5, showSizeChanger: true,pageSizeOptions: ['5', '10', '20'] }} />
    <Modal title="Delete Products" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>Are you sure delete {modaldata.name}?</p>
    </Modal>
    </div>
  </div>
  )
};

export default Crud;

// {
    //   title: 'Tes',
    //   key: 'tes',
    //   render: (text, record, index) => (
    //     <Popconfirm title={`Sure to delete ${record.name}?`} onConfirm={() => handleDelete(record.key)}>
    //         <a>Delete</a>
    //       </Popconfirm>
                     
    //   ),
    // },
    // <Button type="primary" style={{ borderRadius: '4px'}} onClick = {
    //         (e) => {
    //           console.log("corresponding email is :", record.name)
    //         }}>
    //         Delete</Button> 
  // const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park'
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//   },
// ];