import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  persons: {},
};

export const personsDataSlice = createSlice({
  name: "personsData",
  initialState,
  reducers: {
    addPersons: (state, action) => {
      state.persons = action.payload;
    },
  },
});

export const { addPersons } = personsDataSlice.actions;

export default personsDataSlice.reducer;
