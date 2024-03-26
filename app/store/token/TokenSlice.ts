
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '@/app/config';

export interface Values {
  email: string | null;
}

export interface Questions {
  question: string
	options: string[]
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

interface QuestionData {
	question: string
	options: string[]
}

interface FetchedQuestionData {
	[questionId: string]: QuestionData
}

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
      return ""
  }
  return localStorage.getItem(key)
}

const userToken = getFromLocalStorage('qtToken')


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

const headers = new Headers()
	headers.append('Host', 'qt.organogram.app')
	headers.append('Token', userToken)
	headers.append('Content-Type', 'application/json')

export const getQuestions = createAsyncThunk('getQuestions', async (thunkAPI) => {

  try {
    const response = await fetch(`${API_URL}/questions`, {
      headers: headers,
    })
    if (!response.ok) {
      console.log(response.status)
    }
    const responseData = await response.json()

    console.log(responseData)

    if (Object.entries(responseData).length === 0) {
      return null
    } else {
      return responseData
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return error
  }
})

export const addQuestions = createAsyncThunk('addQuestions', async (data: Questions, thunkAPI) => {

  const res = await fetch(`${API_URL}/questions`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })

  const resData = await res.json()

  console.log(resData)

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
    }).addCase(addQuestions.pending, (state) => {
      state.loading = 'pending'
    }).addCase(addQuestions.fulfilled, (state, action: PayloadAction<FetchedData>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null;
    }).addCase(addQuestions.rejected, (state, action:PayloadAction<string>) => {
      state.loading = 'failed';
      state.error = action.payload;
    }).addCase(getQuestions.pending, (state) => {
      state.loading = 'pending'
    }).addCase(getQuestions.fulfilled, (state, action:PayloadAction<FetchedData>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null
    }).addCase(getQuestions.rejected, (state, action: PayloadAction<string>) => {
      state.loading = 'failed'
      state.error = action.payload
    })
  },
})

export default tokenSlice.reducer;