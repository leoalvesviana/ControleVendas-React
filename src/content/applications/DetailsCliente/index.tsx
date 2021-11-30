import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import React, {useState, useEffect} from 'react';

import RecentOrders from './RecentOrders';
import { useLocation, useParams } from 'react-router';
import api from 'src/service/api';

function ApplicationsTransactions({navigation}) {
  const [cliente, setCliente] = useState();
  const parametros = useLocation();
  const codigo:any = parametros.state;
  
  

  return (
    <>
      <Helmet>
        <title>Clientes</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader codigoCli={codigo.codigo}/>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders cliente={codigo.codigo}/>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
