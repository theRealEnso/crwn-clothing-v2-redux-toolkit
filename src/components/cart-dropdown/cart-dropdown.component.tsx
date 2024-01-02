import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {
  CartDropdownContainer, EmptyMessage, CartItems, SubTotal, } from './cart-dropdown.styles';

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const subTotal = useSelector(selectCartTotal)
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <CartDropdownContainer>

      <CartItems>
        {cartItems.length ? (cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)) : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
      </CartItems>

      <SubTotal>Sub-total: ${subTotal}</SubTotal>

      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
