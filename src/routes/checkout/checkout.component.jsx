// import { useContext } from "react";

// import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";
import CheckoutItem from "../../component/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
// import {
//   selectCartItems,
//   selectCartTotal,
// } from "../../store/cart/cart.selector";

import {
  selectCartItems,
  selectCartTotal,
} from "../../tookit/cart/cart.selector";

import PaymentForm from "../../component/payment-form/paymenet-form.component";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  // const { cartItems, cartTotal } = useContext(CartContext);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>

      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className="total">Total: {cartTotal}</span>
      <PaymentForm />
    </div>
  );
};

export default Checkout;