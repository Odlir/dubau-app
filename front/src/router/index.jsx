import { useRoutes } from 'react-router-dom';
import Login from '@/pages/Login/index.jsx';
import Dashboard from '@/pages/Dashboard/index.jsx';
import User from '@/pages/User/index.jsx';
import Role from '@/pages/Role/index.jsx';
import Layout from '@/pages/Layout/index.jsx';
import Brand from '@/pages/Brand/index.jsx';
import Area from '@/pages/Area/index.jsx';
import Line from '@/pages/Line/index.jsx';
import Maker from '@/pages/Maker/index.jsx';
import WaytoPay from '@/pages/WayToPay/index.jsx';
import Establishment from '@/pages/Establishment/index.jsx';
import TypeQualification from '@/pages/TypeQualification/index.jsx';
import UnitMeasure from '@/pages/UnitMeasure/index.jsx';
import Position from '@/pages/Position/index.jsx';
import Profile from '@/pages/Profile/index.jsx';
import Staff from '@/pages/Staff/index.jsx';
import Staff2 from '@/pages/Staff2/index.jsx';
import Staff3 from '@/pages/Staff3/index.jsx';
import BusinessEntity from '@/pages/businessEntity/index.jsx';
import Category from '@/pages/Category/index.jsx';
import PaymentCondition from '@/pages/PaymentCondition/index.jsx';
import CommercialSection from '@/pages/CommercialSection/index.jsx';
import Inventory from '@/pages/Inventory/index.jsx';
import ProductServiceType from '@/pages/ProductServiceType/index.jsx';
import Family from '@/pages/Family/index.jsx';
import Product from '@/pages/Product/index.jsx';
import Service from '@/pages/Service/index.jsx';

function Router() {
    const routes = [
        {
            path: '/',
            element: <Login />,
        },
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />,
                },
                {
                    path: '/users',
                    element: <User />,
                },
                {
                    path: '/roles',
                    element: <Role />,
                },
                {
                    path: '/brand',
                    element: <Brand />,
                },
                {
                    path: '/line',
                    element: <Line />,
                },
                {
                    path: '/area',
                    element: <Area />,
                },
                {
                    path: '/maker',
                    element: <Maker />,
                },
                {
                    path: '/waytopay',
                    element: <WaytoPay />,
                },
                {
                    path: '/establishment',
                    element: <Establishment />,
                },
                {
                    path: '/typequalification',
                    element: <TypeQualification />,
                },
                {
                    path: '/unitmeasure',
                    element: <UnitMeasure />,
                },
                {
                    path: '/position',
                    element: <Position />,
                },
                {
                    path: '/profile',
                    element: <Profile />,
                },
                {
                    path: '/staff',
                    element: <Staff />,
                },
                {
                    path: '/staff2',
                    element: <Staff2 />,
                },
                {
                    path: '/staff3',
                    element: <Staff3 />,
                },
                {
                    path: '/businessEntity',
                    element: <BusinessEntity />,
                },
                {
                    path: '/category',
                    element: <Category />,
                },
                {
                    path: '/paymentcondition',
                    element: <PaymentCondition />,
                },
                {
                    path: '/commercialSection',
                    element: <CommercialSection />,
                },
                {
                    path: '/productServiceType',
                    element: <ProductServiceType />,
                },
                {
                    path: '/Inventory',
                    element: <Inventory />,
                },
                {
                    path: '/Family',
                    element: <Family />,
                },
                {
                    path: '/Product',
                    element: <Product />,
                },
                {
                    path: '/Service',
                    element: <Service />,
                },
            ],
        },
    ];

    return useRoutes(routes);
}

export default Router;
