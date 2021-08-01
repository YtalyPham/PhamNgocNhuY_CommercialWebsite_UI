import React, { Component, useEffect, useState } from "react";
import { get, post, del, put } from "../../httpHelper";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Form,
  Input,
  InputNumber,
  Table,
  Select,
  Col,
  Row,Popconfirm
} from "antd";
const { Search } = Input;
const { Option } = Select;

export default () => {
  const [ProductList, setProductList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [productDetailList,setProductDetailList]=useState([]);
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

  const fetchBrandList = () => {
    get("/brand")
      .then((response) => {
        setBrandList(response.data.data);
        
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const fetchCategoryList = () => {
    get("/category")
      .then((response) => {
        setCategoryList(response.data.data);
        console.log(categoryList.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const  fetchProductDetailById = async (prop) => {
     let productDetail;
     await get(`/productdetail/${prop}`)
      .then((response) => {
        productDetail = response.data.data;
      })
      .catch((error) => {
        console.log("error",error);
      });
       return productDetail;
  };
  const  fetchProductByName =  (prop) => {
   
    get(`/product/searchByName/${prop}`)
     .then((response) => {
       setProductList(response.data.data);
     })
     .catch((error) => {
       console.log("error",error);
     });
      
 };
  
  useEffect(() => {
   
    fetchCategoryList();
    fetchBrandList();
    fetchProductList();
   // fetchProductByName();
  }, []);
  const handleDeleteProductDetail = (props) => {
    del(`/productdetail/${props.productDetailId}`).then((response) => {
      
      
    });
  };
  const handleDeleteProduct = (Product) => {
    del(`/product/${Product.id}`).then((response) => {
      const _listProductFilter = ProductList.filter(
        (item) => item?.id !== Product.id
      );
      setProductList(_listProductFilter);
      handleDeleteProductDetail(Product);
    });
    
  };
  const handleAddNewProduct = () => {
    form.setFieldsValue({ name: "" });
    form.setFieldsValue({ price: "" });
    form.setFieldsValue({ amount: "" });
    form.setFieldsValue({ status: "" });
    form.setFieldsValue({ discountPer: "" });
    form.setFieldsValue({ rating: "" });
    form.setFieldsValue({ productDetailId: "" });
    form.setFieldsValue({ categoryId: "" });
    form.setFieldsValue({ brandId: "" });
    setAddMode(true);
    setIsModalVisible(true);
  };

  const handleActionButtonEdit = async (Product) => {
    setAddMode(false);

    const pd = await fetchProductDetailById(Product?.productDetailId);


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
      brandId: Product?.brandId,
      
      ram: pd?.ram, sim:pd?.sim, battery: pd?.battery, bluetooth:pd?.bluetooth,
        cameraBack: pd?.cameraBack, cameraFont:pd?.cameraFont,chargingPort: pd?.chargingPort, chargingTechnology:pd?.chargingTechnology,chipset: pd?.chipset, memory:pd?.memory,
        screenResolution: pd?.screenResolution, screenSize:pd?.screenSize,screenTechnology: pd?.screenTechnology, sensors:pd?.sensors,size: pd?.size, system:pd?.system,
        weight: pd?.weight, wiFi:pd?.wiFi
      
    });
  
     
    showModal();
  };
  const handleCallAPIUpdateProductDetail = (e) => {
    console.log("e", e);
    put(`/productdetail`, {id: e?.productDetailId ,ram: e?.ram,sim: e?.sim,battery: e?.battery,bluetooth: e?.bluetooth,
      cameraBack:e?.cameraBack,cameraFont: e?.cameraFont,chargingPort:e?.chargingPort,chargingTechnology: e?.chargingTechnology,chipset:e?.chipset,memory: e?.memory,
      screenResolution:e?.screenResolution, screenSize:e?.screenSize,screenTechnology:e?.screenTechnology,sensors:e?.sensors,size:e?.size,system: e?.system,
      weight:e?.weight,wiFi:e?.wiFi}).then((response) => {
       
      console.log("sucess",response)
      
    });
  };
  
  const handleCallAPIUpdate = (e) => {
    console.log("e", e);
    const _category = categoryList.find(item => item?.name === e?.categoryName);
    const _brand = brandList.find(item => item?.name === e?.brandname);

    console.log("l",brandList);

   handleCallAPIUpdateProductDetail(e);
    put(`/product`,{
      id: e?.id,
      name: e?.name,
      price: e?.price,
      amount: e?.amount,
      status: e?.status,
      discountPer: e?.discountPer,
      rating: e?.rating,
      productDetailId: e?.productDetailId,
      categoryId: _category?.id,
      brandId: _brand?.id,
    }).then((response) => {
      let _indexOfProduct = ProductList.findIndex((item) => item?.id === e?.id);
      
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
          productDetailId: e?.productDetailId,
          categoryId: _category?.id,
          brandId: _brand?.id,
        },
        ...ProductList.slice(_indexOfProduct + 1),
      ];
      setProductList(_Products);
      setIsModalVisible(false);
    });
  };

  const handleCallAPIAddProductDetail = async (productDetail) => {
    const _productDetails = productDetail;

    let res;

     await post(`/productdetail`, _productDetails)
      .then((response) => {
        console.log(response);
        res = response?.data?.data;
      })
      .catch((err) => {
        res = err;
      });

      return res;
  };

  const handleCallAPIAdd = async (e) => {
    const brand = await brandList.find((item) => item?.name === e?.brandname);
    const category = await categoryList.find(
      (item) => item?.name === e?.categoryName
    );

    const detailInput = {
      ram: e?.ram,
      sim: e?.sim,
      battery: e?.battery,
      bluetooth: e?.bluetooth,
      cameraBack: e?.cameraBack,
      cameraFont: e?.cameraFont,
      chargingPort: e?.chargingPort,
      chargingTechnology: e?.chargingTechnology,
      chipset: e?.chipset,
      memory: e?.memory,
      screenResolution: e?.screenResolution,
      screenSize: e?.screenSize,
      screenTechnology: e?.screenTechnology,
      sensors: e?.sensors,
      size: e?.size,
      system: e?.system,
      weight: e?.weight,
      wiFi: e?.wiFi,
    };

    const productDetail = await handleCallAPIAddProductDetail(detailInput);

    console.log(productDetail?.id);

if (productDetail?.id) {
  post("/product", {
    name: e?.name,
    price: e?.price,
    amount: e?.amount,
    status: e?.status,
    discountPer: e?.discountPer,
    rating: e?.rating,
    productDetailId: productDetail.id,
    categoryId: category?.id,
    brandId: brand?.id,
  }).then((response) => {
    const _listProduct = [...ProductList, response?.data?.data];
    console.log(response);
    setProductList(_listProduct);
    setIsModalVisible(false);
  });
  
}    
    
  };
  const onSearch=value => (value== "") ? fetchProductList(): fetchProductByName(value);
  return (
    <div>
      <h3> MANAGE Product </h3>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        onBlur
         
      />
      <table id="table">
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
          </tr>
        </thead>
        <tbody>
          {ProductList?.map((Product) => {
            
            return (
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
                  {/* <button onClick={() => handleDeleteProduct(Product)}>
                    Delete
                  </button> */}
                  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => handleDeleteProduct(Product)}>
                    <Button danger type="primary" >Delete</Button>
                  </Popconfirm>
                </td>
                
                <td>
                  <Button type="primary" onClick={() => handleActionButtonEdit(Product)}>
                    Edit
                  </Button>
                </td>
                
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1>Add new Product</h1>
       <Button type="primary" htmlType="submit" width='200' onClick={() => handleAddNewProduct()}>Add new Product</Button>

      <Modal
        destroyOnClose
        onCancel={handleCancel}
        onOk={handleOk}
        footer={false}
        visible={isModalVisible}
        width={1000}
      >
        <Row>
          <Col span={24}>
            <Form
              form={form}
              style={{ maxWidth: "100%" }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={addMode ? handleCallAPIAdd : handleCallAPIUpdate}
              size="middle"
            >
              <Row>
                <Col span={12}>
                  <Form.Item
                    style={addMode && { display: "none" }}
                    label="id"
                    name="id"
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product name"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product price!",
                      },
                    ]}
                  >
                    {/* <Input /> */}
                    <InputNumber min={1} max={100000000} style={{ width: 200 }}/>
                  </Form.Item>

                  <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product amount!",
                      },
                    ]}
                  >
                    {/* <Input /> */}
                    <InputNumber min={1} max={100} />
                  </Form.Item>
                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product status!",
                      },
                    ]}
                  >
                    {/* <Input /> */}
                    <Select style={{ width: 120 }} >
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="DiscountPer"
                    name="discountPer"
                    rules={[
                      {
                        required: true,
                        message: "Please input Discount 0.1-1!",
                      },
                    ]}
                  >
                    {/* <Input /> */}
                    <InputNumber min={0} max={1} />
                  </Form.Item>
                  <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product rating!",
                      },
                    ]}
                  >
                    {/* <Input /> */}
                    <InputNumber min={1} max={5} />
                  </Form.Item>
                  
                  <Form.Item
                    label="CategoryName"
                    name="categoryName"
                    rules={[
                      {
                        required: true,
                        message: "Please input Product categoryId!",
                      },
                    ]}
                  >
                    <Select>
                      {categoryList?.map((item) => (
                        <Option value={item?.name}>{item?.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="BrandName"
                    name="brandname"
                    rules={[
                      {
                        required: true,
                        message: "Please chosse Product brandname!",
                      },
                    ]}
                  >
                    <Select>
                      {brandList?.map((item) => (
                        <Option value={item?.name}>{item?.name}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Sensors"
                    name="sensors"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Sensor"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Size"
                    name="size"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Size"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="System"
                    name="system"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product System"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Weight"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="wiFi"
                    name="wiFi"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Wifi"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={addMode && { display: "none" }}
                    label="ProductDetailId"
                    name="productDetailId"
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label="Ram"
                    name="ram"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Ram"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Sim"
                    name="sim"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Sim"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Battery"
                    name="battery"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Battery"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Bluetooth"
                    name="bluetooth"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Bluetooth"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="CameraBack"
                    name="cameraBack"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product CameraBack"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="CameraFont"
                    name="cameraFont"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product CameraFont"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="ChargingPort"
                    name="chargingPort"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product ChargingPort"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="ChargingTechnology"
                    name="chargingTechnology"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product ChargingTechnology"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Chipset"
                    name="chipset"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Chipset"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Memory"
                    name="memory"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product Memory"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="ScreenResolution"
                    name="screenResolution"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product ScreenResolution"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="screenSize"
                    name="screenSize"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product ScreenSize"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="ScreenTechnology"
                    name="screenTechnology"
                    rules={[
                      { 
                        pattern: /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                        message: "Not contain special character, Except UTF-8 !" },
                        {
                          required: true,
                          message:"Please input Product ScreenTechnology"
                        }
                    ]}
                  >
                    <Input />
                  </Form.Item>

               
                </Col>
             
              </Row>
             
                <Form.Item width='max'>
                    <Button type="primary" htmlType="submit" block>
                      {addMode ? "Add" : "Edit"}
                    </Button>
              </Form.Item>
             
             
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};
