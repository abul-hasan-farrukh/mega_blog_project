import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

// store needs information about all the reducers
const store = configureStore({
    reducer: {
        auth : authSlice,
        //TODO: add more slices here for posts
    }
});


export default store;