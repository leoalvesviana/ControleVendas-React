import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import * as t from "../../../models/Types"
import { FC, ChangeEvent, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface Props{
  setProdutos: Dispatch<SetStateAction<t.produto[]>>;
  produtos: t.produto[];
}

const RecentOrders: React.FC<Props> = ({setProdutos, produtos}) => {

  const cryptoOrders: CryptoOrder[] = [
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} setProdutoList={setProdutos} ProdutoList={produtos}/>
    </Card>
  );
}

export default RecentOrders;
