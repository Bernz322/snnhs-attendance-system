import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    attendance: [],
    isAttendanceError: false,
    isAttendanceSuccess: false,
    isAttendanceLoading: false,
    attendanceMessage: ""
}

const API_URL = process.env.NODE_ENV !== 'production' ? `/api/attendance` : `${process.env.REACT_APP_API_ENDPOINT}api/attendance`

export const fetchUserAttendance = createAsyncThunk("attendance/fetch", async (rfid, thunkAPI) => {
    try {
        const res = await axios.get(`${API_URL}/${rfid}`)
        return res.data
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState,
    reducers: {
        attendanceReset: (state) => {
            state.isAttendanceSuccess = false
            state.isAttendanceSuccess = false
            state.isAttendanceLoading = false
            state.attendanceMessage = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAttendance.pending, state => {
                state.isAttendanceLoading = true
            })
            .addCase(fetchUserAttendance.fulfilled, (state, action) => {
                state.isAttendanceLoading = false;
                state.isAttendanceSuccess = true;
                state.attendance = action.payload;
            })
            .addCase(fetchUserAttendance.rejected, (state, action) => {
                state.isAttendanceLoading = false;
                state.isAttendanceError = true;
                state.attendanceMessage = action.payload;
                state.attendance = null;
            })
    }
})

export const { attendanceReset } = attendanceSlice.actions
export default attendanceSlice.reducer