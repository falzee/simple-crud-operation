import axios from 'axios'
import { createSlice, createAsyncThunk,PayloadAction } from '@reduxjs/toolkit'

//user butuh di definisikan type yang beda karena isinya ada lagi
// type User = {
//     id: number
//     email: string
//     password: string
// }

type InitialState = {
    // loading: boolean
    // users: User[]
    // error: string
    isLogin: boolean
}
const initialState: InitialState = {
    // loading: false,
    // users: [],
    // error: ''
    isLogin: false
}

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
    // extraReducers: builder =>{
    //     builder.addCase(postLogin.pending,state => {
    //         state.loading = true
    //     })
    //     builder.addCase(postLogin.fulfilled, (state, action) => {
    //         state.loading = false
    //         // state.users = action.payload
    //         state.error = ''
    //     })
    //     builder.addCase(postLogin.rejected, (state, action) => {
    //         state.loading = false
    //         state.error = action.error.message || 'Samting Wong'
    //     })
        
    }
)

export default authSlice.reducer
export const {login,logout} = authSlice.actions