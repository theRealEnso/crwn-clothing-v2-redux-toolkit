import {createSlice} from '@reduxjs/toolkit';
import {User} from 'firebase/auth';

export type UserState = {
  currentUser: User | null;
  isLoading: boolean;
  error: Error | null;
};

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null
};

// createSlice is a function that needs an object to be passed in. The object has some key-values that tells what the reducer is going to do. Creates the reducer as well as the actions + action types. We no longer need to create our own action types, action file, or a separate reducer file. Now, we just need one file with a slice created
export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, action) => { // define one or more reducer functions to define how the state can be updated => still receives a state and an action (which represents every single possible action that can still flow through) and returns a new state object. Basically replaces the user reducer and the switch statement we did in the old way when we had the separate  user reducer file
      state.currentUser = action.payload; // Whenever setCurrentUser action is being dispatched from the component, I want to update the current user with the payload => looks like its being mutated, but under the hood is not. Returns a brand new state object under the hood, which in this case, returns a new state object where the currentUser is set to whatever the payload is
    },

    checkUserSession: (state) => {
      state.isLoading = true;
    },

    googleSignInStart: (state) => {
      state.isLoading = true;
    },

    // emailSignInStart: (state) => {
    //   state.isLoading = true;
    // },

    // change emailSignInStart to be defined as a reducer action object rather than a explicit reducer function. Then, define reducer as a function that receives a state and/or action
    // prepare is a special callback function in RTK and allows us to modify or preprocess the action payload before it gets passed to the reducer

    // someAction: {
    //   reducer: (state, action) => {
    //     // Reducer logic
    //   },
    //   prepare: (arg1, arg2, ...) => {
    //     // Return an object with a 'payload' property
    //     return { payload: /* processed payload */ };
    //   },
    // }
    // had to modify this to address the type error in the `handleSubmit` function inside the sign-in-form-component, specifically in the `try` block of code that dispatches the `emailSignInStart` function with a payload value of `{email, password}`. The type error reads `Argument of type '{ email: string; password: string; }' is not assignable to parameter of type 'void'.`
    emailSignInStart: {
      reducer: (state) => {
        state.isLoading = true;
      },
      prepare: ({email, password}: {email: string; password: string}) => {
        return {payload: {email, password}}
      }
  
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    signInFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // signUpStart: (state) => {
    //   state.isLoading = true;
    // },
    // had to modify this to address the type error in the `handleSubmit` function inside the sign-up-form-component, specifically in the `try` block of code that dispatches the `signUpStart` function with a payload value of `{email, password, displayName}`. The type error reads `Argument of type '{ email: string; password: string; displayName: string; }' is not assignable to parameter of type 'void'.`
    signUpStart: {
      reducer: (state) => {
        state.isLoading = true;
      },

      prepare: ({email, password, displayName}: {email: string; password: string; displayName: string}) => {
        return ({payload: {email, password, displayName}});
      }
    },

    signUpSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.error = null;
    },

    signUpFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    signOutStart: (state) => {
      state.isLoading = true;
    },

    signOutSuccess: (state) => {
      state.isLoading = false;
      state.currentUser = null;
    },

    signOutFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {setCurrentUser, checkUserSession, googleSignInStart, emailSignInStart, signInSuccess, signInFailed, signUpStart, signUpSuccess, signUpFailed, signOutStart, signOutSuccess, signOutFailed} = userSlice.actions; // .actions is a property on the user slice object that has all of the actions we write in the reducer. Extract the setCurrentUser action creator from the userSlice object

export const userReducer = userSlice.reducer; // .reducer is a property under the user slice object. Gets the actual reducer itself so that we can then aggregate to the root reducer


// old way before using redux toolkit //

// import { USER_ACTION_TYPES } from './user.types';

// export const userReducer = (state = USER_INITIAL_STATE, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
//       return { 
//         ...state,
//         currentUser: payload 
//       };

//     case USER_ACTION_TYPES.SIGN_IN_FAILED:
//       return {
//         ...state,
//         error: payload
//       }

//     case USER_ACTION_TYPES.SIGN_UP_SUCCESS:
//       return {
//         ...state,
//         currentUser: payload
//       }

//     case USER_ACTION_TYPES.SIGN_UP_FAILED:
//       return {
//         ...state,
//         error: payload
//       }

//     case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
//       return {
//         ...state,
//         currentUser: null
//       }

//     case USER_ACTION_TYPES.SIGN_OUT_FAILED:
//       return {
//         ...state,
//         error: payload
//       }

//     default:
//       return state;
//   };
// };
