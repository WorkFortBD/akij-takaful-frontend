import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import Modal from '@/components/modal';
import PageTitle from '@/components/pageTitle';
import Table from '@/components/table';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getProposalList, getProposalDetails, deleteProposal } from '@/redux/actions/proposal-action';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Tooltip from '@/components/tooltip';
import Loading from '@/components/loading';

export default function Proposals() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [proposalID, setProposal] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);

    const { proposalsList, paginationData, proposalDetails, isLoading, loadingDetails, isDeleting } = useSelector((state: RootState) => state.Proposal);

    useEffect(() => {
        dispatch(getProposalList(currentPage, dataLimit))
    }, [currentPage, dataLimit])

    const showProposalDetails = (id: number) => {
        setShowModal(true);
        dispatch(getProposalDetails(id))
    }

    const handleDeleteProposal = (id: number) => {
        setShowDeleteModal(true);
        setProposal(id)
    }

    const columnData: any[] = [
        { title: "Proposal No", id: "01" },
        { title: "Plan", id: "03" },
        { title: "FA Code", id: "04" },
        { title: "Initial Sum Assured", id: "05" },
        { title: "Initial Premium", id: "06" },
        { title: "Action", id: "07" },
    ]

    return (
        <div>
            <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb />
                        <PageTitle title='all proposals' />
                    </div>
                    <div className="sm:flex">
                        <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                            <form className="lg:pr-3" action="#" method="GET">
                                <label htmlFor="users-search" className="sr-only">Search</label>
                                <div className="mt-1 relative lg:w-64 xl:w-96">
                                    <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for proposals" />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            <Link href="/proposals/create" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                New Proposal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white block border-b border-gray-200">
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Proposals" />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={paginationData.total}
                        >
                            {
                                proposalsList && proposalsList.length > 0
                                && proposalsList.map((data, index) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.proposal_no}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {data.plan_name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.fa_code}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.initial_sum_assured}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {data.premium}
                                        </td>

                                        <td className="px-2 py-3 flex gap-1">
                                            <Tooltip content={`View Proposal No - ${data.proposal_no}`}>
                                                <Button
                                                    onClick={() => showProposalDetails(data.id)}
                                                    customClass="p-1 rounded-md inline"
                                                >
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 6C8.76722 6 5.95965 8.31059 4.2048 11.7955C4.17609 11.8526 4.15483 11.8948 4.1369 11.9316C4.12109 11.964 4.11128 11.9853 4.10486 12C4.11128 12.0147 4.12109 12.036 4.1369 12.0684C4.15483 12.1052 4.17609 12.1474 4.2048 12.2045C5.95965 15.6894 8.76722 18 12 18C15.2328 18 18.0404 15.6894 19.7952 12.2045C19.8239 12.1474 19.8452 12.1052 19.8631 12.0684C19.8789 12.036 19.8888 12.0147 19.8952 12C19.8888 11.9853 19.8789 11.964 19.8631 11.9316C19.8452 11.8948 19.8239 11.8526 19.7952 11.7955C18.0404 8.31059 15.2328 6 12 6ZM2.41849 10.896C4.35818 7.04403 7.7198 4 12 4C16.2802 4 19.6419 7.04403 21.5815 10.896C21.5886 10.91 21.5958 10.9242 21.6032 10.9389C21.6945 11.119 21.8124 11.3515 21.8652 11.6381C21.9071 11.8661 21.9071 12.1339 21.8652 12.3619C21.8124 12.6485 21.6945 12.8811 21.6032 13.0611C21.5958 13.0758 21.5886 13.09 21.5815 13.104C19.6419 16.956 16.2802 20 12 20C7.7198 20 4.35818 16.956 2.41849 13.104C2.41148 13.09 2.40424 13.0758 2.39682 13.0611C2.3055 12.881 2.18759 12.6485 2.13485 12.3619C2.09291 12.1339 2.09291 11.8661 2.13485 11.6381C2.18759 11.3515 2.3055 11.119 2.39682 10.9389C2.40424 10.9242 2.41148 10.91 2.41849 10.896ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8.00002 12C8.00002 9.79086 9.79088 8 12 8C14.2092 8 16 9.79086 16 12C16 14.2091 14.2092 16 12 16C9.79088 16 8.00002 14.2091 8.00002 12Z" />
                                                    </svg>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content={`Edit Proposal No - ${data.proposal_no}`}>
                                                <Button
                                                    onClick={''}
                                                    customClass="p-1 rounded-md inline"
                                                >
                                                    <Link href={`/proposals/edit?id=${data.id}`}>
                                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                                    </Link>
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content={`Delete Proposal No - ${data.proposal_no}`}>
                                                <Button
                                                    onClick={() => handleDeleteProposal(data.id)}
                                                    customClass="p-1 rounded-md bg-red-600 inline"
                                                >
                                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                                </Button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))
                            }
                        </Table>
                }
            </div>

            <Modal title="Proposal Details" size="md" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
                {
                    loadingDetails ?
                        <div className="text-center">
                            <Loading loadingTitle="Proposal Details" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof proposalDetails !== "undefined" && proposalDetails !== null) ? (
                                    <div className="grid gap-2 grid-cols-2">
                                        <div className='flex justify-between'>
                                            <h6>Proposal No</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.proposal_no}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Proposal Name</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.proposer_name}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Plan</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.plan_name}</h6>
                                        <div className='flex justify-between'>
                                            <h6>FA Code</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.fa_code}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Initial Sum Assured</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.initial_sum_assured}</h6>
                                        <div className='flex justify-between'>
                                            <h6>Initial Premium</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{proposalDetails.premium}</h6>
                                    </div>
                                ) : (
                                    <div>Something Went wrong!</div>
                                )
                            }

                        </div>
                }
            </Modal>


            <Modal title="Proposal Details" size="md" show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} isDismissible={false} isShowHeader={false}>
                <div className="text-gray-900 text-center flex flex-col justify-center items-center">
                    <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5.5C12.5523 5.5 13 5.94772 13 6.5L13 13.5C13 14.0523 12.5523 14.5 12 14.5C11.4477 14.5 11 14.0523 11 13.5L11 6.5C11 5.94772 11.4477 5.5 12 5.5Z" fill="red" />
                        <path d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z" fill="red" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="red" />
                    </svg>
                    <h2 className='text-2xl font-bold mt-2'> Are You Sure To Delete? </h2>

                </div>
                <div className='text-right flex justify-end gap-2'>
                    <Button title="Yes" customClass="inline py-2 px-3 rounded-md" loading={isDeleting} loadingTitle="Delete Proposal..." onClick={() => dispatch(deleteProposal(proposalID, setShowDeleteModal))} />
                    <Button title="No" customClass="bg-gray-900 inline py-2 px-3 rounded-md" onClick={() => setShowDeleteModal(false)} />
                </div>
            </Modal>


        </div >
    )
}
