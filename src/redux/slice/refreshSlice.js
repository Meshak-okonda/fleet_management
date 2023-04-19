import { createSlice } from '@reduxjs/toolkit';

export const refreshSlice = createSlice({
	name: 'refresh',
	initialState: {
		refresh: true,
	},
	reducers: {
		setRefresh: (state, action) => {
			state.refresh = action.payload;
		},
	},
});

// Export Actions
export const { setRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;
