import React, { createContext, useState, useEffect } from 'react';
import {get} from "./httpHelper"
const GlobalContext = createContext(null);
const { Provider } = GlobalContext;

const GlobalProvider = ({ children }) => {

    
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = () => {
    get("/product")
      .then((response) => {
        setListProduct(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


  const store = { listProduct, setListProduct };

  return <Provider value={{ ...store }}>{children}</Provider>;
};

export { GlobalContext, GlobalProvider };