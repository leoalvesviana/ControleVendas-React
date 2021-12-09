import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { PartialRouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';


const Loader = (Component) => (props) => (
  <Suspense fallback={<SuspenseLoader />}>
    <Component {...props} />
  </Suspense>
);

// Pages


// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications
const Overview = Loader(lazy(() => import('src/content/overview/Hero')));
const Transactions = Loader(lazy(() => import('src/content/applications/Transactions')));
const Produtos = Loader(lazy(() => import('src/content/applications/Produtos')));
const Movimentacoes = Loader(lazy(() => import('src/content/applications/Movimentacoes')));
const Pedidos = Loader(lazy(() => import('src/content/applications/Pedidos')));
const UserProfile = Loader(lazy(() => import('src/content/applications/Users/profile')));
const UserSettings = Loader(lazy(() => import('src/content/applications/Users/settings')));
const DetailsCliente = Loader(lazy(() => import('src/content/applications/DetailsCliente')));
const Usuarios = Loader(lazy(() => import('src/content/applications/Usuarios')))
const SendEmail = Loader(lazy(() => import('src/content/applications/SendEmail')))

// Components


// Status

const Status404 = Loader(lazy(() => import('src/content/pages/Status/Status404')));
const Status500 = Loader(lazy(() => import('src/content/pages/Status/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/content/pages/Status/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/content/pages/Status/Maintenance')));


const routes: PartialRouteObject[] = [
  {
    path: '*',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <SidebarLayout />
      },
      {
        path: 'dashboards',
        element: (
          <Navigate
            to="/dashboards/home"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'dashboards',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboards/home"
            replace
          />
        )
      },
      {
        path: 'home',
        element: <Crypto />
      }
    ]
  },
  {
    path: 'tarefas',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/tarefas"
            replace
          />
        )
      },
      {
        path: 'clientes',
        element: <Transactions />
      },
      {
        path: 'DetailsCliente',
        element: <DetailsCliente />
      },
      ,
      {
        path: 'produtos',
        element: <Produtos />
      }
      ,
      {
        path: 'movimentacoes',
        element: <Movimentacoes />
      },
      ,
      {
        path: 'pedidos',
        element: <Pedidos />
      },
      {
        path: 'Usuarios',
        element: <Usuarios />
      },
      ,
      {
        path: 'SendEmail',
        element: <SendEmail />
      },
      {
        path: 'profile',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="details"
                replace
              />
            )
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          },
        ]
      }
    ]
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '',
        element: <Status404 />
      },
    ]
  },
];

const normalUserRotes: PartialRouteObject[] = [
  {
    path: '*',
    element: <SidebarLayout />,
    children: [
      {
        path: '/',
        element: <SidebarLayout />
      },
      {
        path: 'dashboards',
        element: (
          <Navigate
            to="/dashboards/home"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '*',
        element: <Status404 />
      },
    ]
  },
  {
    path: 'dashboards',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/dashboards/home"
            replace
          />
        )
      },
      {
        path: 'home',
        element: <Crypto />
      }
    ]
  },
  {
    path: 'tarefas',
    element: (
      <SidebarLayout />
    ),
    children: [
      {
        path: '/',
        element: (
          <Navigate
            to="/tarefas"
            replace
          />
        )
      },
      {
        path: 'clientes',
        element: <Transactions />
      },
      {
        path: 'pedidos',
        element: <Pedidos />
      }
    ]
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: (
          <Navigate
            to="/"
            replace
          />
        )
      },
      {
        path: 'status',
        children: [
          {
            path: '/',
            element: (
              <Navigate
                to="404"
                replace
              />
            )
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          },
        ]
      },
      {
        path: '',
        element: <Status404 />
      },
    ]
  },
];

export { normalUserRotes }

export default routes;
