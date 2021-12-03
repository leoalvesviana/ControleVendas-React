import { ReactNode } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';



export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'MENU',
    items: [
      {
        name: 'Home',
        link: '/dashboards/home',
        icon: HomeIcon
      }
    ]
  },
  {
    heading: 'Tarefas',
    items: [

      {
        name: 'Clientes',
        icon: GroupIcon,
        link: '/tarefas/clientes',
      },
      {
        name: 'Produtos',
        icon: LocalMallIcon,
        link: '/tarefas/produtos'
      },
      {
        name: 'Movimentações',
        icon: AttachMoneyIcon,
        link: '/tarefas/movimentacoes'
      },
      {
        name: 'Usuários',
        icon: ManageAccountsTwoToneIcon,
        link: '/tarefas/Usuarios'
      }

    ]
  },
];

const MenuItensNotAdm: MenuItems[] = [
  {
    heading: 'MENU',
    items: [
      {
        name: 'Home',
        link: '/dashboards/home',
        icon: HomeIcon
      }
    ]
  },
  {
    heading: 'Tarefas',
    items: [

      {
        name: 'Clientes',
        icon: GroupIcon,
        link: '/tarefas/clientes',
      }

    ]
  },
]

export { MenuItensNotAdm }

export default menuItems;
