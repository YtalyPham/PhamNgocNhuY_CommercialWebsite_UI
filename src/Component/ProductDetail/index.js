import React, { Component, useEffect, useState } from "react";
import { get, post, del, put } from "../../httpHelper";
import { Link } from "react-router-dom";
import { Modal, Button, Form, Input } from "antd";
export default () => {
  const [ProductDetailList, setProductDetailList] = useState([]);
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

  const fetchProductDetailList = () => {
    get("/productdetail")
      .then((response) => {
        setProductDetailList(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchProductDetailList();
  }, []);

  const handleDeleteProductDetail = (ProductDetailId) => {
    del(`/productdetail/${ProductDetailId}`).then((response) => {
      const _listProductDetailFilter = ProductDetailList.filter(
        (item) => item?.id !== ProductDetailId
      );
      setProductDetailList(_listProductDetailFilter);
    });
  };
  const handleAddNewProductDetail = () => {
    form.setFieldsValue({name: ''})
    form.setFieldsValue({country: ''})
    setAddMode(true);
    setIsModalVisible(true);
  };

  const handleActionButtonEdit = async (ProductDetail) => {
    setAddMode(false);

    form.setFieldsValue({
     // id: ProductDetail?.id,
      
      ...ProductDetail
    });
    showModal();
  };

  const handleCallAPIUpdate = (e) => {
    console.log("e", e);
    put(`/productdetail`, e).then((response) => {
      let _indexOfProductDetail = ProductDetailList.findIndex(
        (item) => item?.id === e?.id
      );

      const _ProductDetails = [
        ...ProductDetailList.slice(0, _indexOfProductDetail),
        {
          ...ProductDetailList[_indexOfProductDetail],
          ram: e?.ram, sim:e?.sim, battery: e?.battery, bluetooth:e?.bluetooth,
          cameraBack: e?.cameraBack, cameraFont:e?.cameraFont,chargingPort: e?.chargingPort, chargingTechnology:e?.chargingTechnology,chipset: e?.chipset, memory:e?.memory,
          screenResolution: e?.screenResolution, screenSize:e?.screenSize,screenTechnology: e?.screenTechnology, sensors:e?.sensors,size: e?.size, system:e?.system,
          weight: e?.weight, wiFi:e?.wiFi
        },
        ...ProductDetailList.slice(_indexOfProductDetail + 1),
      ];
      setProductDetailList(_ProductDetails);
      setIsModalVisible(false);
    });
  };

  const handleCallAPIAdd = (e) => {
    post(`/productdetail`, { ram: "", ...e})
    .then((response) => {
     console.log(response)
     const _listPD = [...ProductDetailList, response?.data?.data];
     setProductDetailList(_listPD);
     setIsModalVisible(false);
    });
  };

  return (
    <div>
        <h3> MANAGE ProductDetail </h3>
      <table id="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Ram</th>
            <th>Sim</th>
            <th>Battery</th>
            <th>Bluetooth</th>
            <th>Camera_back</th>
            <th>Camera_font</th>
            <th>Charging_port</th>
            <th>Charging_technology</th>
            <th>Chipset</th>
            <th>Memory</th>
            <th>Screen_resolution</th>
            <th>Screen_size</th>
            <th>Screen_technology</th>
            <th>Sensors</th>
            <th>Size</th>
            <th>System</th>
            <th>Weight</th>
            <th>Wifi</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {ProductDetailList.map((ProductDetail) => (
            <tr key={ProductDetail.id}>
              <td>{ProductDetail.id}</td>
              <td>{ProductDetail.ram}</td>
              <td>{ProductDetail.sim}</td>
              <td>{ProductDetail.battery}</td>
              <td>{ProductDetail.bluetooth}</td>
              <td>{ProductDetail.cameraBack}</td>
              <td>{ProductDetail.cameraFont}</td>
              <td>{ProductDetail.chargingPort}</td>
              <td>{ProductDetail.chargingTechnology}</td>
              <td>{ProductDetail.chipset}</td>
              <td>{ProductDetail.memory}</td>
              <td>{ProductDetail.screenResolution}</td>
              <td>{ProductDetail.screenSize}</td>
              <td>{ProductDetail.screenTechnology}</td>
              <td>{ProductDetail.sensors}</td>
              <td>{ProductDetail.size}</td>
              <td>{ProductDetail.system}</td>
              <td>{ProductDetail.weight}</td>
              <td>{ProductDetail.wiFi}</td>
              <td>
                <button onClick={() => handleDeleteProductDetail(ProductDetail.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => handleActionButtonEdit(ProductDetail)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Add new ProductDetail</h1>
      <button onClick={() => handleAddNewProductDetail()}>Add new ProductDetail</button>
      
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
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 25 }}
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
            label="Ram"
            name="ram"
            rules={[{ required: true, message: "Please input ProductDetail ram!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sim"
            name="sim"
            rules={[{ required: true, message: "Please input ProductDetail sim!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Battery"
            name="battery"
            rules={[{ required: true, message: "Please input ProductDetail battery!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Bluetooth"
            name="bluetooth"
            rules={[{ required: true, message: "Please input ProductDetail bluetooth!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CameraBack"
            name="cameraBack"
            rules={[{ required: true, message: "Please input ProductDetail camera_back!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="CameraFont"
            name="cameraFont"
            rules={[{ required: true, message: "Please input ProductDetail camera_font!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ChargingPort"
            name="chargingPort"
            rules={[{ required: true, message: "Please input ProductDetail charging_port!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ChargingTechnology"
            name="chargingTechnology"
            rules={[{ required: true, message: "Please input ProductDetail Charging_technology!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Chipset"
            name="chipset"
            rules={[{ required: true, message: "Please input ProductDetail chipset!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Memory"
            name="memory"
            rules={[{ required: true, message: "Please input ProductDetail memory!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ScreenResolution"
            name="screenResolution"
            rules={[{ required: true, message: "Please input ProductDetail screen_resolution!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="screenSize"
            name="screenSize"
            rules={[{ required: true, message: "Please input ProductDetail Screen_size!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="ScreenTechnology"
            name="screenTechnology"
            rules={[{ required: true, message: "Please input ProductDetail screen_technology!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sensors"
            name="sensors"
            rules={[{ required: true, message: "Please input ProductDetail sensors!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: "Please input ProductDetail size!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="System"
            name="system"
            rules={[{ required: true, message: "Please input ProductDetail system!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Weight"
            name="weight"
            rules={[{ required: true, message: "Please input ProductDetail weight!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="wiFi"
            name="wiFi"
            rules={[{ required: true, message: "Please input ProductDetail wifi!" }]}
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
