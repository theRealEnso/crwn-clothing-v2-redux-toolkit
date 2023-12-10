import { useState } from 'react';

import {useDispatch} from 'react-redux';
import { signUpStart } from '../../store/user/user.reducer';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

// import {createAuthUserWithEmailAndPassword, createUserDocumentOrSignInUserFromAuth,} from '../../utils/firebase/firebase.utils';

import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();

  const [formInputFields, setFormInputFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formInputFields;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormInputFields({ 
      ...formInputFields, 
      [name]: value 
    });
  };

  const resetFormFields = () => {
    setFormInputFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('passwords do not match');
      return;
    }

    try {
      dispatch(signUpStart({email, password, displayName}));
      // const response = await createAuthUserWithEmailAndPassword(email, password);
      // console.log(response);
      // const { user } = await createAuthUserWithEmailAndPassword(email, password); //destructure user directly off of response object. Also, createUserWithEmailAndPassword does not automatically create a displayName, so we take the displayName that user inputs on the form and pass it into createUserDocumentOrSignInUserFromAuth as the second input into additionalInformation. This will automatically over-write the displayName we defined in that function with the displayName of the user input
      // await createUserDocumentOrSignInUserFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label='Display Name' type='text' required onChange={handleInputChange} name='displayName' value={displayName}/>

        <FormInput label='Email' type='email' required onChange={handleInputChange} name='email' value={email}/>

        <FormInput label='Password' type='password' required onChange={handleInputChange} name='password' value={password}/>

        <FormInput label='Confirm Password' type='password' required onChange={handleInputChange} name='confirmPassword'value={confirmPassword}/>

        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
