import React, { Component, useEffect, useState } from "react";
import { get, post, del, put } from "../../httpHelper";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Form,
  Input,
  Popconfirm,
 
   
} from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

export default () => {
  const [brandList, setBrandList] = useState([]);
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

  const fetchBrandList = () => {
    get("/brand")
      .then((response) => {
        setBrandList(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const fetchBrandListByName = (e) => {
    get(`/brand/search/${e}`)
      .then((response) => {
        setBrandList(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchBrandList();
  }, []);

  const handleDeleteBrand = (brandId) => {
    del(`/brand/${brandId}`).then((response) => {
      const _listBrandFilter = brandList.filter((item) => item?.id !== brandId);
      setBrandList(_listBrandFilter);
    });
  };
  const handleAddNewBrand = () => {
    form.setFieldsValue({ name: "" });
    form.setFieldsValue({ country: "" });
    setAddMode(true);
    setIsModalVisible(true);
  };

  const handleActionButtonEdit = async (brand) => {
    setAddMode(false);

    form.setFieldsValue({
      id: brand?.id,
      name: brand?.name,
      country: brand?.country,
    });
    showModal();
  };

  const handleCallAPIUpdate = (e) => {
    console.log("e", e);
    put(`/brand`, e).then((response) => {
      let _indexOfBrand = brandList.findIndex((item) => item?.id === e?.id);

      const _brands = [
        ...brandList.slice(0, _indexOfBrand),
        {
          ...brandList[_indexOfBrand],
          name: e?.name,
          country: e?.country,
        },
        ...brandList.slice(_indexOfBrand + 1),
      ];
      setBrandList(_brands);
      setIsModalVisible(false);
    });
  };

  const handleCallAPIAdd = (e) => {
    post(`/brand`, { name: e?.name, country: e?.country }).then((response) => {
      const _listBrand = [...brandList, response?.data?.data];
      setBrandList(_listBrand);
      setIsModalVisible(false);
    });
  };
   const onSearch=value => (value== "") ? fetchBrandList(): fetchBrandListByName(value);
  // const onSearch=value =>console.log(value);


  return (
    <div>
      <h3> MANAGE BRAND </h3>
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
            <th>Country</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {brandList?.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>{brand.country}</td>
              <td>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDeleteBrand(brand.id)}
                >
                  <Button danger type="primary">
                    Delete
                  </Button>
                </Popconfirm>
              </td>
              <td>
                <Button
                  type="primary"
                  onClick={() => handleActionButtonEdit(brand)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Add new Brand</h1>
      <Button type="primary" htmlType="submit" width='200' onClick={() => handleAddNewBrand()}>Add new Brand</Button>

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
                pattern:
                  /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                message: "Not contain special character, Except UTF-8 !",
              },
              {
                required: true,
                message: "Please input Brand name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                pattern:
                /^[-:'"";\\/\\.\\,\\(\\)\\>\\<\\{\\}\\+\\=\\|\\?a-zA-z0-9 _ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/g,
                message: "Not contain special character, Except UTF-8 !",
              },
              {
                required: true,
                message: "Please input Brand country",
              },
            ]}
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
