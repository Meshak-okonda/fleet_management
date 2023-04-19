import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'userConnected',
	initialState: {
		user: {},
	},
	reducers: {
		connexionUser: (state, action) => {
			state.user = action.payload;
		},
		connexionClear: (state, action) => {
			state.user = {};
		},
	},
});

// Export Actions
export const { connexionUser, connexionClear } = userSlice.actions;

export default userSlice.reducer;
