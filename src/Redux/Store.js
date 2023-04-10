import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './Features/userSlice';


const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    user: userSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export default configureStore ({
    reducer:persistedReducer
});

