import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import * as t from "../../../models/Types"
import { FC, ChangeEvent, useState, useEffect, Dispatch, SetStateAction } from 'react';


interface Props{
  setMovimentos: Dispatch<SetStateAction<t.MovimentacaoFinanceiraPage>>;
  movimentosList: t.MovimentacaoFinanceiraPage;
}


const RecentOrders: React.FC<Props> = ({setMovimentos, movimentosList}) => {

  const cryptoOrders: CryptoOrder[] = [

  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} setMovimentos={setMovimentos} movimentosList={movimentosList} />
    </Card>
  );
}

export default RecentOrders;
