import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';

interface Props{
  body: t.Pedido;
  changeResponse: Dispatch<SetStateAction<t.Pedido>>
}

const RecentOrders: React.FC<Props> = ({body,changeResponse}) => {

  const cryptoOrders: CryptoOrder[] = [
  ];

  return (
    <Card>
      {body &&
        <RecentOrdersTable cryptoOrders={cryptoOrders} body={body} changeResponse={changeResponse}/>
      }
    </Card>
  );
}

export default RecentOrders;
