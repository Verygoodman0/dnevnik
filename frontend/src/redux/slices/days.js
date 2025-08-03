import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchDays = createAsyncThunk('posts/fetchDays', async () => {
    const data = await axios.get('/days');
    return data;
});

const initialState = {
    days: {
        items: [],
        status: 'loading'
    },
};

const daysSlice = createSlice({
    name: 'days',
    initialState,
    reducer: {},
    extraReducers: builder => {
        builder.addCase(fetchDays.pending, (state) => {
            state.days.items = []; 
            state.days.status = 'loading';
        });
        builder.addCase(fetchDays.fulfilled, (state, action) => {
            state.days.items = action.payload; //это видимо сама подгрузка постов 
            state.days.status = 'loaded';
        });
        //просто отлавлтвание pending и fulfilled в redux чтобы понять когда идет загрузка элементов
        builder.addCase(fetchDays.rejected, (state) => {
            state.days.items = []; 
            state.days.status = 'error';
        });
    }
});

export const daysReducer = daysSlice.reducer;