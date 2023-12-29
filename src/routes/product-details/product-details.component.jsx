import {useLocation, useNavigate} from 'react-router-dom';

import {useDispatch} from 'react-redux';

import { ErrorBoundary } from 'react-error-boundary';
import { ProductDetailsContainer, ProductContainer, ProductDetailsHeader, ButtonContainer } from './product-details.styles';
// import { AddToCartButton } from './product-details.styles';

import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component';

import { addItemToCart } from '../../store/cart/cart.reducer';


const ProductDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {name, price, imageUrl, description} = location.state;
    // const {name, price, imageUrl, description} = product;

    const addProductToCart = () => {
        dispatch(addItemToCart({name, price, imageUrl}));
    };

    const goToCheckout = () => {
        dispatch(navigate(`/checkout`));
    };

    console.log(location.state);

    return (
        <ErrorBoundary fallback={<div>Whoops! Looks like something went wrong!</div>}>

            <ProductDetailsHeader>Product Details</ProductDetailsHeader>

            <ProductDetailsContainer>
                <img alt='product' src={imageUrl}></img>

                <ProductContainer>
                    <h3>{name.toUpperCase()}: $ {price}</h3>
                    <p>{description}</p>
                <ButtonContainer>
                    <Button onClick={addProductToCart}>Add to Cart</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={goToCheckout}>View Cart</Button>
                </ButtonContainer>
                </ProductContainer>

            </ProductDetailsContainer>

            

        </ErrorBoundary>
    );
};

export default ProductDetails;