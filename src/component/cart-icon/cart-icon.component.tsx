import { IconContainer, ItemCount } from "./cart-icon.styles";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";

import { setIsCartOpen } from "../../store/cart/cart.action";

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleCartIcon = () => {
    return dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <IconContainer onClick={toggleCartIcon}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </IconContainer>
  );
};

export default CartIcon;
