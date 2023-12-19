import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"; // order of imports matter. Button needs to be imported first before the button type classes

import { PaymentFormContainer, FormContainer } from "./payment-form-styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    if(!stripe || !elements) {
        return;
    }

    

    const paymentHandler = async (event) => {
        event.preventDefault();
    }

    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Card Payment: </h2>
                <CardElement></CardElement>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </FormContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;