
import { createAsyncThunk, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '@/app/config';
import { toast } from 'react-hot-toast';

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

interface EditData {
  id: string
  data: QuestionData
}

const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === 'undefined') {
      return ""
  }
  const item = localStorage.getItem(key)
  return item !== null ? item : "";
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

    if (responseData && Object.entries(responseData).length === 0) {
      return null
    } else {
      return responseData
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return error
  }
})

export const addQuestions = createAsyncThunk('addQuestions', async (data: QuestionData, thunkAPI) => {

    const res = await fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })
  
    const resData = await res.json()
  
    return resData
  

})

export const deleteQuestion = createAsyncThunk('deleteQuestion', async (data: string | null, thunkAPI) => {

  const res = await fetch(`${API_URL}/questions/${data}`, {
    method: 'DELETE',
    headers: headers,
  })

  const resData = await res.json()

  return resData
})

export const editQuestion = createAsyncThunk('editQuestion', async (data: EditData, thunkAPI) => {

  const res = await fetch(`${API_URL}/questions/${data?.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data?.data)
  })

  const resData = await res.json()

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
    }).addCase(addQuestions.pending, (state) => {
      state.loading = 'pending'
    }).addCase(addQuestions.fulfilled, (state, action: PayloadAction<FetchedData>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null;
    }).addCase(getQuestions.pending, (state) => {
      state.loading = 'pending'
    }).addCase(getQuestions.fulfilled, (state, action:PayloadAction<FetchedData>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null
    }).addCase(deleteQuestion.pending, (state) => {
      state.loading = 'pending'
    }).addCase(deleteQuestion.fulfilled, (state, action:PayloadAction<FetchedData>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null
    }).addCase(editQuestion.pending, (state) => {
      state.loading = 'pending'
    }).addCase(editQuestion.fulfilled, (state, action:PayloadAction<FetchedData>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null
    }).addMatcher(isRejected, (state, action) => {
      // Handle all rejected actions
      state.error = action.error.message === "Network Error" ? "Network Error" : "Unexpected Error";
    });
  },
})

export default tokenSlice.reducer;