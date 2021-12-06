import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Button, Card, CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import RecentOrders from './RecentOrders';
import { useEffect, useState } from 'react';
import api from 'src/service/api';
import * as t from '../../../models/Types'
import ModalFinalizarCompra from 'src/content/pages/Components/ModalFinalizarCompra';

function ApplicationsTransactions() {
  const parametros = useLocation();
  const info: any = parametros.state;
  const codigo: number = info.codigo;

  const [apiResponse, setApiResponse] = useState<t.Pedido>();
  const navigate = useNavigate();
  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get(`/Pedidos/AdicionarCompra/${codigo}`,config)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          response.data.produtos = [];
          setApiResponse(response.data)
        }
      });
  }, [api])


  const Cancelar = (numCompra: number) => {
    api.delete(`/NumCompra/ExcluirNumCompra/${numCompra}`).then(response => {
      if (response && response.status == 200) {
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
          <PageHeader body={apiResponse} codigo={codigo} changeResponse={setApiResponse} />
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
          <Grid item xs={12} style={{ paddingBottom: '20px' }}>
            {apiResponse &&
              <RecentOrders body={apiResponse} changeResponse={setApiResponse} />
            }
          </Grid>
        </Grid>
        <Card style={{ marginTop: '15px' }}>
          <CardContent style={{ display: 'flex' }}>
            <Button color="error" onClick={() => Cancelar(apiResponse.numCompra)}>
              <ListItemAvatar >
                <CancelTwoToneIcon sx={{ mt: 1 }} color="error" />
              </ListItemAvatar>
              <ListItemText primary="Cancelar" />
            </Button>
            <ModalFinalizarCompra apiResponse={apiResponse} changeResponse={setApiResponse} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
