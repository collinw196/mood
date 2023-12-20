import { combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./user/user.slice";
import { moodsReducer } from "./moods/moods.slice";
import { moodLogsReducer } from "./moodLogs/moodLogs.slice";

export const rootReducer = combineReducers({
    user: userReducer,
    moods: moodsReducer,
    moodLogs: moodLogsReducer
})