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
      <Card style={{
        height: '100vh', justifyContent: 'center',
        backgroundImage: "url(" + "https://i.pinimg.com/originals/39/1e/7b/391e7ba4cb2c0752bf007c7bfb4ea143.png" + ")",
        backgroundSize: 'cover'
      }}>
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
      </Card>
    </>
  );
}

export default ApplicationsTransactions;
