import { Category } from "./category.types";
import { AnyAction } from "redux";
import {
  // CategoryAction,
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./category.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action: AnyAction // CategoryAction
  // action으로 들어올 수 있는 것은 CategoryAction으로 모아둔 3가지 경우밖에 없다
  // 따라서 action의 타입은 as 를 써서 CategoryAction이라고 해둘 수 있다.

  //reducer.utils.ts 에 작성한대로 WithMatcher를 사용해서 category.action을 감싸주면
  // action type에 관해 좀 더 명확하게 지정을 해줄수 잇다.
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }
  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }

  return state;
  // const {type, payload} = action 은 payload가 action 타입에 항상 존재하는 값이 아니기 때문에
  // destructing해서 쓸 수 없다.

  // switch (action.type) {
  //   // 현실에서는 다음 3가지 경우의 타입 뿐만아니라 다양한 타입들이 들어올 수 있다.
  //   // 하지만 action = {} as CategoryAction 으로 action의 타입을 3가지 경우로 정한것 만으로는
  //   // 들어오는 타입을 제한할 수 없다. 그리고 에러를 다루기 힘들어진다.
  //   // 따라서  createAction 레벨에서 타입을 정해줘야 에러가 안난다.
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return {
  //       ...state,
  //       categories: action.payload,
  //       isLoading: false,
  //     };
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return {
  //       ...state,

  //       isLoading: false,
  //       error: action.payload,
  //     };
  //   default:
  //     return state;
  // }
};
