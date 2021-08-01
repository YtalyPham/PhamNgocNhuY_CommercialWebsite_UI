import React, { Component, useEffect, useState } from "react";
import { get, post, del, put } from "../../httpHelper";
import { Link } from "react-router-dom";
import {
  Modal,
  Button,
  Form,
  Input,
  Popconfirm,
  Table
   
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
        let _brandList = response?.data?.data?.map(item => ({
            id: item?.id,
            name: item?.name,
            country: item?.country
        }))

        setBrandList(_brandList);
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
 
  // const onSearch=value =>console.log(value);





  const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
   
    {
      title: 'Delete',
      key: 'delete',
      dataIndex: 'delete',
      
       
    },
    {
        title: 'Edit',
        key: 'edit',
        dataIndex: 'edit',
    },
  ];



  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  
  <Table columns={columns} dataSource={brandList} />
}
