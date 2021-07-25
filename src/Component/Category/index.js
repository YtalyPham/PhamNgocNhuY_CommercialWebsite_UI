import React, { Component, useEffect, useState } from "react";
import { get, post, del, put } from "../../httpHelper";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Input } from "antd";
export default () => {
  const [categoryList, setCategoryList] = useState([]);
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

  const fetchCategoryList = () => {
    get("/category")
      .then((response) => {
        setCategoryList(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const handleDeleteCategory = (categoryId) => {
    del(`/category/${categoryId}`).then((response) => {
      const _listCategoryFilter = categoryList.filter(
        (item) => item?.id !== categoryId
      );
      setCategoryList(_listCategoryFilter);
    });
  };
  const handleAddNewCategory = () => {
    form.setFieldsValue({name: ''})
    setAddMode(true);
    setIsModalVisible(true);
  };

  const handleActionButtonEdit = async (category) => {
    setAddMode(false);

    form.setFieldsValue({
      id: category?.id,
      name: category?.name,
    });
    showModal();
  };

  const handleCallAPIUpdate = (e) => {
    console.log("e", e);
    put(`/category`, e).then((response) => {
      let _indexOfCategory = categoryList.findIndex(
        (item) => item?.id === e?.id
      );

      const _categorys = [
        ...categoryList.slice(0, _indexOfCategory),
        {
          ...categoryList[_indexOfCategory],
          name: e?.name,
        },
        ...categoryList.slice(_indexOfCategory + 1),
      ];
      setCategoryList(_categorys);
      setIsModalVisible(false);
    });
  };

  const handleCallAPIAdd = (e) => {
    post(`/category`, { name: e?.name}).then((response) => {
      const _listCategory = [...categoryList, response?.data?.data];
      setCategoryList(_listCategory);
      setIsModalVisible(false);
    });
  };

  return (
    <div>
      <table id="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Update</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>

              <td>
                <button onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => handleActionButtonEdit(category)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Add new Category</h1>
      <button onClick={() => handleAddNewCategory()}>Add new Category</button>
      <input type="text" placeholder="name"></input>
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
            rules={[{ required: true, message: "Please input your username!" }]}
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
