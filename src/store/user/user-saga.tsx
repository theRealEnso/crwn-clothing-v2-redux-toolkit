// import {all, call, put, takeLatest} from 'redux-saga/effects';
import {all, call, put, takeLatest, take, actionChannel} from 'typed-redux-saga/macro'; // add /macro to leverage the babel macro plugin

import { PayloadAction } from '@reduxjs/toolkit';

import { createUserDocumentOrSignInUserFromAuth, getCurrentUser, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, signOutUser, createAuthUserWithEmailAndPassword, AdditionalInformation } from '../../utils/firebase/firebase.utils';

import { checkUserSession, googleSignInStart, emailSignInStart, signUpStart, signOutStart, signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed,  } from './user.reducer';

import {User} from 'firebase/auth';

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
            // const pickedUserValues = user && (({email, displayName}) => ({email, displayName}))(user);

            yield* call(getSnapshotFromUserAuth, user);
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
            const pickedUserValues = user && (({email, displayName}) => ({email, displayName}))(user);

            // yield* put(signUpSuccess({user, displayName}));
            yield* put(signUpSuccess(pickedUserValues));
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
        yield* put(signOutSuccess(undefined));
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
    // yield* takeLatest(emailSignInStart, signInWithEmail); // TS throws errors
    const emailSignInChannel = yield* actionChannel(emailSignInStart);
    while (true) {
      const action: PayloadAction<{email: string; password: string} | undefined> = yield* take(emailSignInChannel);

      if(action.payload){
        const {payload} = action;
        yield* call(signInWithEmail, {payload})
      };
    };
};

export function* onSignUpStart() {
    // yield* takeLatest(signUpStart, signUpUser); // TS throws errors
    const signUpStartChannel = yield* actionChannel(signUpStart);
    while (true) {
      const action: PayloadAction<{ email: string; password: string; displayName: string } | undefined> = yield* take(signUpStartChannel);

      if(action.payload){
        const {payload} = action;
        yield* call(signUpUser, {payload});
      };
    };
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