import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Button } from '@mui/material';
import Footer from 'src/components/Footer';
import { useLocation, useNavigate } from 'react-router';

import RecentOrders from './RecentOrders';
import { useEffect, useState } from 'react';
import api from 'src/service/api';
import * as t from '../../../models/Types'
import ModalFinalizarCompra from 'src/content/pages/Components/ModalFinalizarCompra';

function ApplicationsTransactions() {
  const parametros = useLocation();
  const info:any = parametros.state;
  const codigo: number = info.codigo;

  const [apiResponse, setApiResponse] = useState<t.Pedido>();
  const navigate = useNavigate();
  useEffect(() => {
    api.get(`/Pedidos/AdicionarCompra/${codigo}`)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          response.data.produtos = [];
          setApiResponse(response.data)
        }
      });
  }, [api])


  const Cancelar = (numCompra: number) => {
    api.delete(`/NumCompra/ExcluirNumCompra/${numCompra}`).then(response => {
      if(response && response.status == 200){
        navigate(`../clientes/`);
      }
    })
  }
  

  
  return (
    <>
      <Helmet>
        <title>Pedidos</title>
      </Helmet>
      <PageTitleWrapper>
      {apiResponse &&
        <PageHeader body={apiResponse} codigo={codigo} changeResponse={setApiResponse}/>
      }        
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
            {apiResponse &&
              <RecentOrders body={apiResponse} changeResponse={setApiResponse}/>
            }            
          </Grid>
        </Grid>
        <Button onClick={() => Cancelar(apiResponse.numCompra)}>Cancelar</Button>
        <ModalFinalizarCompra apiResponse={apiResponse} changeResponse={setApiResponse}/>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
