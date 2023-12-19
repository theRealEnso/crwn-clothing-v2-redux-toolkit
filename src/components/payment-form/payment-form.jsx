import {useState} from 'react';
import {useSelector} from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BUTTON_TYPE_CLASSES } from "../button/button.component"; // order of imports matter. Button needs to be imported first before the button type classes

import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form-styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const handlePayment = async (event) => {
        event.preventDefault();
    
        if(!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);
    
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(response => response.json());

        console.log(response);

        const {paymentIntent: {client_secret}} = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        });

        setIsProcessingPayment(false);

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
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay Now</PaymentButton>
            </FormContainer>

        </PaymentFormContainer>
    )
};

export default PaymentForm;