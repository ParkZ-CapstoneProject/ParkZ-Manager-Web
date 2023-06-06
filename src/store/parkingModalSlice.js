import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const parkingModalSlice = createSlice({
  name: "parkingModal",
  initialState,
  reducers: {
    setNumMotorbikeRows: (state, action) => {
      const { floorIndex, numMotorbikeRows } = action.payload;
      state[floorIndex].numMotorbikeRows = numMotorbikeRows;
    },
    setNumMotorbikeColumns: (state, action) => {
      const { floorIndex, numMotorbikeColumns } = action.payload;
      state[floorIndex].numMotorbikeColumns = numMotorbikeColumns;
    },
    setNumCarRows: (state, action) => {
      const { floorIndex, numCarRows } = action.payload;
      state[floorIndex].numCarRows = numCarRows;
    },
    setNumCarColumns: (state, action) => {
      const { floorIndex, numCarColumns } = action.payload;
      state[floorIndex].numCarColumns = numCarColumns;
    },
    setCarSlots: (state, action) => {
      const { floorIndex, carSlots } = action.payload;
      state[floorIndex].carSlots = carSlots;
    },
    setMotorbikeSlots: (state, action) => {
      const { floorIndex, motorbikeSlots } = action.payload;
      state[floorIndex].motorbikeSlots = motorbikeSlots;
    },
    initializeFloors: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  setNumMotorbikeRows,
  setNumMotorbikeColumns,
  setNumCarRows,
  setNumCarColumns,
  setCarSlots,
  setMotorbikeSlots,
  initializeFloors,
} = parkingModalSlice.actions;

export default parkingModalSlice.reducer;
