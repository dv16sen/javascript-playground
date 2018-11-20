import {constants} from "./constants";

export interface Action {
    type: string,
    payload: any
}

export const sampleAction = (string: string): Action => {
    return {
        type: constants.SAMPLE_ACTION,
        payload: string
    }
};