import {createSlice} from '@reduxjs/toolkit';

const initialState = {english:"en"};

const ListSlice = createSlice({
  name: 'ListSlice',
  initialState,
  reducers: {
    togglelangauge: (state, action) => {
      state.english = action.payload;
    },
  },
});

export const actions = ListSlice.actions;
export default ListSlice.reducer;
