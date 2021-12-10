import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';

interface Props{
  setEmail: Dispatch<SetStateAction<t.Email[]>>;
  Email: t.Email[];
}

const RecentOrders: React.FC<Props> = ({Email,setEmail}) => {

  const cryptoOrders: CryptoOrder[] = [
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} Email={Email} setEmail={setEmail}/>
    </Card>
  );
}

export default RecentOrders;
