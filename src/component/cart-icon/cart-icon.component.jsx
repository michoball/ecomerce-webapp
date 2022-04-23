import { IconContainer, ShoppingIcon, ItemCount } from "./cart-icon.styles.jsx";

// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
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
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCartIcon = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <IconContainer onClick={toggleCartIcon}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </IconContainer>
  );
};

export default CartIcon;
