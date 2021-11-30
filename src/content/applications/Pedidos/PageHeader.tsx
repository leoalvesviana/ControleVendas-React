import { Typography, Button, Grid } from '@mui/material';
import ModalPedidos, {ResponseApiWithItens} from 'src/content/pages/Components/ModalPedidos';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
import api from 'src/service/api';
import * as t from '../../../models/Types'

interface Headerprops{
  codigo: number;
  body: t.Pedido;
  changeResponse: Dispatch<SetStateAction<t.Pedido>>
}

const PageHeader: React.FC<Headerprops> = ({body, codigo,changeResponse}) => {

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  console.log(ResponseApiWithItens)

  const [cliente, setCliente] = useState<t.Cliente>();

  useEffect(() => {
    api.get(`/Clientes/GetCliente/${codigo}`).then(response => {
      if (response && response.status === 200 && response.data) {
        setCliente(response.data);
        body.cliente = response.data;
      }})

  }, [])

  return (
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
          Nome: { cliente && cliente.nome}
          <br/>
          Email: { cliente && cliente.email1}
        </Typography>
      </Grid>
      <Grid item>
        <ModalPedidos apiResponse={body} changeResponse={changeResponse}/>
      </Grid>
    </Grid>
  );
}

export default PageHeader;