import * as Types from "./../types/proposal-type";
import axios from "@/utils/axios";
import { Toaster } from "@/components/toaster";
import { IProposal } from "../interfaces";

export const changeInputValue = (name: string, value: any, key: string) => (dispatch: any) => {
    let data = {
        name: name,
        value: value,
    }
    dispatch({ type: Types.CHANGE_INPUT_VALUE, payload: { data, key } });
};


export const submitProposal = (proposalInput: IProposal, router: any) => (dispatch: any) => {
    // if (proposalInput.proposal_no === "") {
    //     Toaster("error", "Proposal No can't be blank!");
    //     return false;
    // }

    // if (proposalInput.plan_id === 0) {
    //     Toaster("error", "Plan can't be blank!");
    //     return false;
    // }
    // if (proposalInput.fa_code === "") {
    //     Toaster("error", "Fa code can't be blank!");
    //     return false;
    // }
    // if (proposalInput.initial_sum_assured === "") {
    //     Toaster("error", "Initial sum assured can't be blank!");
    //     return false;
    // }
    // if (proposalInput.premium === "") {
    //     Toaster("error", "Initial premium can't be blank!");
    //     return false;
    // }

    let response = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.SUBMIT_PROPOSAL, payload: response });

    axios({
        method: 'POST',
        url: `/proposals`,
        data: proposalInput
    })
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            Toaster('success', response.message);
            // dispatch(getBranchList(1, 5));

            router.push('/proposals');
            dispatch({ type: Types.SUBMIT_PROPOSAL, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.SUBMIT_PROPOSAL, payload: response });
        });
}

export const getProposalList = (currentPage: number = 1, dataLimit: number = 10) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
        paginationData: [],
    };

    dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });

    axios.get(`/proposals?perPage=${dataLimit}&currentPage=${currentPage}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data.data;
            response.paginationData = res.data;
            dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_PROPOSAL_LIST, payload: response });
        });
}

export const getProposalDetails = (id: number | string) => (dispatch) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: null,
        inputData: {},
    };
    dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });

    axios.get(`/proposals/${id}`)
        .then(res => {
            response.isLoading = false;
            response.status = true;
            response.message = res.data.message;
            response.data = res.data.data;
            // Optional Data,
            response.inputData.project_id = 1;
            response.inputData.branch_id = 1;
            response.inputData.proposal_no = res.data.data.proposal_no;
            response.inputData.proposer_name = res.data.data.proposer_name;
            response.inputData.plan_id = res.data.data.plan_id;
            response.inputData.fa_code = res.data.data.fa_code;
            response.inputData.initial_sum_assured = res.data.data.initial_sum_assured;
            response.inputData.initial_premium = res.data.data.initial_premium;
            dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });
        })
        .catch(error => {
            response.isLoading = false;
            dispatch({ type: Types.GET_PROPOSAL_DETAILS, payload: response });
        });
}

export const updateProposal = (proposalInput: proposalInputType, id: number) => (dispatch: any) => {
    if (proposalInput.proposal_no === "") {
        Toaster("error", "Proposal No can't be blank!");
        return false;
    }
    if (proposalInput.proposer_name === "") {
        Toaster("error", "Proposal name can't be blank!");
        return false;
    }
    if (proposalInput.plan_id === 0) {
        Toaster("error", "Plan can't be blank!");
        return false;
    }
    if (proposalInput.fa_code === "") {
        Toaster("error", "Fa code can't be blank!");
        return false;
    }
    if (proposalInput.initial_sum_assured === "") {
        Toaster("error", "Initial sum assured can't be blank!");
        return false;
    }
    if (proposalInput.premium === "") {
        Toaster("error", "Initial premium can't be blank!");
        return false;
    }

    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData });

    axios.put(`/proposals/${id}`, proposalInput)
        .then(res => {
            responseData.status = true;
            responseData.isLoading = false;
            responseData.message = res.data.message;
            Toaster('success', responseData.message);
            dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData });
        }).catch((error) => {
            responseData.isLoading = false;
            dispatch({ type: Types.UPDATE_PROPOSAL, payload: responseData })
        })
}

export const deleteProposal = (id, setShowDeleteModal) => (dispatch) => {
    let responseData = {
        status: false,
        message: "",
        isLoading: true,
    };
    dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData });

    axios.delete(`/proposals/${id}`)
        .then(res => {
            responseData.isLoading = false;
            responseData.status = true;
            responseData.message = res.data.message;
            Toaster('success', responseData.message);
            setShowDeleteModal(false);
            dispatch(getProposalList());
            dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData });
        })
        .catch(error => {
            responseData.isLoading = false;
            dispatch({ type: Types.DELETE_PROPOSAL, payload: responseData })
        });
}

export const getPlanDropdownList = () => (dispatch: any) => {
    axios.get(`/plans/dropdown/list`)
        .then((res) => {
            dispatch({ type: Types.GET_PLAN_DROPDOWN, payload: res.data });
        });
};


export const isSameAddressCheck = (status) => (dispatch) => {
    dispatch({ type: Types.IS_SAME_ADDRESS_STATUS, payload: status });
}

export const printProposalAction = (proposalPrintData: object) => (dispatch: any) => {
    let response = {
        status: false,
        message: "",
        isLoading: true,
        data: [],
    };
    dispatch({ type: Types.PRINT_PROPOSAL, payload: response });

    axios.post(`/proposals/print`, proposalPrintData)
        .then((res) => {
            response.status = true;
            response.isLoading = false;
            response.message = res.message;
            response.data = res.data;
            Toaster('success', response.message);
            dispatch({ type: Types.PRINT_PROPOSAL, payload: response });
        })
        .catch((error) => {
            response.isLoading = false;
            dispatch({ type: Types.PRINT_PROPOSAL, payload: response });
        });
}