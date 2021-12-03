import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';

interface passarCliente {
  cliente: any
}

function RecentOrders<passarCliente>({ cliente }) {

  const cryptoOrders: CryptoOrder[] = [
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} cliente={cliente} />
    </Card>
  );
}

export default RecentOrders;
