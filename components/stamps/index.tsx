import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { RootState } from '@/redux/store';
import { getStampListAction } from '@/redux/actions/stamp-action';
import { PageHeader } from '@/components/layouts/PageHeader';
import Button from '@/components/button';
import Table from '@/components/table';
import Tooltip from '@/components/tooltip';
import Loading from '@/components/loading';

export default function StampList() {
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(10);
  const dispatch = useDispatch();

  const columnData: any[] = [
    { title: "Proposal", id: 1 },
    { title: "Stamps", id: 2 },
    { title: "Action", id: 3 },
  ]

  const { stampList, stampPaginationData, isLoading } = useSelector((state: RootState) => state.stamp);

  useEffect(() => {
    dispatch(getStampListAction(currentPage, dataLimit, searchText));
  }, [currentPage, dataLimit, searchText]);

  return (
    <div>
      <PageHeader
        title='Manage Stamps'
        searchText={searchText}
        searchPlaceholder={'Search stamps...'}
        onSearchText={setSearchText}
        headerRightSide={
          <Link href="/stamps/create" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-2 py-1 text-center sm:w-auto">
            <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
            Add New
          </Link>
        }
      />

      <div className="p-4 bg-white block border-b border-gray-200">
        {
          isLoading ?
            <div className="text-center">
              <Loading loadingTitle="stamps" />
            </div> :
            <Table
              column={columnData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              dataLimit={dataLimit}
              totalData={stampPaginationData.total}
            >
              {stampList && stampList.length > 0 && stampList.map((data, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {data.proposal_no}
                  </th>
                  <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {data.stamps.length} stamp{data.stamps.length > 1 ? 's' : ''}
                  </td>

                  <td className="px-2 py-3 flex gap-1">
                    <Tooltip content={`View - ${data.proposal_no}`}>
                      VIEW
                      {/* <Button
                    onClick={() => handleOpenModal(data.id, 'view')}
                    customClass="p-1 rounded-md inline"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 6C8.76722 6 5.95965 8.31059 4.2048 11.7955C4.17609 11.8526 4.15483 11.8948 4.1369 11.9316C4.12109 11.964 4.11128 11.9853 4.10486 12C4.11128 12.0147 4.12109 12.036 4.1369 12.0684C4.15483 12.1052 4.17609 12.1474 4.2048 12.2045C5.95965 15.6894 8.76722 18 12 18C15.2328 18 18.0404 15.6894 19.7952 12.2045C19.8239 12.1474 19.8452 12.1052 19.8631 12.0684C19.8789 12.036 19.8888 12.0147 19.8952 12C19.8888 11.9853 19.8789 11.964 19.8631 11.9316C19.8452 11.8948 19.8239 11.8526 19.7952 11.7955C18.0404 8.31059 15.2328 6 12 6ZM2.41849 10.896C4.35818 7.04403 7.7198 4 12 4C16.2802 4 19.6419 7.04403 21.5815 10.896C21.5886 10.91 21.5958 10.9242 21.6032 10.9389C21.6945 11.119 21.8124 11.3515 21.8652 11.6381C21.9071 11.8661 21.9071 12.1339 21.8652 12.3619C21.8124 12.6485 21.6945 12.8811 21.6032 13.0611C21.5958 13.0758 21.5886 13.09 21.5815 13.104C19.6419 16.956 16.2802 20 12 20C7.7198 20 4.35818 16.956 2.41849 13.104C2.41148 13.09 2.40424 13.0758 2.39682 13.0611C2.3055 12.881 2.18759 12.6485 2.13485 12.3619C2.09291 12.1339 2.09291 11.8661 2.13485 11.6381C2.18759 11.3515 2.3055 11.119 2.39682 10.9389C2.40424 10.9242 2.41148 10.91 2.41849 10.896ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8.00002 12C8.00002 9.79086 9.79088 8 12 8C14.2092 8 16 9.79086 16 12C16 14.2091 14.2092 16 12 16C9.79088 16 8.00002 14.2091 8.00002 12Z" />
                    </svg>
                  </Button> */}
                    </Tooltip>
                    <Tooltip content={`Edit - ${data.proposal_no}`}>
                      EDIT
                    </Tooltip>
                    <Tooltip content={`Delete - ${data.proposal_no}`}>
                      DELETE
                    </Tooltip>
                  </td>
                </tr>
              ))
              }
            </Table>
        }
      </div>
    </div>
  );
}
