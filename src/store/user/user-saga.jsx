import {all, call, put, takeLatest} from 'redux-saga/effects';

import { createUserDocumentOrSignInUserFromAuth, getCurrentUser, signInWithGooglePopup, signInAuthUserWithEmailAndPassword, signOutUser, createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import { checkUserSession, googleSignInStart, emailSignInStart, signUpStart, signOutStart, signInSuccess, signInFailed, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed,  } from './user.reducer';

//effects from saga => call effects are plain objects that describe what's happening. Use call when calling another function, making api requests, etc
// {
//     fn: createUserDocumentOrSignInUserFromAuth, 
//     params: [userAuth, additionalDetails]
// }
export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
    try{
        const userSnapshot = yield call(createUserDocumentOrSignInUserFromAuth, userAuth, additionalInformation); 
        // console.log(userSnapshot);
        // console.log(userSnapshot.data());
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(signInFailed(error));
    };
}

export function* isUserSignedIn() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error));
    };
};

export function* signInWithGoogle() {
    try {
        const {user} = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error));
    };
};

export function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield call(signInAuthUserWithEmailAndPassword, email, password);
        // console.log(response);
        yield call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield put(signInFailed(error));
    };
};

export function* signUpUser({payload: {email, password, displayName}}) {
    try {
        const {user} = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, {displayName}));
    } catch(error) {
        yield put(signUpFailed(error));
    };
};

export function* signUserInAfterSignUp({payload: {user, additionalInformation }}) {
    yield call(getSnapshotFromUserAuth, user, additionalInformation);
};

export function* logOutUser() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    };
};

export function* onCheckUserSession() {
    yield takeLatest(checkUserSession, isUserSignedIn)
};

export function* onGoogleSignInStart() {
    yield takeLatest(googleSignInStart, signInWithGoogle);
};

export function* onEmailSignInStart() {
    yield takeLatest(emailSignInStart, signInWithEmail);
};

export function* onSignUpStart() {
    yield takeLatest(signUpStart, signUpUser);
};

export function* onSignUpSuccess() {
    yield takeLatest(signUpSuccess, signUserInAfterSignUp);
};

export function* onSignOutStart() {
    yield takeLatest(signOutStart, logOutUser)
}

export function* userSagas(){
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)])
};