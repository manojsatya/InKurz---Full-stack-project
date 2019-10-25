// import all reducers here
// imports combinereducers from redux
// combine all reducers in one const
// and export to main index.js

import counterReducer from "./counterReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter: counterReducer
});

export default allReducers;
