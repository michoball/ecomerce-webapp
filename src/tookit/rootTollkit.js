import { combineReducers } from "redux";
import cartReducer from "./cart/cart.reducer";
import categoryReducer from "./category/category.reducer";
import userReducer from "./user/user.reducer";

export const rootTookitReducer = combineReducers({
  category: categoryReducer,
  cart: cartReducer,
  user: userReducer,
});
