import { compose, applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
// import { loggerMiddleware } from "./middleware/logger";
// import thunk from "redux-thunk";

import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./root-saga";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// persist는 새로고침을 하면 사라지는 reducer값들을 유지하기 위한 장치이다.
// persistConfig에 storage를 쓰면 rootReducer에 있는 것들을 localStorage에 저장할 수 있음
// 저장하고 싶지 않은 reducer를 따로 빼낼 수도 잇다. (blacklist)
// 반대로 저장하고 싶은것만 지정할 수도 있다. (whitelist)
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  // blacklist: ["user"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// production 환경에서는 logger middleware 를 쓰지 않겠다는것
// [...].filter(Boolean)은 [] 안에 있는 값이 true false인지에 따라 그대로 [...]를 내보내거나 []를 내보낸다.
const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
