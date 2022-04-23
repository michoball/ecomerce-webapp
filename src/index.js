import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// store.js에서 만든 persistor를 쓰기 위해서는 PersistGate롤 컴포넌트를 감싸야한다.
// 그리고 persistor로 만들어둔 persistor를 넘기면 끝
// loading 값은 persistor 값들을 불러오는 시간동안 render 할 것을 넣어둘 수 잇다. -> loadingSpinner 같은거
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

// stripe payment 를 사용하기 위해서 Elemnets로 app을 감싼다.
// Elements 로 감싸진 부분만 stripe element에 접근할 수 있다.
// Elements 에 stripe 값에 내 계정의 public key를 등록해서 사용
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
