import React, { Component, useEffect, useState } from "react";
import { get, post, del, put } from "../../httpHelper";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Input } from "antd";
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
      const _listBrandFilter = brandList.filter(
        (item) => item?.id !== brandId
      );
      setBrandList(_listBrandFilter);
    });
  };
  const handleAddNewBrand = () => {
    form.setFieldsValue({name: ''})
    form.setFieldsValue({country: ''})
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
      let _indexOfBrand = brandList.findIndex(
        (item) => item?.id === e?.id
      );

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
    post(`/brand`, { name: e?.name, country:e?.country}).then((response) => {
      const _listBrand = [...brandList, response?.data?.data];
      setBrandList(_listBrand);
      setIsModalVisible(false);
    });
  };

  return (
    <div>
        <h3> MANAGE BRAND </h3>
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
          {brandList.map((brand) => (
            <tr key={brand.id}>
              <td>{brand.id}</td>
              <td>{brand.name}</td>
              <td>{brand.country}</td>
              <td>
                <button onClick={() => handleDeleteBrand(brand.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => handleActionButtonEdit(brand)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Add new Brand</h1>
      <button onClick={() => handleAddNewBrand()}>Add new Brand</button>
      
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
            rules={[{ required: true, message: "Please input brand name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input brand country!" }]}
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
