import {ProductCardContainer, Footer, Name, Price, AddSuccessMessage} from './product-card.styles';

import { useDispatch, useSelector} from 'react-redux';

// import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart, clearSuccessMessage } from '../../store/cart/cart.reducer';
import {selectAddedProduct } from '../../store/cart/cart.selector';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import {FC} from 'react';
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardProps = {
  product: CategoryItem;
};



const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const addedProduct = useSelector(selectAddedProduct);
  // const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => {
    dispatch(addItemToCart(product));
    setTimeout(() => dispatch(clearSuccessMessage()), 3000);
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>

      {addedProduct && addedProduct.id === product.id && <AddSuccessMessage>Product successfully added to cart! <DoneAllIcon></DoneAllIcon></AddSuccessMessage>}

    </ProductCardContainer>
  );
};

export default ProductCard;
