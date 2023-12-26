import {configureStore, Middleware, compose} from '@reduxjs/toolkit';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root-reducer';

import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

// import logger from 'redux-logger';
import { loggerMiddleware } from './middleware/logger';

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
};

type ExtendedPersistConfig = PersistConfig<RootState> & { // pass Rootstate into PersistConfig type that we get from redux-persist library, then intersect it with another type that defines what the whitelist can contain
  whitelist: (keyof RootState)[]; // keyof lets us get only the key values of the RootState, which is what we want the whitelist array to contain ('user', 'categories', 'cart' )
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();


// note: redux toolkit includes 3 middlewares by default: 1.) has thunk, 2.) non-serializable values (which is something that throws an error whenever a serializable value is thrown into an action [serializable value is something that can't be stringified... so stuff like class constructors, ... serializable values need to be things like a plain JS object, numbers, strings] / reducer), and 3.) an immutability check middleware.

const middleWares = [process.env.NODE_ENV === 'development' && loggerMiddleware, sagaMiddleware].filter((middleware): middleware is Middleware => Boolean(middleware));

//filter out anything that is not true / is falsy.
//In other words, if our process environment is in development, then allow loggerMiddleware to function. If it is changed to 'production' then loggerMiddleware will not show
//for typescript, because of the ampersand, we could technically run into a false value. In otherwords, if the process.ENV._NODE_ENV evaluates to false (i.e NOT in development mode), then everything afterwards, including the loggerMiddleware, sagaMiddleware, boolean filter, etc won't even be evaluated
//Typescript does not know that by filtering out whatever is truthy or falsy, that this middlewares array will narrow its type down to a middleware. All it knows is that, if it filters through the Boolean, it's going to be a boolean value, and by extension, a boolean type.
//This is where we need to tell typescript what this filter is doing. We know for sure we are working with middlewares, so we need to tell TS that we are working with middlewares. Redux gives us a Middleware Type that we import. From here, in the filter logic, we use Type Predicates and tell it that it will receive some middleware that IS of the Middleware Type, and then pass this middleware into the boolean check

export const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  // if we pass in our own array of middlewares, it will over-ride 3 the default middlewares
  //if we want to pass our own middlewares as well as keep the default ones, then we need to pass a function to the middleware key, and pass into the function getDefaultMiddleware parameter that we get from redux toolkit => return back getDefaultMiddleware which is an array of default middlewares
  //append to the default middlewares array, our own middlewares array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares) // typescript will complain here. Is addressed in boolean check above

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
