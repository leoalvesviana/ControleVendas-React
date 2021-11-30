import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import { Cliente } from 'src/models/Types';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import React, { useState } from 'react';
import api from 'src/service/api';

function RecentOrders() {

  const [clienteOrders, setClienteOrders] = useState<Cliente[]>([]);

  api.get('/Clientes/GetClientes').then(response => {
    if (response && response.status === 200 && response.data) {
      setClienteOrders(response.data);
    } else {

    }
    console.log(response)
  })
    .catch(err => {
      console.log("Error -> ", err)
    });

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={clienteOrders} />
    </Card>
  );
}

export default RecentOrders;
