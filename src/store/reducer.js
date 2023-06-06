import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import multiStepReducer from "./stepReducer";
import modalReducer from "./modalReducer";
import parkingModalReducer from "./parkingModalSlice";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  multiStep: multiStepReducer,
  modal: modalReducer,
  parkingModal: parkingModalReducer,
});

export default reducer;
