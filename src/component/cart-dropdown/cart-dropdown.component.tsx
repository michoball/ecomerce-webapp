import Button from "../button/button.component";
import { useNavigate } from "react-router-dom";

import CartItem from "../cart-item/cart-item.component";

import { setIsCartOpen } from "../../store/cart/cart.action";
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { useCallback } from "react";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems);

  const navigate = useNavigate();

  const goToCheckutHandler = useCallback(() => {
    navigate("/checkout");
    dispatch(setIsCartOpen(!isCartOpen));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen]);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Empty</EmptyMessage>
        )}
      </CartItems>

      <Button onClick={goToCheckutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
