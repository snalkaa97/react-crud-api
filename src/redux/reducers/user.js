/**
 * Template standar Reducer buat Redux Toolkit.
 */

 import {createSlice} from '@reduxjs/toolkit';

 /**
  * Nama Reducer.
  */
 const name = 'user';
 
 /**
  * State awal. Biasanya kosong, false, 0, dll, tapi balik lagi sesuai kebutuhan.
  */
 const initialState =
 {
   users: []
 };
 
 /**
  * Daftar fungsi reducers buat CRUD initial state.
  * Bebas mau bikin fungsi apa aja sesuai kebutuhan.
  * Cuma yang perlu diperhatikan saat CRUD, usahakan lakukan proses CRUD secara "immutable", artinya kita gak boleh sembarang ubah state secara langsung, tapi kita harus bikin copyan/duplikatnya dulu baru kita bisa ubah dari situ. https://css-tricks.com/understanding-immutability-in-javascript
  * Panduan yang biasa aku pakai: https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript#immutable-array-operations
  */
 const reducers =
 {
   getAllUser: (state, action) => {
    state.users = action.payload;
   },
   addUser: (state, action) =>
   {
     state.users = [...state.users, action.payload];
   },
   updateUser: (state, action) =>
   {
     state.users = state.users.map((user) => (user.id === action.payload.id ? action.payload : user))
   },
   deleteUser: (state, action) =>
   {
     console.log(action);
     const UserIndex = state.users.map((user) => user.id).indexOf(action.payload);
 
     state.users = [...state.users.slice(0, UserIndex), ...state.users.slice(UserIndex + 1)];
   }
 };
 
 /**
  * Buat slice, ini template juga.
  */
 const slice = createSlice(
 {
   name: name,
   initialState: initialState,
   reducers: reducers
 });
 
 /**
  * Terus kita export semua fungsi reducers yang udah kita buat tadi.
  */
 export const {getAllUser, addUser, updateUser, deleteUser} = slice.actions;
 
 export default slice.reducer;
 