import styled from 'styled-components';

const hoverColor = `rgb(35, 245, 241)`;
const removeColor = 'rgb(255, 26, 26)';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;
  border-bottom: 1px solid black;

  img {
    width: 30%;
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;

  span {
    font-size: 16px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const CartItemName = styled.span`
  font-size: 8px
`

export const Subtract = styled.div`
  padding: 5px 5px;
  cursor: pointer;
  font-size: 10px;
  &:hover {
    color: ${hoverColor};
  }
`;

export const Add = styled.div`
  padding: 5px 5px;
  cursor: pointer;
  font-size: 10px;
  &:hover {
    color: ${hoverColor};
  }
`;

export const Remove = styled.div`
  padding: 5px 5px;
  font-size: 10px;
  cursor: pointer;
  &:hover {
    color: ${removeColor};
  }
`
