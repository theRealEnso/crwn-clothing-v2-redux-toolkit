import {useDispatch} from 'react-redux';
// import { selectCartItems } from '../../store/cart/cart.selector';

import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.reducer';
import { CartItemContainer, ItemDetails, IconContainer, CartItemName, Subtract, Add, Remove } from './cart-item.styles';

import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();
  // const cartItems = useSelector(selectCartItems);

  const addOneToCart = () => dispatch(addItemToCart(cartItem));
  const removeOneFromCart = () => dispatch(removeItemFromCart(cartItem));
  const clearItem = () => dispatch(clearItemFromCart(cartItem));

  // const addOneToCart = () => dispatch(addItemToCart(cartItems, cartItem));
  // const removeOneFromCart = () => dispatch(removeItemFromCart(cartItems, cartItem));
  // const clearItem = () => dispatch(clearItemFromCart(cartItems, cartItem));
  
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <CartItemName>{name}</CartItemName>
        <span>{quantity} x ${price}</span>

        <IconContainer>
          <Subtract onClick={removeOneFromCart}>
            <IndeterminateCheckBoxIcon></IndeterminateCheckBoxIcon>
          </Subtract>

          <Add onClick={addOneToCart}>
            <AddBoxIcon></AddBoxIcon>
          </Add>

          <Remove onClick={clearItem}>
            <DeleteForeverIcon></DeleteForeverIcon>
          </Remove>

        </IconContainer>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
