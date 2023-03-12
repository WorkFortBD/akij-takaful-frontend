
import { hasPermission } from "@/utils/permission";
import * as Types from "../types/global-type";

export const handleSidebar = (isToggle: boolean = false) => (dispatch) => {
    dispatch({ type: Types.OPEN_SIDEBAR, payload: !isToggle });
}

const getDashboardMenus = () => {
    const menu = {
        id: 'menu00',
        title: 'Dashboard',
        icon: 'bi-speedometer2',
        url: '',
        subMenu: []
    };

    if (hasPermission('dashboard.view') || hasPermission('financial_dashboard')) {
        if (hasPermission('dashboard.view')) {
            menu.subMenu.push({
                id: 'subMenu00.1',
                title: 'Dashboard',
                icon: 'bi-speedometer2',
                url: '/',
                subSubMenu: [],
            });
        }

        if (hasPermission('dashboard.view')) {
            menu.subMenu.push({
                id: 'subMenu00.2',
                title: 'Financial Dashboard',
                icon: 'bi-cash-coin',
                url: '/dashboard/financial-dashboard',
                subSubMenu: [],
            });
        }

        return menu;
    }

    return null;
}

export const getSidebarMenuList = () => (dispatch) => {
    const menuList = [
        getDashboardMenus(),
        {
            id: 'menu01',
            title: 'Agent Management',
            icon: 'bi-people',
            url: '',
            subMenu: [
                {
                    id: 'subMenu01.1',
                    title: 'Manage Employees',
                    icon: 'bi-person',
                    url: '/employee',
                    subSubMenu: [],
                },
                {
                    id: 'subMenu01.2',
                    title: 'New Employee',
                    icon: 'bi-person-add',
                    url: '/employee/create',
                    subSubMenu: [],
                }
            ]
        },
        {
            id: 'menu02',
            title: 'Proposals',
            icon: 'bi-person-badge',
            url: '',
            subMenu: [
                {
                    id: 'subMenu02.1',
                    title: 'Manage Proposals',
                    icon: 'bi-person-fill',
                    url: '/proposals',
                    subSubMenu: []
                },
                {
                    id: 'subMenu02.2',
                    title: 'New Proposal',
                    icon: 'bi-person-fill-add',
                    url: '/proposals/create',
                    subSubMenu: []
                },
                {
                    id: 'subMenu02.3',
                    title: 'Print Proposal',
                    icon: 'bi bi-printer',
                    url: '/proposals/print',
                    subSubMenu: []
                },
                {
                    id: 'subMenu02.4',
                    title: 'Stamps',
                    icon: 'bi-person-fill-add',
                    url: '/stamps',
                    subSubMenu: []
                },
            ]
        },
        {
            id: 'menu03',
            title: 'Worksheets',
            icon: 'bi-person-workspace',
            url: '',
            subMenu: [
                {
                    id: 'subMenu03.1',
                    title: 'Manage Worksheets',
                    icon: 'bi-person-workspace',
                    url: '/proposals',
                    subSubMenu: []
                },
                {
                    id: 'subMenu03.2',
                    title: 'New Worksheet',
                    icon: 'bi-node-plus-fill',
                    url: '/proposals/create',
                    subSubMenu: []
                },
                {
                    id: 'subMenu03.3',
                    title: 'Underwriting',
                    icon: 'bi-newspaper',
                    url: '/under-writing',
                    subSubMenu: []
                },
            ]
        },
        {
            id: 'menu04',
            title: 'Configurations',
            icon: 'bi-gear',
            url: '',
            subMenu: [
                {
                    id: 'subMenu04.1',
                    title: 'Enlist bank',
                    icon: 'bi-bank',
                    url: '/settings/banks',
                    subSubMenu: []
                },
                {
                    id: 'subMenu04.2',
                    title: 'Open branch',
                    icon: 'bi-bank2',
                    url: '/settings/branches',
                    subSubMenu: []
                },
                {
                    id: 'subMenu04.3',
                    title: 'Manage Roles',
                    icon: 'bi-shield-check',
                    url: '/settings/roles',
                    subSubMenu: []
                },
            ]
        }
    ]


    dispatch({ type: Types.SIDEBAR_MENU_LIST, payload: menuList });
}