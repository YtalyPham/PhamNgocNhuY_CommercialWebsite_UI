import React, { Component, useContext, useEffect, useState } from "react";
import { get, post, del, put } from "../../httpHelper";
import { Link } from "react-router-dom";
import { Button, Form } from "antd";
import { Card, Row, Col } from "antd";
import { GlobalContext } from '../../context';

const { Meta } = Card;
export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addMode, setAddMode] = useState(false);

  const {listProduct} = useContext(GlobalContext);

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



  return (
    <div>
      <h3>  Product </h3>

      <Row>
        {listProduct?.map((item) => (
          <Col span={6}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title={item?.name} description={item?.price +' đ'} />
              <br />
              <Link to={`/productdetail/${item?.id}`}>
                <Button type="primary" size="large">
                  Detail
                </Button>
              </Link>

              <Button type="danger" size="large">
                Add to card
              </Button>
            </Card>
            ,
          </Col>
        ))}
      </Row>
    </div>
  );
};
