import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategoriesArray } from '../../store/categories/category.reducer';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesArray = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      dispatch(setCategoriesArray(categoriesArray));
    };

    getCategoriesArray();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  );
};

export default Shop;
