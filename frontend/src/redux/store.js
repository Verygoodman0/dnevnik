import {configureStore} from '@reduxjs/toolkit'

import { daysReducer } from './slices/days.js';

const store = configureStore({
    reducer: {
        days: daysReducer
    }
})

export default store;