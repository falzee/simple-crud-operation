import axios from 'axios'
import { createSlice, createAsyncThunk,PayloadAction } from '@reduxjs/toolkit'

//user butuh di definisikan type yang beda karena isinya ada lagi
// json-server db.json -m ./node_modules/json-server-auth --port 5000
type User = {
    id: number
    email: string
    password: string
}

type InitialState = {
    loading: boolean
    users: User[]
    error: boolean
    isLogin: boolean
}
const initialState: InitialState = {
    loading: false,
    users: [],
    error: false,
    isLogin: false
}

export const postLogIn = createAsyncThunk(
  "auth/postLogIn",
  async ({ email, password }: User) => {
    return axios
      .post("http://localhost:5000/login", {
        email,
        password
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
  async ({ email, password }: User) => {
    return axios
      .post("http://localhost:5000/register", {
        email,
        password
      })
      
     .then((response)=> response.data)
     
      .catch((err) => {
          return Promise.reject(err);
      });
  }
);
const authSlice = createSlice({
    name: 'auth',
    initialState,
    //tambahin props reducers
    reducers: {   
      login(state){
        state.isLogin =true;
      },
      logout(state){
        state.isLogin =false;
      }
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
        state.users = action.payload
        return state;
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
      builder.addCase(postReg.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      });
      builder.addCase(postReg.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
    }
  }
)
export const {login,logout} = authSlice.actions
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