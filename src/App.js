import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

// import {onAuthStateChangedListener, createUserDocumentOrSignInUserFromAuth, } from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import ProductDetails from './routes/product-details/product-details.component';
// import { setCurrentUser } from './store/user/user.action';
import {checkUserSession} from './store/user/user.reducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch])

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChangedListener((user) => {
  //     if (user) {
  //       createUserDocumentOrSignInUserFromAuth(user);
  //     }
      
  //     // bypassing serializable check by creating a function that destructures off the values we want from the user constructor class object, putting those vales into a new object that redux toolkit understands, and only doing so if we actually get back a user object
  //     const pickedUserValues = user && (({accessToken, email}) => ({accessToken, email}))(user); // this is an "immediately invoked function expression", i.e. executes it right away. The (user) part at the end immediately invokes the function with the user object as its argument. This means it's passing the user object into the arrow function, destructures the accessToken and email properties, and returns a new object with only those properties. This new object is assigned to the pickedUserValues variable.
  //     console.log(setCurrentUser(pickedUserValues));
  //     dispatch(setCurrentUser(pickedUserValues));
  //   });

  //   return unsubscribe;
  // }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='product/:id' element={<ProductDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
