// src/components/admin/InventoryManagement.jsx (or wherever it is)
import React, { useState, useEffect } from 'react';
import { Table, Spin, Tag, Button, Modal, Form, Input, InputNumber, Select, Space } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';

const InventoryManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);


    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        const filtered = products.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.seller_name && product.seller_name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);


    const fetchProducts = async () => {

        setLoading(true);
        try {
            // Your API endpoint from server.cjs for product_manage.cjs
            const response = await axios.get('http://localhost:5001/api/inventry/');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
            toast.error('Failed to load inventory data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (record) => {
        setEditingProduct(record);
        form.setFieldsValue({
            product_id: record.product_id,
            product_name: record.product_name,
            seller_name: record.seller_name,
            stock_quantity: record.stock_quantity,
            price: record.price,
            product_status: record.product_status,
            seller_status: record.seller_status,
        });
        setIsModalVisible(true);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            await axios.put(`http://localhost:5001/api/inventry/${editingProduct.product_id}`, values);
            toast.success('Product updated successfully!');
            fetchProducts();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Failed to update product.');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleStatusChange = async (productId, newStatus) => {
        try {
            await axios.put(`http://localhost:5001/api/inventry/${productId}`, { product_status: newStatus });
            toast.success('Product status updated successfully!');
            fetchProducts();
        } catch (error) {
            console.error('Error updating product status:', error);
            toast.error('Failed to update product status.');
        }
    };

    const productStatusOptions = ['Active', 'Inactive', 'Out of Stock'];
    const sellerStatusOptions = ['Approved', 'Pending', 'Blocked'];





    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'product_id', // Matches alias from API
            key: 'product_id',
            sorter: (a, b) => a.product_id - b.product_id,
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name', // Matches alias from API
            key: 'product_name',
            sorter: (a, b) => a.product_name.localeCompare(b.product_name),
        },
        {
            title: 'Seller Name',
            dataIndex: 'seller_name', // Matches alias from API
            key: 'seller_name',
            sorter: (a, b) => (a.seller_name || '').localeCompare(b.seller_name || ''),
        },
        {
            title: 'Stock',
            dataIndex: 'stock_quantity', // Matches column name from API
            key: 'stock_quantity',
            sorter: (a, b) => a.stock_quantity - b.stock_quantity,
            // Example of conditional styling based on stock
            render: (stock) => (
                <Tag color={stock > 10 ? 'green' : stock > 0 ? 'orange' : 'red'}>
                    {stock}
                </Tag>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price', // Matches column name from API
            key: 'price',
            sorter: (a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0),
            render: (price) => { // <-- This is where line 112 likely is
                // **SOLUTION:** Safely convert and format
                const numericPrice = parseFloat(price);
                if (price === null || price === undefined || isNaN(numericPrice)) {
                    return 'N/A'; // Or '₹0.00' or however you want to display invalid/missing prices
                }
                // Now it's safe to call toFixed
                return `₹${numericPrice.toFixed(2)}`; // <--- The fix applied
            },
        },
        {
            title: 'Product Status',
            dataIndex: 'product_status', // Matches alias from API
            key: 'product_status',
            render: (status) => (
                 <Tag color={status === 'Active' ? 'success' : status === 'Out of Stock' ? 'warning' : 'default'}>
                    {status}
                 </Tag>
            ),
            // Add filters if needed
        },
        {
            title: 'Seller Status',
            dataIndex: 'seller_status', // Matches alias from API
            key: 'seller_status',
             render: (status) => (
                 <Tag color={status === 'Approved' ? 'success' : status === 'Pending' ? 'processing' : 'error'}>
                    {status}
                 </Tag>
            ),
        },
        {
            title: 'Last Updated',
            dataIndex: 'product_updated_at', // Matches alias from API
            key: 'product_updated_at',
            render: (date) => date ? new Date(date).toLocaleString() : 'N/A',
            sorter: (a, b) => new Date(a.product_updated_at || 0) - new Date(b.product_updated_at || 0),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                    <Select
                        defaultValue={record.product_status}
                        style={{ width: 120 }}
                        onChange={(newStatus) => handleStatusChange(record.product_id, newStatus)}
                    >
                        {productStatusOptions.map(status => (
                            <Select.Option key={status} value={status}>
                                {status}
                            </Select.Option>
                        ))}
                    </Select>

                </Space>

            ),
        },
        // Add other columns based on your API response (seller_email, seller_phone, etc.) if needed
    ];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
            <Input.Search
                placeholder="Search by product or seller name"
                onSearch={handleSearch}
                style={{ width: 300, marginBottom: 20 }}
            />
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={filteredProducts.length > 0 ? filteredProducts : products}
                    rowKey="product_id" // Use a unique key from your data
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 'max-content' }} // Allows horizontal scrolling if needed
                />
            </Spin>
            <Modal
                title="Edit Product"
                visible={isModalVisible}
                onOk={handleSave}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="product_id" label="Product ID">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item name="product_name" label="Product Name" rules={[{ required: true, message: 'Please enter product name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="seller_name" label="Seller Name" rules={[{ required: true, message: 'Please enter seller name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="stock_quantity" label="Stock Quantity" rules={[{ required: true, message: 'Please enter stock quantity!' }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter price!' }]}>
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="product_status" label="Product Status" rules={[{ required: true, message: 'Please select product status!' }]}>
                        <Select>
                            {productStatusOptions.map(status => (
                                <Select.Option key={status} value={status}>
                                    {status}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="seller_status" label="Seller Status" rules={[{ required: true, message: 'Please select seller status!' }]}>
                        <Select>
                            {sellerStatusOptions.map(status => (
                                <Select.Option key={status} value={status}>
                                    {status}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default InventoryManagement;
