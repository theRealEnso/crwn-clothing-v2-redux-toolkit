import {useLocation, useNavigate} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';

import { ErrorBoundary } from 'react-error-boundary';
import { ProductDetailsContainer, ProductContainer, ProductDetailsHeader, ButtonContainer, FlashSuccessMessage } from './product-details.styles';
// import { AddToCartButton } from './product-details.styles';

import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component';

import { addItemToCart, clearSuccessMessage } from '../../store/cart/cart.reducer';
import { selectAddedProduct } from '../../store/cart/cart.selector';

import DoneAllIcon from '@mui/icons-material/DoneAll';


const ProductDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const {product} = location.state;
    const {name, price, imageUrl, description} = product;
    // const {name, price, imageUrl, description} = product;

    const addedProduct = useSelector(selectAddedProduct);

    const addProductToCart = () => {
        dispatch(addItemToCart(product));
        setTimeout(() => dispatch(clearSuccessMessage()), 3000);
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
                {addedProduct && addedProduct.id === product.id && <FlashSuccessMessage>Successfully added to cart! <DoneAllIcon></DoneAllIcon></FlashSuccessMessage> }
                </ProductContainer>

            </ProductDetailsContainer>


        </ErrorBoundary>
    );
};

export default ProductDetails;