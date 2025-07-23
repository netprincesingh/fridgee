// redux/store/slices/itemsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
    clearItems: (state) => {
      state.list = [];
    },
    removeItem: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    }

  },
});

export const { addItem, clearItems, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
