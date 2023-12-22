// import {all, call, put, takeLatest} from 'redux-saga/effects';
import {all, call, put, takeLatest, CallEffect, PutEffect} from 'typed-redux-saga/macro'; // add /macro to leverage the babel macro plugin

import { createUserDocumentOrSignInUserFromAuth, getCurrentUser, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, signOutUser, createAuthUserWithEmailAndPassword, AdditionalInformation } from '../../utils/firebase/firebase.utils';

import { checkUserSession, googleSignInStart, emailSignInStart, signUpStart, signOutStart, signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed,  } from './user.reducer';

import {User} from 'firebase/auth';
import {Action} from 'redux';

type EmailSignInStart = ReturnType<typeof emailSignInStart>;
type SignUp = ReturnType<typeof signUpStart>;

function* onEmailSignInStartSaga(action: EmailSignInStart): Generator<CallEffect | PutEffect<Action>> {
    yield* call(signInWithEmail, action.payload); // Call your existing saga function with the payload
}
  
function* onSignUpStartSaga(action: SignUp): Generator<CallEffect | PutEffect<Action>> {
    yield* call(signUpUser, action.payload); // Call existing saga function with the payload
  }

//effects from saga => call effects are plain objects that describe what's happening. Use call when calling another function, making api requests, etc
// {
//     fn: createUserDocumentOrSignInUserFromAuth, 
//     params: [userAuth, additionalDetails]
// }
export function* getSnapshotFromUserAuth(userAuth: User, additionalInformation?: AdditionalInformation) { //additionalInformation is optional 2nd parameter. Fixes errors where this function is used without having this 2nd parameter
    try {
        const userSnapshot = yield* call(createUserDocumentOrSignInUserFromAuth, userAuth, additionalInformation); 
        // console.log(userSnapshot);
        // console.log(userSnapshot.data());
        if(userSnapshot){
            yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
}

export function* isUserSignedIn() {
    try {
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) return;
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

export function* signInWithGoogle() {
    try {
        const {user} = yield* call(signInWithGooglePopup);
        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

export function* signInWithEmail({payload: {email, password}}: { payload: { email: string; password: string } }) {
    try {
        // const {user} = yield* call(signInAuthUserWithEmailAndPassword, email, password); // modify bc we could get back undefined. Add a check to see if user credentials exists, if so, then destructure user off of the response
        // console.log(response);

        const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
        if(userCredential){
            const {user} = userCredential;
            yield* call(getSnapshotFromUserAuth, user)
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    };
};

// receive destructured payload off of sign up form component dispatching signUpStart with these values
export function* signUpUser({payload: {email, password, displayName}}: {payload: {email: string; password: string; displayName: string}}) { 
    try {
        // const {user} = yield* call(createAuthUserWithEmailAndPassword, email, password); // modify bc we could get back undefined. Add check to see if user credentials exists, if so, then destructure user from the response
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if(userCredential){
            const {user} = userCredential;
            yield* put(signUpSuccess({user, displayName}));
        }
    } catch(error) {
        yield* put(signUpFailed(error as Error));
    };
};

export function* signUserInAfterSignUp({payload: {user, additionalInformation}}: {payload: {user: User; additionalInformation: AdditionalInformation}}) {
    yield* call(getSnapshotFromUserAuth, user, additionalInformation);
};

export function* logOutUser() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    };
};

export function* onCheckUserSession() {
    yield* takeLatest(checkUserSession, isUserSignedIn)
};

export function* onGoogleSignInStart() {
    yield* takeLatest(googleSignInStart, signInWithGoogle);
};

export function* onEmailSignInStart(){
    yield* takeLatest(emailSignInStart.type, onEmailSignInStartSaga);
};

export function* onSignUpStart() {
    yield* takeLatest(signUpStart.type, onSignUpStartSaga);
};

export function* onSignUpSuccess() {
    yield* takeLatest(signUpSuccess, signUserInAfterSignUp);
};

export function* onSignOutStart() {
    yield* takeLatest(signOutStart, logOutUser)
}

export function* userSagas(){
    yield* all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)])
};