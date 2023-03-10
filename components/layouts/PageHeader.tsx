import Breadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';

export interface IPageHeaderProps {
    title: string;
    hasSearch?: boolean;
    searchText?: string;
    onSearchText?: (searchText: string) => void;
    searchPlaceholder?: string;
    headerRightSide?: React.ReactNode;
}

export function PageHeader({
    title,
    hasSearch = true,
    searchText = '',
    searchPlaceholder = '',
    onSearchText = (searchText) => { },
    headerRightSide = <></>
}: IPageHeaderProps) {
    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <Breadcrumb />
                    <PageTitle title={title} />
                </div>
                <div className="sm:flex">
                    <div className="hidden sm:flex items-center sm:divide-x sm:divide-gray-100 mb-3 sm:mb-0">
                        {
                            hasSearch &&
                            <form className="lg:pr-3" action="#" method="GET">
                                <label htmlFor="users-search" className="sr-only">Search</label>
                                <div className="mt-1 relative lg:w-64 xl:w-96">
                                    <input
                                        type="text"
                                        name="bank"
                                        id="bank-search"
                                        value={searchText}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                        placeholder={searchPlaceholder}
                                        onChange={(e) => onSearchText(e.target.value)}
                                    />
                                </div>
                            </form>
                        }
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                        {headerRightSide}
                    </div>
                </div>
            </div>
        </div>
    );
}
