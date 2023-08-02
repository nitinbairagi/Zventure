import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {Apidata} from './api';
import ListSlice from './apislice/apislice';
export const reducer = combineReducers({
  [Apidata.reducerPath]: Apidata.reducer,
  ListSlice,
});

const Store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(Apidata.middleware),
});

export default Store;
