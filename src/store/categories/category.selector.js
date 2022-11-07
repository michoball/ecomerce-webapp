import { createSelector } from "reselect";

// 여기서 firebase에서 가져온 categories data를 reduce를 사용헤서 object로 만들어주는 이유는
// 여기 프로젝트에서는 굳이 필요없지만 redux와 같은 상태관리 라이브러리를 사용할때
// reducer에서는 제일 날것의 데이터를 가지고 있고 selector에서 다양하게 데이터를 변화를 주는것이
// 데이터를 좀 더 다양하게 쓰고 유지 보수하기 수월해진다.

// 이곳의 selector가 무엇인지 정의 rootReducer에 categories야~ 라고만 정의
const selectCategoryReducer = (state) => state.categories;

// 위에 정의 한 것의 안에 있는 categories라는 state를 메모함
// selectCategoryReducer가 변해야만 밑의 selectCategories이게 변함 => 첫번째 값이 [selectCategoryReducer]니까
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
