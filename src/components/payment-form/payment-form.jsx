import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component"; // order of imports matter. Button needs to be imported first before the button type classes

import { PaymentFormContainer, FormContainer } from "./payment-form-styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async (event) => {
        event.preventDefault();
    
        if(!stripe || !elements) {
            return;
        }
    
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: 10000})
        }).then(response => response.json());

        console.log(response);

        const {paymentIntent: {client_secret}} = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Ben Vu'
                }
            }
        })

        if(paymentResult.error){
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded'){
                alert(`Payment Successful`);
            }
        }
    }

    return (
        <PaymentFormContainer>

            <FormContainer onSubmit={handlePayment} >
                <h2>Credit Card Payment: </h2>
                <CardElement></CardElement>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</Button>
            </FormContainer>

        </PaymentFormContainer>
    )
};

export default PaymentForm;