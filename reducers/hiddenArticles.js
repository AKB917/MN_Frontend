import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const hiddenArticlesSlice = createSlice({
    name: 'hiddenArticles',
    initialState,
    reducers: {
        addhiddenArticles: (state, action) => {
            state.value.push(action.payload);
        },
        removeAllhiddenArticles: (state) => {
            state.value = [];
        },
    },
});

export const { addhiddenArticles, removehiddenArticles, removeAllhiddenArticles } = hiddenArticlesSlice.actions;
export default hiddenArticlesSlice.reducer;