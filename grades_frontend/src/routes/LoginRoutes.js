import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import SameYear from 'pages/extra-pages/SameYear';
import { element } from 'prop-types';
import SubjectForm from 'pages/extra-pages/SubjectForm';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        },
        {
            path: 'sem-year/:user_id',
            element: <SameYear/>
        },
        {
            path: 'subject-form/:user_id/:depId/:semId',
            element: <SubjectForm/>
        }
    ]
};

export default LoginRoutes;
