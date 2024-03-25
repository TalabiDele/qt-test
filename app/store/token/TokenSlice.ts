
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '@/app/config';

export interface Values {
  email: string | null;
}

export interface FetchedData {
  token: string | null
}

interface tokenState {
  data: FetchedData | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  token: string | null
}

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
      return ""
  }
  return localStorage.getItem(key)
}

console.log(getFromLocalStorage('qtToken'))


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

  localStorage.setItem("qtToken", resData.token)

  return resData
})

const initialState: tokenState = {
  data: null,
  loading: 'idle',
  error: null,
  token: getFromLocalStorage('qtToken') ? getFromLocalStorage('qtToken') : ''
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