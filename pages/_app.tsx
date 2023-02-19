import {useEffect} from "react";
import {Provider} from 'react-redux';
import type {AppProps} from 'next/app';
import {useRouter} from 'next/router';
import Head from 'next/head';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/components/layouts/Layout';
import {store} from '@/redux/store';
import '@/styles/globals.css';
import Login from './login';
import ResetPassword from './forget-password';
import {isAuthenticated} from "@/utils/auth";

export default function App({Component, pageProps}: AppProps) {
    const router = useRouter();
    const isLoginPage = Component === Login;
    const isResetPage = Component === ResetPassword;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!isLoginPage || !isResetPage || !isAuthenticated()) {
                router.push('/login');
            }
        }
    }, []);

    return (
        <Provider store={store}>
            <Head>
                <link rel="shortcut icon" href="/favicon.ico"/>
                <link rel="canonical" href="https://akijtakaful.com"/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <title>{process.env.APP_NAME}</title>
            </Head>

            {
                isLoginPage || isResetPage ?
                    <>
                        <Component {...pageProps} />
                    </> :
                    <Layout>
                        <Component {...pageProps}></Component>
                    </Layout>
            }
            <ToastContainer/>
        </Provider>
    )
}
