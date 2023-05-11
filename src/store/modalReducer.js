import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookingId: null,
  isOpen: false,
  accept: false,
  cancel: false,
  checkIn: false,
  checkOut: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
      //   state.id = action.payload.id;
    },
    closeModal: (state) => {
      state.isOpen = false;
      //   state.id = null;
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload;
    },
    setAccept: (state, action) => {
      state.accept = action.payload;
    },
    setCancel: (state, action) => {
      state.cancel = action.payload;
    },
    setCheckIn: (state, action) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action) => {
      state.checkOut = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  setBookingId,
  setAccept,
  setCancel,
  setCheckIn,
  setCheckOut,
} = modalSlice.actions;

export default modalSlice.reducer;
