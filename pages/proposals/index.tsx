import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import MyModal from '@/components/modal';
import PageTitle from '@/components/pageTitle';
import Table from '@/components/table';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { getProposalList } from '@/redux/actions/ProposalsAction';
import { RootState } from '@/redux/store';
import { Button } from '@/components/button';
import ToolTip from '@/components/tooltip';

export default function Projects() {

    const [showModal, setShowModal] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [dataLimit, setDataLimit] = React.useState(5);

    const dispatch = useDispatch();
    const { proposalsList, paginationData, isLoading } = useSelector((state: RootState) => state.proposal);


    const columnData: any[] = [
        { title: "Proposal No", id: "01" },
        { title: "Proposal Name", id: "02" },
        { title: "Plan", id: "03" },
        { title: "FA Code", id: "04" },
        { title: "Initial Sum Assured", id: "05" },
        { title: "Initial Premium", id: "06" },
        { title: "Action", id: "07" },
    ]

    React.useEffect(() => {
        dispatch(getProposalList(currentPage, dataLimit))
    }, [currentPage, dataLimit, dispatch])

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
                                    <input type="text" name="email" id="users-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search for users" />
                                </div>
                            </form>
                            <div className="flex space-x-1 pl-0 sm:pl-2 mt-3 sm:mt-0">
                                <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                </a>
                                <a href="#" className="text-gray-500 hover:text-gray-900 cursor-pointer p-1 hover:bg-gray-100 rounded inline-flex justify-center">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                </a>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                            <Link href="/proposals/create" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Add New Project
                            </Link>
                            <a href="#" className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" /></svg>
                                Export Project
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white block border-b border-gray-200">
                <Table
                    column={columnData}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    dataLimit={dataLimit}
                    totalData={paginationData.total}
                >
                    {
                        proposalsList && proposalsList.length > 0 && proposalsList.map((data, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                                <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                    {data.proposal_no}
                                </th>
                                <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                    {data.proposer_name}
                                </td>
                                <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                    {data.plan_id}
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
                                    <ToolTip content={`View Proposal No - ${data.proposal_no}`}>
                                        <Button
                                            onClick={''}
                                            customClass="p-1 rounded-md inline"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6C8.76722 6 5.95965 8.31059 4.2048 11.7955C4.17609 11.8526 4.15483 11.8948 4.1369 11.9316C4.12109 11.964 4.11128 11.9853 4.10486 12C4.11128 12.0147 4.12109 12.036 4.1369 12.0684C4.15483 12.1052 4.17609 12.1474 4.2048 12.2045C5.95965 15.6894 8.76722 18 12 18C15.2328 18 18.0404 15.6894 19.7952 12.2045C19.8239 12.1474 19.8452 12.1052 19.8631 12.0684C19.8789 12.036 19.8888 12.0147 19.8952 12C19.8888 11.9853 19.8789 11.964 19.8631 11.9316C19.8452 11.8948 19.8239 11.8526 19.7952 11.7955C18.0404 8.31059 15.2328 6 12 6ZM2.41849 10.896C4.35818 7.04403 7.7198 4 12 4C16.2802 4 19.6419 7.04403 21.5815 10.896C21.5886 10.91 21.5958 10.9242 21.6032 10.9389C21.6945 11.119 21.8124 11.3515 21.8652 11.6381C21.9071 11.8661 21.9071 12.1339 21.8652 12.3619C21.8124 12.6485 21.6945 12.8811 21.6032 13.0611C21.5958 13.0758 21.5886 13.09 21.5815 13.104C19.6419 16.956 16.2802 20 12 20C7.7198 20 4.35818 16.956 2.41849 13.104C2.41148 13.09 2.40424 13.0758 2.39682 13.0611C2.3055 12.881 2.18759 12.6485 2.13485 12.3619C2.09291 12.1339 2.09291 11.8661 2.13485 11.6381C2.18759 11.3515 2.3055 11.119 2.39682 10.9389C2.40424 10.9242 2.41148 10.91 2.41849 10.896ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8.00002 12C8.00002 9.79086 9.79088 8 12 8C14.2092 8 16 9.79086 16 12C16 14.2091 14.2092 16 12 16C9.79088 16 8.00002 14.2091 8.00002 12Z" />
                                            </svg>
                                        </Button>
                                    </ToolTip>
                                    <ToolTip content={`Edit Proposal No - ${data.proposal_no}`}>
                                        <Button
                                            onClick={''}
                                            customClass="p-1 rounded-md inline"
                                        >
                                            <Link href={`/proposals/edit/${data.proposal_no}`}>
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                            </Link>
                                        </Button>
                                    </ToolTip>
                                    <ToolTip content={`Delete Proposal No - ${data.proposal_no}`}>
                                        <Button
                                            onClick={''}
                                            customClass="p-1 rounded-md bg-red-600 inline"
                                        >
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        </Button>
                                    </ToolTip>
                                </td>
                            </tr>
                        ))
                    }
                </Table>
            </div>



            {/* <MyModal title="Add Project" size="lg" show={showModal} handleClose={handleClose} isDismissible={false}>
                <form action="#">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="text-sm font-medium text-gray-900 block mb-2">Project Name</label>
                        <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Project Name" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="text-sm font-medium text-gray-900 block mb-2">Project Code</label>
                        <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Project Codes" required />
                    </div>
                    <div className="mt-3 rounded-b">
                        <button className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Add user</button>
                    </div>

                </form>
            </MyModal> */}

        </div >
    )
}