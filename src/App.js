import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

import {
  onAuthStateChangedListener,
  createUserDocumentOrSignInUserFromAuth,
} from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
// import { setCurrentUser } from './store/user/user.action';
import {setCurrentUser} from './store/user/user.reducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentOrSignInUserFromAuth(user);
      }
      
      // bypassing serializable check by creating a function that destructures off the values we want from the user object, putting it into a new object that redux toolkit understands, and only doing so if we actually get back a user object
      const pickedUser = user && (({accessToken, email}) => ({accessToken, email}))(user); // this is an "immediately invoked function expression", i.e. executes it right away. The (user) part at the end immediately invokes the function with the user object as its argument. This means it's passing the user object into the arrow function => takes the user object, destructures it to extract the accessToken and email properties, and returns a new object with only those properties. This new object is assigned to the pickedUser variable.
      console.log(setCurrentUser(pickedUser));
      dispatch(setCurrentUser(pickedUser));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
