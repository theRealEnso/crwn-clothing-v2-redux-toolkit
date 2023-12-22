// import {all, call, put, takeLatest} from 'redux-saga/effects';
import {all, call, put, takeLatest} from 'typed-redux-saga/macro'; // adding /macro lets us use the babel plugin

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from './category.reducer';

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield* call(getCategoriesAndDocuments); // no need to add parens when using call on another function bc it breaks code => i.e. don't do yield call(getCategoriesAndDocuments());
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (error){
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategoriesStart(){
    yield* takeLatest(fetchCategoriesStart, fetchCategoriesAsync); // no need to add parens when using takeLatest on other functions => i.e. don't do yield* takeLatest(fetchCategoriesStart(), fetchCategoriesAsync);
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategoriesStart)]);
};