import {configureStore} from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

// import logger from 'redux-logger';
import { loggerMiddleware } from './middleware/logger';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware, sagaMiddleware].filter(Boolean); //filter out anything that is not true / is falsy.
//In other words, if our process environment is in development, then allow loggerMiddleware to function. If it is changed to 'production' then loggerMiddleware will not show


// note: redux toolkit includes 3 middlewares by default: 1.) has thunk, 2.) non-serializable values (which is something that throws an error whenever a serializable value is thrown into an action [serializable value is something that can't be stringified... so stuff like class constructors, ... serializable values need to be things like a plain JS object, numbers, strings] / reducer), and 3.) an immutability check middleware.

export const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  // if we pass in our own array of middlewares, it will over-ride 3 the default middlewares
  //if we want to pass our own middlewares as well as keep the default ones, then we need to pass a function to the middleware key, and pass into the function getDefaultMiddleware parameter that we get from redux toolkit => return back getDefaultMiddleware which is an array of default middlewares
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares) // append to the default middlewares array, our own middlewares array

  //can also turn off serializable check middleware completely by passing an object to the getDefaultMiddleware function
  //ex: middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableChec: false}).concat(middleWares)
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//    OLD WAY OF CREATING REDUX STORE USING legacy_createStore  //
// import {compose legacy_createStore, applyMiddleware} from 'redux';
// import {persistStore, persistReducer} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';

// import { rootReducer } from './root-reducer';

// const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
//   Boolean
// );

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['user'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = legacy_createStore(
//   persistedReducer,
//   undefined,
//   composedEnhancers
// );

// export const persistor = persistStore(store);
