import {constants} from "./constants";
import {combineReducers, Reducer} from "redux";
import {Action} from "./actions";

interface State {
    sample: string
}

export const initialState: any = {
    sample: "This is a sample redux state"
};

export const sample = (state = "", action: Action): string => {
    switch(action.type){
    case constants.SAMPLE_ACTION:
        return action.payload;
    default:
        return state;
    }
};

const reducers: Reducer<State> = combineReducers({
    sample
});

export default reducers;