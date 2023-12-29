import styled, {keyframes} from 'styled-components';

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%; //of parent containing div
  position: absolute;
  top: 200px;
  display: none;

  button {
    width: 50%;
    opacity: 0.85;
    margin-bottom: 10px;
  }
`

export const ProductCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden; //ensure rounded corners are applied
  transition: transform 0.3s ease, opacity 0.3s ease;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 90%;
    object-fit: cover;
    margin-bottom: 5px;
    border-radius: 8px;
    opacity: 0.9;
  }

  &:hover {
    transform: scale(1.05);

    img {
      opacity: 1;
    }
  }

  &:hover ${ButtonContainer} {
    opacity: 0.90;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  overflow: hidden;
`;

export const Name = styled.span`
  width: 85%;
  margin-bottom: 15px;
`;

export const Price = styled.span`
  width: 15%;
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