import styled, {keyframes} from 'styled-components';

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
`;

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const Name = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const Price = styled.span`
  width: 10%;
`;

export const AddSuccessMessage = styled.div`
  color: rgb(71, 240, 55);
  font-size: 16px;
  margin-top: -150px;
  animation: ${fadeInOut} 3s ease-out;
`

// @keyframes fade-in-out {
//   0%, 100% {
//     opacity: 0;
//   }
//   10%, 90% {
//     opacity: 1;
//   }
// }