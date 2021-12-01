import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import { Cliente } from 'src/models/Types';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import React, { useState } from 'react';
import api from 'src/service/api';
import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';

interface Props{
  setClientes: Dispatch<SetStateAction<t.Cliente[]>>;
  clientes: t.Cliente[];
}

const RecentOrders: React.FC<Props> = ({setClientes, clientes}) => {


  return (
    <Card>
      <RecentOrdersTable cryptoOrders={clientes} setClienteList={setClientes} clienteList={clientes} />
    </Card>
  );
}

export default RecentOrders;
