import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.slice";
import { moodsReducer } from "./moods/moods.slice";

export const rootReducer = combineReducers({
    user: userReducer,
    moods: moodsReducer
})