import { createSelector } from "reselect";

// 이곳의 selector가 무엇인지 정의 rootReducer에 categories야~ 라고만 정의
const selectCategoryReducer = (state) => state.categories;

// 위에 정의 한 것의 안에 있는 categories라는 state를 메모함
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    // console.log("selector1 fired");
    return categoriesSlice.categories;
  }
);
// 위에 메모한 categories라는 state에 값이 바뀌면 reduce로 만든 새로운 {}를 리턴함
// 값이 변하지 않았으면 위에 함수와 이 함수는 실행되지 않는다
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    // console.log("selector2 fired");
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);

// selector를 호출할 때마다 새로운 {}를 리턴하기 때문에
// 불필요한 re-rendering을 하게 만듬
// export const selectCategoriesMap = (state) => {
//   console.log("selector fired");
//   return state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };
