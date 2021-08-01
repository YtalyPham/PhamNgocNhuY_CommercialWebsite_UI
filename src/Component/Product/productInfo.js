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
        <Descriptions.Item label="Discount">{detail.discountPer * 100}%</Descriptions.Item>
        <Descriptions.Item label="OnStock"> {detail.status}</Descriptions.Item>
        <Descriptions.Item label="Rating">
          
          <Rate disabled value={detail.rating} />
        </Descriptions.Item>
      
        
      </Descriptions>
      <Collapse defaultActiveKey={["1"]}  >
            <Panel header="Show more" key="1">
            <h5>screenSize</h5><p>{productDetail.screenSize}</p>
            <h5>screenTechnology</h5><p>{productDetail.screenTechnology}</p>
            <h5>cameraBack</h5><p>{productDetail.cameraBack}</p>
            <h5>cameraFont</h5><p>{productDetail.cameraFont}</p>
            <h5>chipset</h5><p>{productDetail.chipset}</p>
            <h5>memory</h5><p>{productDetail.memory}</p>
            <h5>battery</h5><p>{productDetail.battery}</p>
            <h5>system</h5><p>{productDetail.system}</p>
            <h5>screenResolution</h5><p>{productDetail.screenResolution}</p>
            <h5>size</h5><p>{productDetail.size}</p>

            <h5>weight</h5><p>{productDetail.weight}</p>
            <h5>chargingTechnology</h5><p>{productDetail.chargingTechnology}</p>
            <h5>chargingPort</h5><p>{productDetail.chargingPort}</p>
            <h5>sensors</h5><p>{productDetail.sensors}</p>
            <h5>wiFi</h5><p>{productDetail.wiFi}</p>
            <h5>bluetooth</h5><p>{productDetail.bluetooth}</p>
            <h5>ram</h5><p>{productDetail.ram}</p>
            <h5>sim</h5><p>{productDetail.sim}</p>

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
