import {useLocation, useNavigate} from 'react-router-dom';

import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCartWithQuantity, clearSuccessMessage} from '../../store/cart/cart.reducer';
import { selectAddedProduct } from '../../store/cart/cart.selector';

import { ErrorBoundary } from 'react-error-boundary';

import { ProductDetailsContainer, ProductContainer, ProductDetailsHeader, ButtonContainer, FlashSuccessMessage, QuantityInputWrapper, QuantityValue, QuantityButton, AddToCartButton } from './product-details.styles';
import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component';

import DoneAllIcon from '@mui/icons-material/DoneAll';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';


const ProductDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {product} = location.state;
    const {name, price, imageUrl, description} = product;

    const addedProduct = useSelector(selectAddedProduct);

    const [amount, setAmount] = useState(1);

    const handleIncrement = () => {
        setAmount(amount + 1);
    };

    const handleDecrement = () => {
        if(amount > 1){
            setAmount(amount - 1);
        };
    };

    const resetAmountValue = () => {
        setAmount(1);
    }

    const updatedProduct = {...product, quantity: amount};
    const addProductToCart = () => {
        dispatch(addItemToCartWithQuantity(updatedProduct));
        dispatch(resetAmountValue());
        setTimeout(() => dispatch(clearSuccessMessage()), 3000)
    };

    const goToCheckout = () => {
        dispatch(navigate(`/checkout`));
    };

    const goBack = () => {
        dispatch(navigate(-1));
    };

    // const clearFlashSuccessMessage = () => {
    //     // setShowSuccessMessage(false);
        // setTimeout(() => dispatch(clearSuccessMessage()), 3000)
    // };

    console.log(location.state);

    return (
        <ErrorBoundary fallback={<div>Whoops! Looks like something went wrong!</div>}>

            <ProductDetailsHeader>Product Details</ProductDetailsHeader>

            <ProductDetailsContainer>
                <img alt='product' src={imageUrl}></img>

                <ProductContainer>
                    <h3>{name.toUpperCase()}: $ {price}</h3>
                    <p>{description}</p>

                <QuantityInputWrapper>
                    <QuantityButton onClick={handleDecrement}>-</QuantityButton>
                    <QuantityValue value={amount}></QuantityValue>
                    <QuantityButton onClick={handleIncrement}>+</QuantityButton>
                    <AddToCartButton onClick={addProductToCart}>Add to Cart</AddToCartButton>
                </QuantityInputWrapper>

                <ButtonContainer>
                    <Button onClick={goBack} buttonType={BUTTON_TYPE_CLASSES.inverted}>Go Back</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={goToCheckout}>View Cart</Button>
                </ButtonContainer>

                {addedProduct && addedProduct.id === product.id && <FlashSuccessMessage>Successfully added to cart! <DoneAllIcon></DoneAllIcon></FlashSuccessMessage>}

                </ProductContainer>

            </ProductDetailsContainer>


        </ErrorBoundary>
    );
};

export default ProductDetails;