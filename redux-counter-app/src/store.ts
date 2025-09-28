import { legacy_createStore } from "redux"
import type { Action } from "./types";

const initialState = {
    count: 0
}

const countReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case "increment": return { ...state, count: state.count + 1 };
        case "decrement": return { ...state, count: state.count - 1 };
        default: return state;
    }
}

const store = legacy_createStore(countReducer);

export default store;