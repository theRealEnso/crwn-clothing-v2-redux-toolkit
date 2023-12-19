import ProductCard from '../product-card/product-card.component';

import {CategoryPreviewContainer, Title, Preview, ViewMore, ViewMoreLink} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {

        products.filter((_, idx) => idx < 4)
        .map((product) => (<ProductCard key={product.id} product={product} />))

        }
      </Preview>

      <ViewMore>
        {/* shop/{title} */}
        <ViewMoreLink to={title}>View More {title.charAt(0).toUpperCase() + title.slice(1)}</ViewMoreLink>
      </ViewMore>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
