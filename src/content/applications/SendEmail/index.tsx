import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import RecentOrders from './RecentOrders';
import React, { useEffect, useState } from 'react';
import * as t from "../../../models/Types"
import api from 'src/service/api';
import { toast } from 'react-toastify';



function Email() {

  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get(`/Email/GetEmails`, config).then(response => {
      if (response && response.status === 200 && response.data) {
        setEmail(response.data);
      }
    }).catch(error => {
      toast.warn('Sessão expirada', { autoClose: 1000 });
      sessionStorage.clear();
      sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
      setTimeout(function refreshing() {
        window.location.reload();
      }, 500);
    })
  }, [api])

  const [Email, setEmail] = useState<t.Email[]>();

  return (
    <>
      <Helmet>
        <title>E-mail</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader setEmail={setEmail} />
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
            {Email &&
              <RecentOrders Email={Email} setEmail={setEmail} />
            }
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Email;
