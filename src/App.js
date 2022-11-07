import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
//   getCurrentUser,
// } from "./utils/firebase/firebase.utils";
// import { setCurrentUser } from "./store/user/user.action";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
// import { checkUserSession } from "./store/user/user.action";

import { checkUserSession } from "./tookit/user/user.reducer";
import { GlobalStyle } from "./global.styles";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    // const unsubcribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }

    //   dispatch(setCurrentUser(user));
    // });
    // return unsubcribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
