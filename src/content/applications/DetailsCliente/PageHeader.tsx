import { Typography, Button, Grid, CardContent, Card } from '@mui/material';
import Modals from 'src/content/pages/Components/Modals';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useEffect, useState } from 'react';
import api from 'src/service/api';

interface headerprops {
  codigoCli: number;
}

function PageHeader<headerprops>({ codigoCli }) {

  const [clienteD, setClienteD] = useState<any>();

  useEffect(() => {

    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get(`/Clientes/DetalhesCliente/${codigoCli}`,config)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          setClienteD(response.data);
        }
      });
  }, [api])

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Cliente
            </Typography>
            {clienteD &&
              <Typography variant="subtitle2">
                Cliente: {clienteD.cliente.nome}<br />
                Email: {clienteD.cliente.email1}<br />
                Observações: {clienteD.cliente.observacao}
              </Typography>
            }
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Resumo
            </Typography>
            {clienteD &&
              <Typography variant="subtitle2">
                Numero de Compras: {clienteD.numCompras}<br />
                Numero de Itens: {clienteD.numItens}<br />
                Total geral: {clienteD.totalGeral}
              </Typography>
            }
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PageHeader;
