import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import RecentOrders from './RecentOrders';
import React, { useEffect, useState } from 'react';
import * as t from "../../../models/Types"
import api from 'src/service/api';



function Usuarios() {

  useEffect(() => {
    api.get(`/Usuario/ObterTodos`).then(response => {
      if(response && response.status === 200 &&  response.data){
        setUsuarios(response.data);
      }
    })
  }, [api])

  const [usuarios, setUsuarios] = useState<t.Usuario[]>();

  return (
    <>
      <Helmet>
        <title>Usuarios</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader setUsuarios={setUsuarios}/>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} style={{paddingBottom: '20px'}}>
            {usuarios &&
              <RecentOrders usuarios={usuarios} setUsuarios={setUsuarios}/>
            }
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Usuarios;
