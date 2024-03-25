import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '../config';

export interface Values {
  email: string | null;
}

export interface FetchedData {
  token: string | null
}

interface UserState {
  data: FetchedData | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean
}


export const getToken = createAsyncThunk('token', async (data: Values, thunkAPI) => {

  const res = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const resData = await res.json()

  console.log(resData)

  return resData
})

const initialState: UserState = {
  data: null,
  loading: 'idle',
  error: null,
  isAuthenticated: false
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state) => {
      state.loading = 'pending'
    }).addCase(getToken.fulfilled, (state, action: PayloadAction<FetchedData>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null;
    }).addCase(getToken.rejected, (state, action: PayloadAction<string>) => {
      state.loading = 'failed';
      state.error = action.payload;
    })
  },
})

export default tokenSlice.reducer;