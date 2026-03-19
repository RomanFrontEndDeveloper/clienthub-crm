import { createSlice } from '@reduxjs/toolkit';

type UserState = {
	name: string;
};

const initialState: UserState = {
	name: 'Roman',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export default userSlice.reducer;
