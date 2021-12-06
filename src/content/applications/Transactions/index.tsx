import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import RecentOrders from './RecentOrders';
import { useEffect, useState } from 'react';
import api from 'src/service/api';
import * as t from "../../../models/Types"




function ApplicationsTransactions() {


  const [clienteList, setClienteList] = useState<t.Cliente[]>([]);

  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get('/Clientes/GetClientes',config).then(response => {
      if (response && response.status === 200 && response.data) {
        setClienteList(response.data);
      }
    })
  }, [api]);

  return (
    <>
      <Helmet>
        <title>Clientes</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader setClientes={setClienteList} />
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
            <RecentOrders setClientes={setClienteList} clientes={clienteList} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
