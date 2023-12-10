import { useDispatch} from 'react-redux';

// import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/cart.reducer';

import {CheckoutItemContainer, ImageContainer, CheckoutItemName, CheckoutItemQuantity, Value, Price, ItemTotal, LeftArrow, RightArrow, RemoveButton } from './checkout-item.styles';

import DeleteForever from '@mui/icons-material/DeleteForever';

const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();
    // const cartItems = useSelector(selectCartItems);

    const permanentlyRemoveFromCart = () => dispatch(clearItemFromCart(cartItem));
    const addOneToCart = () => dispatch(addItemToCart(cartItem));
    const removeOneFromCart = () => dispatch(removeItemFromCart(cartItem));

    // const permanentlyRemoveFromCart = () => dispatch(clearItemFromCart(carrItems, cartItem));
    // const addOneToCart = () => dispatch(addItemToCart(carrItems, cartItem));
    // const removeOneFromCart = () => dispatch(removeItemFromCart(carItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}></img>
            </ImageContainer>

            <CheckoutItemName>{name}</CheckoutItemName>

            <CheckoutItemQuantity>
                <LeftArrow onClick={removeOneFromCart}>
                    &#10094;
                </LeftArrow>

                <Value>{quantity}</Value>

                <RightArrow onClick={addOneToCart}>
                    &#10095;
                </RightArrow> 
            </CheckoutItemQuantity>

            <Price>$ {price}</Price>

            <ItemTotal>$ {price * quantity}</ItemTotal>

            <RemoveButton onClick={permanentlyRemoveFromCart}>
              <DeleteForever></DeleteForever>
            </RemoveButton>
            
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;