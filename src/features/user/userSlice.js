import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    users: [],
    isUserError: false,
    isUserSuccess: false,
    isUserLoading: false,
    UserMessage: ""
}

const API_URL = process.env.NODE_ENV !== 'production' ? `/api/user` : `${process.env.REACT_APP_API_ENDPOINT}api/user`

export const fetchUsers = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.get(`${API_URL}`, config)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const addUser = createAsyncThunk("user/add", async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.post(API_URL, userData, config)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk("user/update", async (userData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.put(`${API_URL}/${userData.userRFID}`, userData, config)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk("user/delete", async (rfid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const res = await axios.delete(`${API_URL}/${rfid}`, config)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userReset: (state) => {
            state.isUserError = false
            state.isUserSuccess = false
            state.isUserLoading = false
            state.UserMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.isUserLoading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isUserLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isUserLoading = false;
                state.isUserError = true;
                state.UserMessage = action.payload;
                state.users = null;
            })
            .addCase(addUser.pending, (state) => {
                state.isUserLoading = true
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isUserLoading = false
                state.isUserSuccess = true
                state.isUserError = false
                state.users.push(action.payload)
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isUserLoading = false
                state.isUserError = true
                state.isUserSuccess = false
                state.UserMessage = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.isUserLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isUserLoading = false
                state.isUserSuccess = true
                state.isUserError = false
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isUserLoading = false
                state.isUserError = true
                state.isUserSuccess = false
                state.UserMessage = action.payload
            })
            .addCase(deleteUser.pending, (state) => {
                state.isUserLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isUserLoading = false
                state.isUserSuccess = true
                state.isUserError = false
                state.users = state.users.filter(user => user.id !== action.payload.id)
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isUserLoading = false
                state.isUserError = true
                state.isUserSuccess = false
                state.UserMessage = action.payload
            })
    }
})

export const { userReset } = userSlice.actions
export default userSlice.reducer