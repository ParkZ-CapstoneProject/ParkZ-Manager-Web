import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import multiStepReducer from "./stepReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  multiStep: multiStepReducer,
});

export default reducer;
