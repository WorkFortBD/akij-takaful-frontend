import * as Types from "./../types/ServiceCellType";
import { Toaster } from "@/components/toaster";
import { getAuthData } from "./AuthAction";
import AxiosCall from './../../components/_utlities/AxiosCall/index';

const BASE_URL = process.env.BASE_URL;

/**
 * 
 * @param name String
 * @param value Any
 * @returns data
 */
export const changeInputValue = (name: string, value: any) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: data });
};

/**
 * Store Service Cell
 * @param serviceCellInput Ex: {project_id, name, code}
 * @returns 
 */
export const submitServiceCell = (serviceCellInput, setShowModal) => (dispatch: any) => {
    if (serviceCellInput.name === "") {
        Toaster("error", "Branch name can't be blank!");
        return false;
    }
    if (serviceCellInput.code === "") {
        Toaster("error", "Branch code can't be blank!");
        return false;
    }
    if (serviceCellInput.project_id === "") {
        Toaster("error", "Project can't be blank!");
        return false;
    }
  
    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_SERVICE_CELL, payload: response });

    AxiosCall({ method: 'POST', url: `/servicecells`, data: serviceCellInput })
        .then((res) => {
            if (res.status === true) {
                response.status = true;
                response.isLoading = false;
                response.message = res.message;
                Toaster('success', response.message);
                setShowModal(false);
                 dispatch(getServiceCellList(1, 5));
                dispatch({ type: Types.SUBMIT_SERVICE_CELL, payload: response });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.SUBMIT_SERVICE_CELL, payload: response })
            }
        });
}

/**
 * Get Service Cell List.
 * @param currentPage Number -- Default 1
 * @param dataLimit Number -- Default 10
 * @returns void Dispatch `GET_SERVICE_CELL_LIST` action
 */
export const getServiceCellList = (currentPage: number = 1, dataLimit: number = 10) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_SERVICE_CELL_LIST, payload: response });

    AxiosCall({ method: 'GET', url: `/servicecells?perPage=${dataLimit}&currentPage=${currentPage}` })
        .then((res) => {
            if (res.status === true) {
                response.isLoading = false;
                response.status = true;
                response.message = res.data.message;
                response.data = res.data.data;
                response.paginationData = res.data;
                dispatch({ type: Types.GET_SERVICE_CELL_LIST, payload: response });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.GET_SERVICE_CELL_LIST, payload: response });
            }
        });
}



/**
 * Get Service Cell Details.
 * @param id Number -- Service Cell ID
 * @returns void Dispatch `GET_SERVICE_CELL_DETAILS` action
 */
export const getServiceCellDetails = (id: number | string) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: {},
        inputData: {
            name: "",
            code: ""
        }
    };
    dispatch({ type: Types.GET_SERVICE_CELL_DETAILS, payload: response });

    AxiosCall({ method: 'GET', url: `/servicecells/${id}` })
        .then((res) => {
            if (res.status === true) {
                response.isLoading = false;
                response.status = true;
                response.message = res.data.message;
                response.data = res.data;
                dispatch({ type: Types.GET_SERVICE_CELL_DETAILS, payload: response });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.GET_SERVICE_CELL_DETAILS, payload: response });
            }
        });
}


/**
 * Update Service Cell
 * @param serviceCellInput Ex: {project_id, name, code}
 * @returns 
 */
export const updateServiceCell = (serviceCellInput, setShowUpdateModal) => (dispatch: any) => {
    if (serviceCellInput.name === "") {
        Toaster("error", "Branch name can't be blank!");
        return false;
    }
    if (serviceCellInput.code === "") {
        Toaster("error", "Branch code can't be blank!");
        return false;
    }
    if (serviceCellInput.project_id === "") {
        Toaster("error", "Project can't be blank!");
        return false;
    }


    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.UPDATE_SERVICE_CELL_DETAILS, payload: response });

    AxiosCall({ method: 'PUT', url: `/servicecells/${serviceCellInput.id}`, data: {
        id: serviceCellInput.id,
        name: serviceCellInput.name,
        code: serviceCellInput.code,
        project_id: serviceCellInput.project_id,
    } })
        .then((res) => {
            if (res.status === true) {
                response.status = true;
                response.isLoading = false;
                response.message = res.message;
                Toaster('success', response.message);
                setShowUpdateModal(false);
                dispatch(getServiceCellList(1, 5));
                dispatch({ type: Types.UPDATE_SERVICE_CELL_DETAILS, payload: response });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            response.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.UPDATE_SERVICE_CELL_DETAILS, payload: response })
            }
        });
}


/**
 * Delete Branch Details.
 * @param id Number -- Branch ID
 * @returns void Dispatch `DELETE_SERVICE_CELL` action
 */
export const deleteServiceCell = (id, setShowDeleteModal) => (dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_SERVICE_CELL, payload: responseData });

    AxiosCall({ method: 'DELETE', url: `/servicecells/${id}` })
        .then((res) => {
            if (res.status === true) {
                responseData.isLoading = false;
                responseData.status = true;
                responseData.message = res.message;
                Toaster('success', responseData.message);
                setShowDeleteModal(false);
                dispatch(getServiceCellList(1, 5));
                dispatch({ type: Types.DELETE_SERVICE_CELL, payload: responseData });
            }
        })
        .catch((error) => {
            let responseLog = error.response;
            responseData.isLoading = false;
            if (typeof responseLog !== 'undefined') {
                const { request, ...errorObject } = responseLog;
                Toaster('error', responseLog.data.message);
                dispatch({ type: Types.DELETE_SERVICE_CELL, payload: responseData })
            }
        });
}



