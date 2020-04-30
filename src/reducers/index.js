import {combineReducers} from "redux";
import uploadReducer from "./uploadReducer";

export default combineReducers({
    upload: uploadReducer,
});