import {createBrowserRouter} from 'react-router-dom';
import SearchTool from './views/searchTool.jsx';
import Simulasi from './views/simulasi.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Login from './views/login.jsx';
import Upload from './views/uploadForm.jsx';
import Users from './views/users.jsx';
import UserForm from './views/UserForm.jsx';

import { useStateContext } from './contexts/contextprovider';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootElement />,
        children: [
            {
                path: '/search',
                element: <SearchTool />,
            },
            {
                path: '/simulasi',
                element: <Simulasi />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
        ],
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/upload-data',
                element: <Upload />,
            },
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
]);

function RootElement() {
    const { token } = useStateContext();

    return token ? <DefaultLayout /> : <GuestLayout />;
}

export default router;
