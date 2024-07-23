import {createBrowserRouter} from 'react-router-dom';
import HospitalPartner from './views/hospitalPartners.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout/>,
        children:[
            {
                path: '/partners',
                element: <HospitalPartner />,
            },
        ]
    },
]);

export default router;