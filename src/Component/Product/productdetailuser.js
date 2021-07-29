import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'

import { Row, Col } from 'antd';
import ProductImage from './productImg';
import ProductInfo from './productInfo';
 
import { get, post, del, put } from "../../httpHelper";
import { useDispatch } from 'react-redux';
function DetailProductPage(props) {
   
    const [Product, setProduct] = useState([])
    const {id} = useParams();

    console.log("id", id);

    useEffect(() => {
       fetchProductList();
    }, [])
    
    const fetchProductList = () => {
        get(`/product/${id}`)
          .then((response) => {
            setProduct(response.data.data);
          })
          .catch((error) => {
            console.log("error", error);
          });
      };
    

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} xs={24}>
                    <ProductInfo
                    
                        detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage
