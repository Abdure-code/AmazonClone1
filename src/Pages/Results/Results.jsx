import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import LayOut from "../../components/LayOut/LayOut";
import axios from "axios";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endpoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader"; // Make sure Loader component is imported

function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true); // Set loading state to true on every fetch
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false); // Set loading to false when data is received
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); // Ensure loading is set to false even in case of an error
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products - container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
