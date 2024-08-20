import { Button, Flex, Popconfirm, Space, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import { apiClient } from '../shared/apiClient';
import { openNotificationWithIcon } from '../shared/notification';

function Product() {
    const [data, setData] = useState([])
    const [addProductVisible, setAddProductVisible] = useState(false)
    const [editProductVisible, setEditProductVisible] = useState(false)
    const [editProductData, setEditProductData] = useState({})

    const fetchData = () => {
        apiClient.get('/products').then((res) => {
            setData(res.data)
        }).catch((err) => openNotificationWithIcon('error', 'Something went wrong!'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleAddProduct = (values) => {
        apiClient.post('/products', values).then((res) => {
            setAddProductVisible(false)
            openNotificationWithIcon('success', `Product ${values.name} has been added.`)
            fetchData()
        }).catch((err) => openNotificationWithIcon('error', 'Something went wrong!'))
    }

    const handleEditProduct = (id, values) => {
        apiClient.patch(`/products/${id}`, values).then((res) => {
            setEditProductVisible(false)
            setEditProductData({})
            openNotificationWithIcon('success', `Product ${id} has been updated`)
            fetchData();
        }).catch((err) => openNotificationWithIcon('error', 'Something went wrong!'))
    }

    const handleDelete = (id, name) => {
        apiClient.delete(`/products/${id}`).then((res) => {
            openNotificationWithIcon('success', `Product ${name} has been deleted.`)
            fetchData();
        }).catch((err) => openNotificationWithIcon('error', 'Something went wrong!'))
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button onClick={() => {
                        setEditProductVisible(true)
                        setEditProductData(record)
                    }}>Edit</Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id, record.name)}
                    >
                        <Button type='primary' danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table
                title={() => (
                    <Flex align='center' justify='space-between' >
                        <Typography.Title level={3} style={{ margin: 0 }}>Products</Typography.Title>
                        <Button type='primary' onClick={() => setAddProductVisible(true)}>Add Products</Button>
                    </Flex>
                )}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
                scroll={{ y: 500 }}
                rowKey={'id'}

            />

            <AddProduct
                visible={addProductVisible}
                onCancel={() => setAddProductVisible(false)}
                onSubmit={handleAddProduct}
            />

            <EditProduct
                visible={editProductVisible}
                data={editProductData}
                onCancel={() => setEditProductVisible(false)}
                onSubmit={handleEditProduct}
            />
        </>
    )
}

export default Product
