import { Fragment } from "react";

// import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../component/category-preview/category-preview.omponent";
import { useSelector } from "react-redux";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";

import Spinner from "../../component/spinner/spinner.component";

const CategriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLaoding = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLaoding ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];

          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default CategriesPreview;
