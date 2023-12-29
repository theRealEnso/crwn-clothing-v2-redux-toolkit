export enum CATEGORIES_ACTION_TYPES {
  SET_CATEGORIES_ARRAY = 'category/SET_CATEGORIES_ARRAY',
  FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED',
};

export type CategoryItem = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string; 
}

export type Category = {
  title: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[]
};


// export const CATEGORIES_ACTION_TYPES = {
//   SET_CATEGORIES_ARRAY: 'category/SET_CATEGORIES_ARRAY',
//   FETCH_CATEGORIES_START: 'category/FETCH_CATEGORIES_START',
//   FETCH_CATEGORIES_SUCCESS: 'category/FETCH_CATEGORIES_SUCCESS',
//   FETCH_CATEGORIES_FAILED: 'category/FETCH_CATEGORIES_FAILED',
// };
