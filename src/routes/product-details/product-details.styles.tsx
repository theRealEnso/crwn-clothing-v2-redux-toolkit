import styled, {keyframes} from 'styled-components';
import Button from '../../components/button/button.component';

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
`;

export const ProductDetailsContainer = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin: auto;

    img {
        margin-right: 10%;
        border-radius: 10px;
        box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.1);
        height: 450px;
    }

`

export const ProductContainer = styled.div`
    width: 100%
    display: flex;
    flex-direction: column;
`

export const ProductDetailsHeader = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;

    button {
        margin-right: 20px;
        box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
    }
`
export const QuantityInputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const QuantityValue = styled.input`
  ${'' /* margin: 0 10px; */}
  font-size: 12px;
  width: 20px;
  height: 20px;
`

export const QuantityButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  ${'' /* padding: 8px 12px; */}
  cursor: pointer;
  font-size: 16px;
  width: 20px;
  height: 20px;
`;

export const AddToCartButton = styled(Button)`
    margin-left: 5px;
    ${'' /* border-radius: 10px; */}
    font-size: 15px;
    height: 20px;
`;

export const FlashSuccessMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  color: rgb(71, 240, 55);
  font-size: 16px;
  margin-top: -90px;
  margin-left: auto;
  animation: ${fadeInOut} 3s ease-out;

  animation-fill-mode: forwards;
  opacity: 0;
  ${({ onAnimationEnd }) =>
    onAnimationEnd &&
    `
    animation-play-state: paused;
    &:hover {
      animation-play-state: running;
    }
  `}
`;

