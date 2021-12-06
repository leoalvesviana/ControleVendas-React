import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import ModalPedidos from 'src/content/pages/Components/ModalPedidos';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import api from 'src/service/api';
import * as t from '../../../models/Types'

interface Headerprops {
  codigo: number;
  body: t.Pedido;
  changeResponse: Dispatch<SetStateAction<t.Pedido>>
}

const PageHeader: React.FC<Headerprops> = ({ body, codigo, changeResponse }) => {

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  const [cliente, setCliente] = useState<t.Cliente>();

  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get(`/Clientes/GetCliente/${codigo}`, config).then(response => {
      if (response && response.status === 200 && response.data) {
        setCliente(response.data);
        body.cliente = response.data;
      }
    })

  }, [])

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Pedidos
            </Typography>
            <Typography variant="subtitle2">
              Realizar um pedido.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Cliente:
            </Typography>
            <Typography variant="subtitle2">
              Nome: {cliente && cliente.nome}
              <br />
              Email: {cliente && cliente.email1}
            </Typography>
          </Grid>
          <Grid item>
            <ModalPedidos apiResponse={body} changeResponse={changeResponse} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PageHeader;