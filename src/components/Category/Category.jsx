import React from "react";
import { categoryinfos } from "./Categoryfullinfos";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryinfos.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </section>
  );
}

export default Category;
