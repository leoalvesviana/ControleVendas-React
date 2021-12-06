import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import * as t from "../../../models/Types"


import RecentOrders from './RecentOrders';
import { useEffect, useState } from 'react';
import api from 'src/service/api';

function ApplicationsTransactions() {

  const [movimentos, setMovimento] = useState<t.MovimentacaoFinanceiraPage>();

  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get('/Movimento/IndexMovimento',config)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          setMovimento(response.data);
        }
      });
  }, [api]);

  return (
    <>
      <Helmet>
        <title>Movimentações</title>
      </Helmet>

      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg" >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} style={{ paddingBottom: '20px' }}>
            <RecentOrders setMovimentos={setMovimento} movimentosList={movimentos} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
