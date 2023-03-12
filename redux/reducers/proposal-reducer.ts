import { IProposal } from "../interfaces";
import * as Types from "../types/proposal-type";
import { generateDropdownList } from "@/utils/dropdown";

const initialState: IProposal = {
    isLoading: false,
    isDeleting: false,
    isSubmitting: false,
    proposalsList: [],
    paginationData: [],
    loadingDetails: false,
    planDropdownList: [],
    proposalDetails: {},
    isSameAddress: false,
    proposalInput: {
        project_id: 0,
        branch_id: 0,
        proposal_no: '',
        plan_id: 0,
        fa_code: '',
        initial_sum_assured: 0,
        initial_premium: 0,
        proposal_personal_information: {},
        proposer_present_address: {},
        proposer_permanent_address: {},
        proposer_bank_information: {},
        proposer_guardian: {},
    },
    proposal_personal_information: {
        proposal_nominee_id: 1,
        full_name: '',
        father_name: '',
        mother_name: '',
        spouse_name: '',
        email: '',
        mobile_no: '',
        marital_status: '',
        identity_type: '',
        gender: '',
        id_no: '',
        dob: '',
        occupation: '',
        relation: '',
        height: 0,
        height_unit: '',
        weight: 0,
        weight_unit: '',
        allocation: '',
    },
    proposer_permanent_address: {
        proposal_nominee_id: 1,
        street_address: '',
        post_office_name: '',
        address_type: '',
        area_id: 0,
        area_name: '',
        district_id: 0,
        district_name: '',
        division_id: 0,
        division_name: '',
        is_same_address: true,
    },
    proposer_present_address: {
        proposal_nominee_id: 1,
        street_address: '',
        post_office_name: '',
        address_type: '',
        area_id: 0,
        area_name: '',
        district_id: 0,
        district_name: '',
        division_id: 0,
        division_name: '',
        is_same_address: true,
    },
    proposer_bank_information: {
        proposal_nominee_id: 1,
        bank_name: '',
        bank_branch_name: '',
        bank_account_no: '0',
        bank_account_holder_name: '',
    },
    proposer_guardian: {
        proposal_nominee_id: 1,
        name: '',
        phone_no: '',
        dob: '',
        id_no: '',
        relation: '',
    },
    printProposalList: [],
};


function ProposalsReducer(state = initialState, action: any) {
    switch (action.type) {
        case Types.CHANGE_INPUT_VALUE:
            const proposalInput = { ...state.proposalInput };
            const proposal_personal_information = { ...state.proposal_personal_information };
            const proposer_present_address = { ...state.proposer_present_address };
            const proposer_permanent_address = { ...state.proposer_permanent_address };
            const proposer_bank_information = { ...state.proposer_bank_information };
            const proposer_guardian = { ...state.proposer_guardian };
            if (action.payload.key === 'proposal_personal_information') {
                proposal_personal_information[action.payload.data.name] = action.payload.data.value;
                proposalInput.proposal_personal_information = proposal_personal_information;
            }
            else if (action.payload.key === 'proposer_present_address') {
                proposer_present_address[action.payload.data.name] = action.payload.data.value;
                proposalInput.proposer_present_address = proposer_present_address;
            } else if (action.payload.key === 'proposer_permanent_address') {
                proposer_permanent_address[action.payload.data.name] = action.payload.data.value;
                proposalInput.proposer_permanent_address = proposer_permanent_address;
            } else if (action.payload.key === 'proposer_bank_information') {
                proposer_bank_information[action.payload.data.name] = action.payload.data.value;
                proposalInput.proposer_bank_information = proposer_bank_information;
            } else if (action.payload.key === 'proposer_guardian') {
                proposer_guardian[action.payload.data.name] = action.payload.data.value;
                proposalInput.proposer_guardian = proposer_guardian;
            }
            else {
                proposalInput[action.payload.data.name] = action.payload.data.value;
            }

            return {
                ...state,
                proposalInput,
                proposal_personal_information,
                proposer_present_address,
                proposer_permanent_address,
                proposer_bank_information,
                proposer_guardian
            };
        case Types.IS_SAME_ADDRESS_STATUS:
            const prevProposalInput = { ...state.proposalInput };
            const permanentAddress = { ...state.proposer_permanent_address };
            let presentAddress = { ...state.proposer_present_address };
            if(action.payload === true){
                prevProposalInput.proposer_present_address = permanentAddress
            }else{
                prevProposalInput.proposer_present_address = initialState.proposer_present_address
            }
            return {
                ...state,
                proposalInput: prevProposalInput,
                proposer_present_address: presentAddress,
                isSameAddress: action.payload
            };
        case Types.GET_PLAN_DROPDOWN:
            return {
                ...state,
                planDropdownList: generateDropdownList(action.payload),
            };

        case Types.GET_PLAN_LIST:
            return {
                ...state,
                planList: getPlanList(action.payload),
            };
        case Types.SUBMIT_PROPOSAL:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    proposalInput: initialState.proposalInput
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }

        case Types.GET_PROPOSAL_LIST:
            return {
                ...state,
                proposalsList: action.payload.data,
                paginationData: action.payload.paginationData,
                isLoading: action.payload.isLoading,
            };
        case Types.GET_PROPOSAL_DETAILS:
            return {
                ...state,
                loadingDetails: action.payload.isLoading,
                proposalInput: action.payload.inputData,
                proposalDetails: action.payload.data,
            };
        case Types.UPDATE_PROPOSAL:
            if (action.payload.status === true) {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                    proposalInput: initialState.proposalInput
                };
            } else {
                return {
                    ...state,
                    isSubmitting: action.payload.isLoading,
                };
            }
        case Types.DELETE_PROPOSAL:
            return {
                ...state,
                isDeleting: action.payload.isLoading,
            };

        case Types.PRINT_PROPOSAL:
            console.log(action.payload);
            
            return {
                ...state,
                printProposalList: action.payload.data,
                isLoading: action.payload.isLoading,
            };
        default:
            break;
    }
    return state;
}

const getPlanList = (data: any[]) => {
    let options: any[] = [];
    if (data) {
        data.forEach((item) => {
            let itemData = {
                value: item.id,
                label: item.name,
            };
            options.push(itemData);
        });
    }
    return options;
};

export default ProposalsReducer;