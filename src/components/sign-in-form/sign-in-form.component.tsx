import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.reducer';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

// import {signInAuthUserWithEmailAndPassword, signInWithGooglePopup,} from '../../utils/firebase/firebase.utils';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

// interface SignInPayload {
//   email: string;
//   password: string;
// }

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const signInWithGoogle = async () => dispatch(googleSignInStart(undefined)); // pass in undefined to bypass TS error, googleSignInStart doesn't require a payload

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields, 
      [name]: value 
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart({email, password}));
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  useEffect(() => {
    if(currentUser){
      navigate('/')
    }
  }, [currentUser, navigate])

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput label='Email' type='email' required onChange={handleInputChange} name='email' value={email}/>

        <FormInput label='Password' type='password' required onChange={handleInputChange} name='password' value={password}/>

        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>Sign In With Google</Button>
        </ButtonsContainer>

      </form>
    </SignInContainer>
  );
};

export default SignInForm;
