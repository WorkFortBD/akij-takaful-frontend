import axios from "@/utils/axios";
import * as Types from "./../types/stamp-types";

export const changeStampInputValue = (name: string, value: any) => (dispatch: any) => {
    dispatch({
        type: Types.CHANGE_STAMP_FORM, payload: {
            name: name,
            value: value,
        }
    });
};

export const getStampListAction = (currentPage: number = 1, dataLimit: number = 10, searchText = '') => (dispatch) => {
    let url = `stamps?perPage=${dataLimit}`

    if (searchText !== '') {
        url += `&search=${searchText}`;
    }

    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };
    dispatch({ type: Types.GET_STAMP_LIST, payload: response });

    axios.get(url)
        .then((res) => {
            response.isLoading = false;
            response.status = true;
            response.message = res.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_STAMP_LIST, payload: response });
        }).catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.GET_STAMP_LIST, payload: response })
        })
}