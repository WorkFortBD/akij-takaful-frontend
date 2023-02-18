import { IServiceCell } from "../interfaces";
import * as Types from "./../types/ServiceCellType";

const initialState: IServiceCell = {
    isLoading           : false,
    isDeleting          : false,
    isLoadingDetails    : false,
    isSubmitting        : false,
    serviceCellList          : [],
    serviceCellPaginationData: {},
    serviceCellDetails       : null,
    serviceCellInput         : {
        project_id      : 1,
        name            : "",
        code            : "",
    }
};


function ServiceCellReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const serviceCellInput = { ...state.serviceCellInput };
            serviceCellInput[action.payload.name] = action.payload.value;
            return {
                ...state,
                serviceCellInput,
            };
        case Types.SUBMIT_SERVICE_CELL:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    serviceCellInput: initialState.serviceCellInput,
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_SERVICE_CELL_LIST:
            return {
                ...state,
                isLoading: action.payload.isLoading,
                serviceCellList: action.payload.data,
                serviceCellPaginationData: action.payload.paginationData,
            };

        case Types.GET_SERVICE_CELL_DETAILS:
            console.log(action.payload)
            return {
                ...state,
                isLoadingDetails: action.payload.isLoading,
                serviceCellDetails: action.payload.data,
                serviceCellInput: action.payload.data,
            };

            case Types.UPDATE_SERVICE_CELL_DETAILS:
                if (action.payload.status === true) {
                    return {
                        ...state,
                        isSubmitting: action.payload.isLoading,
                        serviceCellInput: initialState.serviceCellInput,
                    };
                } else {
                    return {
                        ...state,
                        isSubmitting: action.payload.isLoading,
                    };
                }

        case Types.DELETE_SERVICE_CELL:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };
        default:
            break;
    }
    return state;
}
export default ServiceCellReducer;

