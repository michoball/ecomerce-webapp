import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

// import { selectCurrentUser } from "../../store/user/user.selector";
// import { selectIsCartOpen } from "../../store/cart/cart.selector";

//toolkit
import { selectCurrentUser } from "../../tookit/user/user.selector";
import { selectIsCartOpen } from "../../tookit/cart/cart.selector";

// import { signOutUser } from "../../utils/firebase/firebase.utils";
// import { signOutStart } from "../../store/user/user.action";
import { userSignOut } from "../../tookit/user/user.reducer";

import {
  NavigationContainer,
  LogoContainer,
  NavLink,
  NavLinks,
} from "./navigation.styles";

const Navigation = () => {
  const dispatch = useDispatch();
  // const { currentUser } = useContext(userContext);
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(userSignOut());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>

        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
