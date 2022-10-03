import axios from 'axios'
import { createSlice, createAsyncThunk,PayloadAction } from '@reduxjs/toolkit'

// json-server db.json -m ./node_modules/json-server-auth --port 5000
type User = {
    id?: number
    email: string
    password: string
}

type InitialState = {
    loading: boolean
    users: User[]
    error: boolean
    isLogin: boolean
    isReg: boolean
}
const initialState: InitialState = {
    loading: false,
    users: [],
    error: false,
    isLogin: false,
    isReg: false
}

export const postLogIn = createAsyncThunk(
  "auth/postLogIn",
  async (users: User) => {
    return axios
      .post("https://reqres.in/api/login", {
        email: users.email,
        password: users.password
      })
      
     .then((response)=> response.data)
     
      .catch((err) => {
        if (err.response.status === 400) {
          return Promise.reject(err);
        } 
      });
  }
);

export const postReg = createAsyncThunk(
  "auth/postReg",
  async (users: User) => {
    return axios
      .post("https://reqres.in/api/login", {
        email: users.email,
        password: users.password
      })
      
     .then((response)=> response.data)
     
      .catch((err) => {
          return Promise.reject(err);
      });
  }
);
// http://localhost:5000/register if using json server auth
// http://localhost:5000/login

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {   
      reset: (state) => initialState
    }, 
    extraReducers: (builder) => {
      builder.addCase(postLogIn.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
      builder.addCase(postLogIn.fulfilled, (state ,action: PayloadAction<any>) => {
        state.loading = false;
        state.error = false;
        state.isLogin = true;
        state.users = action.payload;
      });
      builder.addCase(postLogIn.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isLogin = false;
      });
      builder.addCase(postReg.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
      builder.addCase(postReg.fulfilled, (state,action: PayloadAction<any>) => {
        state.loading = false;
        state.error = false;
        state.isReg = true;
        state.users = action.payload
      });
      builder.addCase(postReg.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isReg = false;
      });
    }
  }
)
export const {reset} = authSlice.actions
export default authSlice.reducer

// export const fetchUsers = createAsyncThunk('user/fetchUsers',()=>{
//     return axios
//         .get('https://jsonplaceholder.typicode.com/users')
//         .then((response)=> response.data)
// })
// export const postLogin = createAsyncThunk(
//     "auth/login",
//     async (data) => {
//       try {
//         const response = await axios.post("http://localhost:5000/login", data);
//         // If you want to get something back
//         // return response.data;
//       } catch (err) {
//         console.error(err)
//       }
//     }
//   );