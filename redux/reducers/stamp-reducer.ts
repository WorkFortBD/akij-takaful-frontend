import { IStamp } from "../interfaces";
import * as Types from "./../types/stamp-types";

const initialState: IStamp = {
    isLoading: false,
    stampList: [],
    stampPaginationData: [],
    isSubmitting: false,
    stampForm: {
        project_id: 0,
        proposal_id: 0,
        stamps: []
    },
};

function StampReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.GET_STAMP_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                stampList: action.payload.data,
                stampPaginationData: action.payload.paginationData,
            };

        case Types.CHANGE_STAMP_FORM:
            const stampForm = { ...state.stampForm };
            stampForm[action.payload.name] = action.payload.value;
            return {
                ...state,
                stampForm,
            };

        default:
            break;
    }
    return state;
}

export default StampReducer;
