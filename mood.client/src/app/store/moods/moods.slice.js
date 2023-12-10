import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    moods: []
}

export const moodsSlice = createSlice({
    name: "moodsSlice",
    initialState: INITIAL_STATE,
    reducers: {
        setMoods(state, action) {
            state.moods = action.payload;
        }
    }
});

export const { setMoods } = moodsSlice.actions;

export const moodsReducer = moodsSlice.reducer;