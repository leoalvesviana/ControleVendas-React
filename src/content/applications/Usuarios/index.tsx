import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import RecentOrders from './RecentOrders';
import React, { useEffect, useState } from 'react';
import * as t from "../../../models/Types"
import api from 'src/service/api';



function Usuarios() {

  useEffect(() => {
    api.get(`/Usuario/ObterTodos`).then(response => {
      if (response && response.status === 200 && response.data) {
        setUsuarios(response.data);
      }
    })
  }, [api])

  const [usuarios, setUsuarios] = useState<t.Usuario[]>();

  return (
    <>
      <Card style={{
        height: '100vh', justifyContent: 'center',
        backgroundImage: "url(" + "https://i.pinimg.com/originals/39/1e/7b/391e7ba4cb2c0752bf007c7bfb4ea143.png" + ")",
        backgroundSize: 'cover'
      }}>
        <Helmet>
          <title>Usuarios</title>
        </Helmet>
        <PageTitleWrapper>
          <PageHeader setUsuarios={setUsuarios} />
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
              {usuarios &&
                <RecentOrders usuarios={usuarios} setUsuarios={setUsuarios} />
              }
            </Grid>
          </Grid>
        </Container>
      </Card>
    </>
  );
}

export default Usuarios;
