import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { rootTookitReducer } from "./rootTollkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

export const toolkitstore = configureStore({
  reducer: persistReducer(persistConfig, rootTookitReducer),
  // middleware: [logger],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [`payload.createAt`, "payload.timestamp"],
        ignoredPaths: [
          `user.currentUser.createAt`,
          "user.currentUser.timestamp",
        ],
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export const toolkitPersistor = persistStore(toolkitstore);
