import { createSlice } from '@reduxjs/toolkit';

export const modeSlice = createSlice({
	name: 'mode',
	initialState: {
		day: true,
	},
	reducers: {
		setMode: (state, action) => {
			state.day = action.payload;
		},
	},
});

// Export Actions
export const { setMode } = modeSlice.actions;

export default modeSlice.reducer;
