import styled from 'styled-components';

const removeColor = 'rgb(202,52,52)';
const addColor = 'rgb(86, 246, 86)';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 16%;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const CheckoutItemName = styled.span`
  width: 20%;
  padding: 0 20px;
`;

export const CheckoutItemQuantity = styled.span`
  width: 20%;
  display: flex;
  flex-direction: row;
`;

export const LeftArrow = styled.div`
    cursor: pointer;
    &:hover {
        color: ${removeColor};
    }
`

export const RightArrow = styled.div`
    cursor: pointer;
    &:hover {
        color: ${addColor};
    }
`

export const Value = styled.span`
  margin: 0 10px;
`;

export const Price = styled.span`
  width: 20%;
`;

export const ItemTotal = styled.span`
  width: 20%;
`;

export const RemoveButton = styled.div`
  cursor: pointer;
  &:hover {
    color: rgb(238, 36, 36);
  }
  padding-right: 10px;
`;

// Before using SASS

// .checkout-item-container {
//     width: 100%;
//     display: flex;
//     min-height: 100px;
//     border-bottom: 1px solid darkgrey;
//     padding: 15px 0;
//     font-size: 20px;
//     align-items: center;
  
//     .image-container {
//       width: 23%;
//       padding-right: 15px;
  
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//     .name,
//     .quantity,
//     .price {
//       width: 23%;
//     }
  
//     .quantity {
//       display: flex;
  
//       .arrow {
//         cursor: pointer;
//       }
  
//       .value {
//         margin: 0 10px;
//       }
//     }
  
//     .remove-button {
//       padding-left: 12px;
//       cursor: pointer;
//     }
//   }
  