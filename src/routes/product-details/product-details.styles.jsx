import styled from 'styled-components';

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
        height: 600px;
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