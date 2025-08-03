import {configureStore} from '@reduxjs/toolkit'

import { daysReducer } from './slices/days.js';
import { authReducer } from './slices/auth.js';

const store = configureStore({
    reducer: {
        days: daysReducer,
        auth: authReducer,
    }
})

export default store;