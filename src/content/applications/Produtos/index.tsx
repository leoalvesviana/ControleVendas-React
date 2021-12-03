import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import api from 'src/service/api';
import * as t from "../../../models/Types"


import RecentOrders from './RecentOrders';

function ApplicationsTransactions() {

  const [produtos, setProdutos] = useState<t.produto[]>();

  useEffect(() => {
    api.get('/Itens/GetItens')
      .then(response => {
        if (response && response.status === 200 && response.data) {
          setProdutos(response.data);
        }
      });
  }, [api]);

  return (
    <>
      <Card style={{
        height: '100vh', justifyContent: 'center',
        backgroundImage: "url(" + "https://i.pinimg.com/originals/39/1e/7b/391e7ba4cb2c0752bf007c7bfb4ea143.png" + ")",
        backgroundSize: 'cover'
      }}>
        <Helmet>
          <title>Produtos</title>
        </Helmet>
        <PageTitleWrapper>
          <PageHeader setProdutos={setProdutos} />
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
              {produtos &&
                <RecentOrders setProdutos={setProdutos} produtos={produtos} />
              }
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

export default ApplicationsTransactions;
