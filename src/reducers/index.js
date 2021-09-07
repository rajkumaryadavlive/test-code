import { combineReducers } from "redux";
import loginReducer from "./isLogged";

const rootReducer = combineReducers({
    loggedIn: loginReducer
})

export default rootReducer;