import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import { useState } from 'react';

import RecentOrders from './RecentOrders';
import { useLocation } from 'react-router';

function ApplicationsTransactions({ navigation }) {
  const [cliente, setCliente] = useState();
  const parametros = useLocation();
  const codigo: any = parametros.state;



  return (
    <>
      <Helmet>
        <title>Clientes</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader codigoCli={codigo.codigo} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} style={{ paddingBottom: '20px' }}>
            <RecentOrders cliente={codigo.codigo} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
