import React, { Component, useEffect, useState } from "react";
import { get, post, del, put } from "../../httpHelper";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Input,InputNumber,Table   } from "antd";
export default () => {
  const [ProductList, setProductList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchProductList = () => {
    get("/product")
      .then((response) => {
        setProductList(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const handleDeleteProduct = (ProductId) => {
    del(`/product/${ProductId}`).then((response) => {
      const _listProductFilter = ProductList.filter(
        (item) => item?.id !== ProductId
      );
      setProductList(_listProductFilter);
    });
  };
  const handleAddNewProduct = () => {
    form.setFieldsValue({name: ''})
    form.setFieldsValue({price: ''})
    form.setFieldsValue({amount: ''})
    form.setFieldsValue({status: ''})
    form.setFieldsValue({discountPer: ''})
    form.setFieldsValue({rating: ''})
    form.setFieldsValue({productDetailId: ''})
    form.setFieldsValue({categoryId: ''})
    form.setFieldsValue({brandId: ''})
    setAddMode(true);
    setIsModalVisible(true);
  };

  const handleActionButtonEdit = async (Product) => {
    setAddMode(false);

    form.setFieldsValue({
      id: Product?.id,
      name: Product?.name,
      price: Product?.price,
      amount: Product?.amount,
      status: Product?.status,
      discountPer: Product?.discountPer,
      rating: Product?.rating,
      productDetailId: Product?.productDetailId,
      categoryId: Product?.categoryId,
      brandId: Product?.brandId
      
    });
    showModal();
  };

  const handleCallAPIUpdate = (e) => {
    console.log("e", e);
    put(`/product`, e).then((response) => {
      let _indexOfProduct = ProductList.findIndex(
        (item) => item?.id === e?.id
      );

      const _Products = [
        ...ProductList.slice(0, _indexOfProduct),
        {
          ...ProductList[_indexOfProduct],
          name: e?.name,
          price: e?.price,
          amount: e?.amount,
          status: e?.status,
          discountPer: e?.discountPer,
          rating: e?.rating,
          productDetailId: e?.eDetailId,
          categoryId: e?.categoryId,
          brandId: e?.brandId
        },
        ...ProductList.slice(_indexOfProduct + 1),
      ];
      setProductList(_Products);
      setIsModalVisible(false);
    });
  };

  const handleCallAPIAdd = (e) => {
    post('/product', {   name: e?.name,
        price: e?.price,
        amount: e?.amount,
        status: e?.status,
        discountPer: e?.discountPer,
        rating: e?.rating,
        productDetailId: e?.productDetailId,
        categoryId: e?.categoryId,
        brandId: e?.brandId}).then((response) => {
      const _listProduct = [...ProductList, response?.data?.data];
      console.log(response);
      setProductList(_listProduct);
      setIsModalVisible(false);
    });
  };

  // const columns = [
  //   {
  //     title: 'ID',
  //     dataIndex: 'id',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'Price',
  //     dataIndex: 'price',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'Amount',
  //     dataIndex: 'amount',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'status',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'DiscountPer',
  //     dataIndex: 'discountPer',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'Rating',
  //     dataIndex: 'rating',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'Product Detail',
  //     dataIndex: 'productDetailId',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'CategoryId',
  //     dataIndex: 'categoryId',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
  //   {
  //     title: 'BrandId',
  //     dataIndex: 'brandId',
  //     sorter: (a, b) => a.name.length - b.name.length,
  //   },
 
  // ];
  // const data = [
  //   ProductList.map((Product) => ( 
  // {
  //   id: `${Product.id}`,
  //   id: `${Product.name}`,
  //   id: `${Product.price}`,
  //   id: `${Product.amount}`,
  //   id: `${Product.status}`,
  //   id: `${Product.discountPer}`,
  //   id: `${Product.rating}`,
  //   id: `${Product.productDetailId}`,
  //   id: `${Product.categoryId}`,
  //   id: `${Product.brandId}`,
     
  // }

  //   ))


  // ]

  return (
    <div>
        <h3> MANAGE Product </h3>
      {/* <Table columns={columns} dataSource={data} /> */}

      <table  id="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Status</th>
            <th>DiscountPer</th>
            <th>Rating</th>
            <th>ProductDetailId</th>
            <th>CategoryId</th>
            <th>BrandId</th>
            <th>ImageId</th>
          </tr>
        </thead>
        <tbody>
          {ProductList.map((Product) => (
            <tr key={Product.id}>
              <td>{Product.id}</td>
              <td>{Product.name}</td>
              <td>{Product.price}</td>
              <td>{Product.amount}</td>
              <td>{Product.status}</td>
              <td>{Product.discountPer}</td>
              <td>{Product.rating}</td>
              <td>{Product.productDetailId}</td>
              <td>{Product.categoryId}</td>
              <td>{Product.brandId}</td>
             
              <td>
                <button onClick={() => handleDeleteProduct(Product.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => handleActionButtonEdit(Product)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Add new Product</h1>
      <button onClick={() => handleAddNewProduct()}>Add new Product</button>
      
      <Modal
        destroyOnClose
        onCancel={handleCancel}
        onOk={handleOk}
        footer={false}
        visible={isModalVisible}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={addMode ? handleCallAPIAdd : handleCallAPIUpdate}
        >
          <Form.Item
            style={addMode && {display: 'none'}}
            label="id"
            name="id"

          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input Product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input Product price!" }]}
          >
            {/* <Input /> */}
            <InputNumber min={1} max={100000000} defaultValue={1} />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please input Product amount!" }]}
          >
            {/* <Input /> */}
            <InputNumber min={1} max={100} defaultValue={1} />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please input Product status!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="DiscountPer"
            name="discountPer"
            rules={[{ required: true, message: "Please input Product discountPer!" }]}
          >
            {/* <Input /> */}
            <InputNumber min={0} max={1} defaultValue={0} />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please input Product rating!" }]}
          >
            {/* <Input /> */}
            <InputNumber min={1} max={5} defaultValue={4} />
          </Form.Item>
          <Form.Item
            label="ProductDetailId"
            name="productDetailId"
            rules={[{ required: true, message: "Please input Product productDetailId!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CategoryId"
            name="categoryId"
            rules={[{ required: true, message: "Please input Product categoryId!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="BrandId"
            name="brandId"
            rules={[{ required: true, message: "Please input Product brandId!" }]}
          >
            <Input />
          </Form.Item>
        
          

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              {addMode ? "Add" : "Edit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
