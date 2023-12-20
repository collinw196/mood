import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    moodLogs: []
}

export const moodLogsSlice = createSlice({
    name: "moodLogsSlice",
    initialState: INITIAL_STATE,
    reducers: {
        setMoodLog(state, action) {
            var element = state.moodLogs.find((x) => x.moodName == action.payload.moodName);
            var index = state.moodLogs.indexOf(element);
            state.moodLogs[index] = action.payload;
        },
        addMoodLog(state, action) {
            if(!state.moodLogs.includes(action.payload.moodName))
                state.moodLogs.push(action.payload);
            else
                setMoodLog(state, action);
        },
        removeMoodLog(state, action) {
            var element = state.moodLogs.find((x) => x.MoodName == action.payload.moodName);
            state.moodLogs.splice(state.moodLogs.indexOf(element), 1);
        },
        clearMoodLogs() {
            state.moodLogs = [];
        }
    }
});

export const { setMoodLog, addMoodLog, 
    removeMoodLog, clearMoodLogs } = moodLogsSlice.actions;

export const moodLogsReducer = moodLogsSlice.reducer;