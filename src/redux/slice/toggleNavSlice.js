import { createSlice } from '@reduxjs/toolkit';

export const toggleNavSlice = createSlice({
	name: 'toggleNav',
	initialState: {
		toggle: true,
	},
	reducers: {
		setToggleNav: (state, action) => {
			state.toggle = action.payload;
		},
	},
});

// Export Actions
export const { setToggleNav } = toggleNavSlice.actions;

export default toggleNavSlice.reducer;
