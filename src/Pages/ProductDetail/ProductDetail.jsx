import React, { useEffect, useState } from "react"; // don't forget useState
import classes from "./ProductDetail.module.css";
import LayOut from "../../components/LayOut/LayOut";
import { useParams } from "react-router-dom"; // useParams instead of userParams
import axios from "axios";
import { productUrl } from "../../Api/endpoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams(); // useParams to get productId
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`) // backticks for interpolation
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productId]); // productId as dependency

  //console.log(product);

  return (
    <LayOut>
      {isLoading ? ( // Conditional rendering fixed
        <Loader />
      ) : (
        <ProductCard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
