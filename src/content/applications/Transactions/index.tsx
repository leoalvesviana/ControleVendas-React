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
    api.get('/Clientes/GetClientes').then(response => {
      if (response && response.status === 200 && response.data) {
        setClienteList(response.data);
      }
    })
  }, [api]);

  return (
    <>
      <Card style={{
        height: '100vh', justifyContent: 'center',
        backgroundImage: "url(" + "https://i.pinimg.com/originals/39/1e/7b/391e7ba4cb2c0752bf007c7bfb4ea143.png" + ")",
        backgroundSize: 'cover'
      }}>
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
      </Card>
    </>
  );
}

export default ApplicationsTransactions;
