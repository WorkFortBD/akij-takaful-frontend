
export interface IAuthReducer {
    isLoading: boolean;
    isSubmitting: boolean;
    loginData: any;
    loginInput: {
        email: string;
        password: string
    }
}

export interface ISelect2Item {
    label: string;
    value: number | string;
}

export interface IProject {
    isLoading: boolean;
    isDeleting: boolean;
    isLoadingDetails: boolean;
    isSubmitting: boolean;
    projectOptionList: any[];
    projectList: any[];
    projectPaginationData: any[];
    projectDetails: any;
    projectInput: {
        name: string;
        code: string;
    };
    projectDropdownList: Array<ISelect2Item>
}

export interface IBranch {
    isLoading: boolean;
    isDeleting: boolean;
    isLoadingDetails: boolean;
    isSubmitting: boolean;
    branchList: any[];
    branchPaginationData: any[];
    branchDetails: any;
    branchDropdownList: Array<ISelect2Item>
    branchInput: {
        project_id: number;
        name: string;
        code: string;
    }
}


export interface IEmployee {
    isLoading: boolean;
    isDeleting: boolean;
    isLoadingDetails: boolean;
    isSubmitting: boolean;
    employeeList: any[];
    employeePaginationData: any[];
    employeeDetails: any;
    rolesDropdownList: Array<ISelect2Item>
    employeeInput: {
        first_name: string;
        last_name: string;
        email: string;
        designation_id: number;
        role_id: number;
        project_id: number;
        branch_ids: Array<Number>;
        phone: string;
        avatar: string | null;
        password: string;
        confirm_password: string;
    }
}

export interface IDesignation {
    isLoading: boolean;
    isDeleting: boolean;
    isLoadingDetails: boolean;
    isSubmitting: boolean;
    designationDropdownList: Array<ISelect2Item>
}

export interface IGlobal {
    isOpenSidebar: boolean;
    sideMenuList: any[];
}

export interface IProposalBasicInput {
    project_id: number;
    branch_id: number;
    proposal_no: string;
    plan_id: number;
    fa_code: string;
    initial_sum_assured: number;
    initial_premium: number;
    proposal_personal_information: any;
    proposer_present_address: any;
    proposer_permanent_address: any;
    proposer_bank_information: any;
    proposer_guardian: any;
}

export interface IProposal {
    isLoading: boolean;
    isDeleting: boolean;
    isSubmitting: boolean;
    planDropdownList: any[];
    proposalsList: any[];
    loadingDetails: boolean;
    isSameAddress: boolean;
    paginationData: any[];
    proposalDetails: any;
    proposalInput: IProposalBasicInput;
    proposal_personal_information: {
        proposal_nominee_id: number;
        full_name: string;
        father_name: string;
        mother_name: string;
        spouse_name: string;
        email: string;
        mobile_no: string;
        marital_status: string;
        identity_type: string;
        gender: string;
        id_no: string;
        dob: string;
        occupation: string;
        relation: string;
        height: number;
        height_unit: string;
        weight: number;
        weight_unit: string;
        allocation: string;
    };
    proposer_present_address: {
        proposal_nominee_id: number;
        street_address: string;
        post_office_name: string;
        address_type: string;
        area_id: number;
        area_name: string;
        district_id: number;
        district_name: string;
        division_id: number;
        division_name: string;
        is_same_address: boolean;
    };
    proposer_permanent_address: {
        proposal_nominee_id: number;
        street_address: string;
        post_office_name: string;
        address_type: string;
        area_id: number;
        area_name: string;
        district_id: number;
        district_name: string;
        division_id: number;
        division_name: string;
        is_same_address: boolean;
    };
    proposer_bank_information: {
        proposal_nominee_id: number;
        bank_name: string;
        bank_branch_name: string;
        bank_account_no: string;
        bank_account_holder_name: string;
    };
    proposer_guardian: {
        proposal_nominee_id: number;
        name: string;
        phone_no: string;
        dob: string;
        id_no: string;
        relation: string;
    },
    printProposalList: Array<IProposalBasicInput>;
}

export interface IRole {
    isLoading: boolean;
    isDeleting: boolean;
    isSubmitting: boolean;
    roleList: any[];
    rolesListPaginated: any[];
    isRoleCreated: boolean,
    inputData: {
        id: number | string;
        role: string,
        isLoading: boolean,
        groupList: []
    },
}

export interface IStampForm {
    project_id: number;
    proposal_id: number;
    stamps: Array<object>;
}

export interface IStamp {
    isLoading: boolean;
    stampList: any[];
    stampPaginationData: any[];
    isSubmitting: boolean;
    stampForm: IStampForm;
}