import { takeLatest, all, call, put } from "redux-saga/effects";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "./category.action";

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export function* fetchCategoriesAsync() {
  try {
    // call 은 함수를 실행하는 작업을 한다. 첫번째 값이 함수 두번째 값이 파라미터이다.
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories");
    // dispatch 를 대신하는 메서드
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  // takeLatest 는 수행중인 기존의 action을 취소하고
  // 가장 최근에 실행한 action만 수행한다.
  //  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START 에 대해서
  // 가장 최근에 수행한 action에만 fetchCategoriesAsync 함수를 실행한다.

  // takeEvery 는 들어오는 모든 action에 대해 특정작업을 처리한다.
  //  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START 에 대해서
  // 수행한 모든 action에 fetchCategoriesAsync 함수를 실행한다.
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  // Promise all 처럼 all 안에 있는 generator들을 모두 병렬적으로 동시 실행하고
  // resolve 될때까지 기다린다.
  yield all([call(onFetchCategories)]);
}

//generator function => 함수를 만들고 호출할 때 바로 결과가 산출되지 않고
// next() 메서드를 통해서 genrator 안에 있는 실행을 차례차례 이행하게 해주는 함수
// 주로 yield와 같이 사용되고
// 함수안에 yield를 순차적으로 next()를 쓸 때마다 호출한다.

// ex) function* idMaker(){
//   var index = 0;
//   while(index < 3)
//     yield index++;
// }

// var gen = idMaker();

// console.log(gen.next().value);    // 0
// console.log(gen.next().value);    // 1
// console.log(gen.next().value);    // 2
// console.log(gen.next().value);    // undefined
//  ...
