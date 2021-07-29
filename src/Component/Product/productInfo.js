import React, { useEffect, useState } from "react";
import { Button, Descriptions, Rate,Collapse  } from "antd";
import {get} from "../../httpHelper" ;
function ProductInfo(props) {
  const [productDetail, setProductDetail] = useState({});
  const { Panel } = Collapse;

  const {detail} = props;

  useEffect(() =>{
      fetchProductDetailList(detail);
  },[detail])


  const fetchProductDetailList = (product) => {
    get(`/productdetail/${product?.productDetailId}`)
      .then((response) => {
        console.log(response)
        setProductDetail(response?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
   
  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price"> {detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{detail.discountPer}</Descriptions.Item>
        <Descriptions.Item label="View"> {detail.status}</Descriptions.Item>
        <Descriptions.Item label="Rating">
          
          <Rate disabled value={detail.rating} />
        </Descriptions.Item>
      
        
      </Descriptions>
      <Collapse defaultActiveKey={["1"]}  >
            <Panel header="Show more" key="1">
            screenSize<p>{productDetail.screenSize}</p>
            screenTechnology<p>{productDetail.screenTechnology}</p>
            cameraBack<p>{productDetail.cameraBack}</p>
            cameraFont<p>{productDetail.cameraFont}</p>
            chipset<p>{productDetail.chipset}</p>

            </Panel>
            
          </Collapse>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
