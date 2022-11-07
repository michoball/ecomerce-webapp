import "./category.styles.scss";
import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

// import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../component/product-card/product-card-component";
import { useSelector } from "react-redux";
// import {
//   selectCategoriesMap,
//   selectCategoriesIsLoading,
// } from "../../store/categories/category.selector";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../tookit/category/category.selector";

import Spinner from "../../component/spinner/spinner.component";
const Category = () => {
  const { category } = useParams();

  // console.log("render/re-rendering category component");
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    // console.log("effect fired calling setProducts");
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </Fragment>
  );
};

export default Category;
