import React, { useEffect } from "react";
import { useRouter } from "next/router";
import IBreadcrumb from "@/components/breadcrumb";
import PageTitle from "@/components/pageTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  getPlanDropdownList,
  changeInputValue,
  submitProposal,
} from "@/redux/actions/proposal-action";
import Button from "@/components/button";
import { PersonalInformation } from "@/components/proposals/PersonalInformation";
import { PremiumInformation } from "@/components/proposals/PremiumInformation";
import { AddressInformation } from "@/components/proposals/AddressInformation";
import { GuardianInformation } from "@/components/proposals/GuardianInformation";
import { BankInformation } from "@/components/proposals/BankInformation";
import { getProjectListDropdown } from "@/redux/actions/project-action";
import { getBranchDropdownList } from "@/redux/actions/branch-action";
import FormValidation from "../../utils/formValidation";

export default function Create() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { proposalInput, isSubmitting } = useSelector((state: RootState) => state.proposal);

  const [identityLabel, setIdentityLabel] = React.useState("ID No")
  const [identityValidationMessage, setIdentityValidationMessage] = React.useState("Please select identity type first")
  const [disabledField, setDisabledField] = React.useState(true)

  useEffect(() => {
    dispatch(getPlanDropdownList());
    dispatch(getProjectListDropdown());
    dispatch(getBranchDropdownList());
  }, []);

  const handleChangeTextInput = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, ""));
    // const isValid = validateForm(name, "test message")

  };

  // const { errors, validateEmail, validateNumber, validatePassword } =
  // FormValidation();

  const handleSubmitProposal = (e: React.ChangeEvent<HTMLInputElement>) => {

    // if (!isValid) {
    //   return false
    // }
    //dispatch(submitProposal(proposalInput, router));
    e.preventDefault();
  };

  const checkedIdentityType = (value: any) => {
    if (value == 'nid') {
      setIdentityLabel('NID No');
      setIdentityValidationMessage("NID minimum length must of 17/13 digits or 10 digit for smart card");
      setDisabledField(false);
    } else if (value == 'passport') {
      setIdentityLabel('Passport No');
      setIdentityValidationMessage("Passport minimum length must be 17 digits");
      setDisabledField(false);
    } else if (value == 'brc') {
      setIdentityLabel('Birth Certificate No');
      setIdentityValidationMessage("Birth certificate minimum length must be 17 digits");
      setDisabledField(false);
    } else {
      setIdentityLabel('ID No');
      setIdentityValidationMessage("Please select identity type first");
      setDisabledField(true);
    }
  }

  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <IBreadcrumb />
            <PageTitle title="New Proposal" />
          </div>

          <div className="mt-2">
            <form
              method="post"
              autoComplete="off"
              encType="multipart/form-data"
            >
              <PremiumInformation
                handleChangeTextInput={handleChangeTextInput}
              />

              <Button
                title="Save"
                loadingTitle="Saving..."
                onClick={(e) => handleSubmitProposal(e)}
                loading={isSubmitting}
                customClass="mt-4"
              />
            </form>


          </div>
        </div>
      </div>
    </div>
  );
}
