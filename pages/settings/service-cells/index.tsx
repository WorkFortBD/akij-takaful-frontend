import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Breadcrumb from '@/components/breadcrumb';
import Modal from '@/components/modal';
import PageTitle from '@/components/pageTitle';
import Table from '@/components/table';
import Button from '@/components/button';
import Tooltip from '@/components/tooltip';
import Loading from '@/components/loading';
import Input from '@/components/input';
import Select from '@/components/select';
import { getProjectList } from '@/redux/actions/ProjectAction';
import { changeInputValue, submitServiceCell, getServiceCellList, getServiceCellDetails, deleteServiceCell, updateServiceCell} from '@/redux/actions/ServiceCellAction';

export default function Proposals() {

    const dispatch = useDispatch();
    
    const [showModal, setShowModal]               = React.useState<boolean>(false);
    const [showDetailsModal, setShowDetailsModal] = React.useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal]   = React.useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal]   = React.useState<boolean>(false);
    const [serviceCellID, setServiceCellID]       = React.useState<number | null>(null);
    const [currentPage, setCurrentPage]           = React.useState<number>(1);
    const [dataLimit, setDataLimit]               = React.useState<number>(5);

    const { serviceCellInput, serviceCellList, serviceCellPaginationData, isLoading, isSubmitting, serviceCellDetails, isLoadingDetails, isDeleting } = useSelector((state: RootState) => state.ServiceCell);
    const { projectOptionList } = useSelector((state: RootState) => state.Project);

    const columnData: any[] = [
        { title: "Service Cell Name", id: "01" },
        { title: "Code", id: "02" },
        { title: "Project ID", id: "03" },
        { title: "Action", id: "04" },
    ]

    React.useEffect(() => {
        dispatch(getServiceCellList(currentPage, dataLimit));
    }, [currentPage, dataLimit])

    React.useEffect(() => {
        dispatch(getProjectList(1, 2000));
    }, [])

    const handleOpenModal = (id: number, type: string) => {
        if (type === "view") {
            setShowDetailsModal(true);
            dispatch(getServiceCellDetails(id));
        } else if (type === "edit") {
            setShowUpdateModal(true);
              dispatch(getServiceCellDetails(id));
        } else {
            setShowDeleteModal(true);
            setServiceCellID(id);
        }
    }

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };


    const onSubmit = (e: any, type: string) => {
        if (type === "edit") {
            dispatch(updateServiceCell(serviceCellInput, setShowUpdateModal));
        } else {
          dispatch(submitServiceCell(serviceCellInput, setShowModal));
        }
        e.preventDefault();
    }

    return (
        <div>
            <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb />
                        <PageTitle title='all service cells' />
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
                            <Button
                                onClick={() => setShowModal(true)}
                                customClass="flex"
                            >
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                Add Service Cells
                            </Button>
                            <a href="#" className="w-1/2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                                <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" /></svg>
                                Export Service Cell
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white block border-b border-gray-200">
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Service Cells" />
                        </div> :

                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={serviceCellPaginationData && serviceCellPaginationData.total}
                        >
                            {serviceCellList && serviceCellList.length > 0 && serviceCellList.map((data, index) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.name}
                                    </th>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.code}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.project_id}
                                    </td>

                                    <td className="px-2 py-3 flex gap-1">
                                        <Tooltip content={`View - ${data.name}`}>
                                            <Button
                                                onClick={() => handleOpenModal(data.id, 'view')}
                                                customClass="p-1 rounded-md inline"
                                            >
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 6C8.76722 6 5.95965 8.31059 4.2048 11.7955C4.17609 11.8526 4.15483 11.8948 4.1369 11.9316C4.12109 11.964 4.11128 11.9853 4.10486 12C4.11128 12.0147 4.12109 12.036 4.1369 12.0684C4.15483 12.1052 4.17609 12.1474 4.2048 12.2045C5.95965 15.6894 8.76722 18 12 18C15.2328 18 18.0404 15.6894 19.7952 12.2045C19.8239 12.1474 19.8452 12.1052 19.8631 12.0684C19.8789 12.036 19.8888 12.0147 19.8952 12C19.8888 11.9853 19.8789 11.964 19.8631 11.9316C19.8452 11.8948 19.8239 11.8526 19.7952 11.7955C18.0404 8.31059 15.2328 6 12 6ZM2.41849 10.896C4.35818 7.04403 7.7198 4 12 4C16.2802 4 19.6419 7.04403 21.5815 10.896C21.5886 10.91 21.5958 10.9242 21.6032 10.9389C21.6945 11.119 21.8124 11.3515 21.8652 11.6381C21.9071 11.8661 21.9071 12.1339 21.8652 12.3619C21.8124 12.6485 21.6945 12.8811 21.6032 13.0611C21.5958 13.0758 21.5886 13.09 21.5815 13.104C19.6419 16.956 16.2802 20 12 20C7.7198 20 4.35818 16.956 2.41849 13.104C2.41148 13.09 2.40424 13.0758 2.39682 13.0611C2.3055 12.881 2.18759 12.6485 2.13485 12.3619C2.09291 12.1339 2.09291 11.8661 2.13485 11.6381C2.18759 11.3515 2.3055 11.119 2.39682 10.9389C2.40424 10.9242 2.41148 10.91 2.41849 10.896ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8.00002 12C8.00002 9.79086 9.79088 8 12 8C14.2092 8 16 9.79086 16 12C16 14.2091 14.2092 16 12 16C9.79088 16 8.00002 14.2091 8.00002 12Z" />
                                                </svg>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content={`Edit - ${data.name}`}>
                                            <Button
                                                onClick={() => handleOpenModal(data.id, "edit")}
                                                customClass="p-1 rounded-md inline"
                                            >

                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip content={`Delete - ${data.name}`}>
                                            <Button
                                                onClick={() => handleOpenModal(data.id, "delete")}
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

            {/** Add Project Modal */}
            <Modal title={`Add Service Cell`} size="md" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
                <form
                    method="post"
                    autoComplete="off"
                    encType="multipart/form-data"
                >
                    <Input
                        label="Service Cell Name"
                        name="name"
                        placeholder='Service Cell Name'
                        value={serviceCellInput.name}
                        isRequired={true}
                        inputChange={changeTextInput}
                    />
                    <Input
                        label="Service Cell Code"
                        name="code"
                        placeholder='Service Cell Code'
                        value={serviceCellInput.code}
                        isRequired={true}
                        inputChange={changeTextInput}
                    />

                    <Select
                        options={projectOptionList}
                        isSearchable={true}
                        name="project_id"
                        label="Project"
                        defaultValue=""
                        placeholder='Select Project...'
                        handleChangeValue={changeTextInput}
                    />
                    <div className="mt-2">
                        <Button
                            title="Submit Service Cell"
                            onClick={(e) => onSubmit(e, "add")}
                            position="text-left"
                            loadingTitle="Submitting..."
                            loading={isSubmitting}
                        />
                    </div>
                </form>

            </Modal>


            <Modal title={`Service Cell Details`} size="md" show={showDetailsModal} handleClose={() => setShowDetailsModal(false)} isDismissible={false}>
                {
                    isLoadingDetails === true ?
                        <div className="text-center">
                            <Loading loadingTitle="Service Cell Details" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof serviceCellDetails !== "undefined" && serviceCellDetails !== null) ? (
                                    <div className="grid gap-2 grid-cols-2">
                                        <div className='flex justify-between'>
                                            <h6> Name</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{serviceCellDetails.name}</h6>
                                      
                                        <div className='flex justify-between'>
                                            <h6>Code</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{serviceCellDetails.code}</h6>
                                          <div className='flex justify-between'>
                                            <h6>Project ID</h6>
                                            <h6>:</h6>
                                        </div>
                                        <h6>{serviceCellDetails.project_id}</h6>
                                    </div>
                                ) : (
                                    <div>Something Went wrong!</div>
                                )
                            }
                        </div>
                }
            </Modal>


            {/** Edit Project Modal */}
            <Modal title={`Update Service Cell`} size="md" show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} isDismissible={false}>
                {
                    isLoadingDetails === true ?
                        <div className="text-center">
                            <Loading loadingTitle="Service Cell Details" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof serviceCellInput !== "undefined" && serviceCellInput !== null) ? (
                                    <form
                                        method="post"
                                        autoComplete="off"
                                        encType="multipart/form-data"
                                    >
                                        <Input
                                            label="Service Cell Name"
                                            name="name"
                                            placeholder='Service Cell Name'
                                            value={serviceCellInput.name}
                                            isRequired={true}
                                            inputChange={changeTextInput}
                                        />
                                        <Input
                                            label="Service Cell Code"
                                            name="code"
                                            placeholder='Service Cell Code'
                                            value={serviceCellInput.code}
                                            isRequired={true}
                                            inputChange={changeTextInput}
                                        />

                                        <Select
                                            options={projectOptionList}
                                            isSearchable={true}
                                            name="project_id"
                                            label="Project"
                                            defaultValue=""
                                            placeholder='Select Project...'
                                            handleChangeValue={changeTextInput}
                                        />
                                        <div className="mt-2">
                                            <Button
                                                title="Submit Service Cell"
                                                onClick={(e) => onSubmit(e, "edit")}
                                                position="text-left"
                                                loadingTitle="Updating..."
                                                loading={isSubmitting}
                                            />
                                        </div>
                                    </form>
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
                    <Button
                        title="Yes"
                        customClass="inline py-2 px-3 rounded-md"
                        loading={isDeleting}
                        loadingTitle="Deleting Branch..."
                        onClick={() => dispatch(deleteServiceCell(serviceCellID, setShowDeleteModal))} />
                    <Button title="No" customClass="bg-gray-900 inline py-2 px-3 rounded-md" onClick={() => setShowDeleteModal(false)} />
                </div>
            </Modal>
        </div >
    )
}