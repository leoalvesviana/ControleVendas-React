import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';

interface Props{
  setUsuarios: Dispatch<SetStateAction<t.Usuario[]>>;
  usuarios: t.Usuario[];
}

const RecentOrders: React.FC<Props> = ({usuarios,setUsuarios}) => {

  const cryptoOrders: CryptoOrder[] = [
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} usuarios={usuarios} setUsuarios={setUsuarios}/>
    </Card>
  );
}

export default RecentOrders;
