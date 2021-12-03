import {
  Card,
  Grid,
  Box,
  CardContent,
  Typography
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import api from 'src/service/api';
import { useEffect, useState } from 'react';
import { MovimentacaoFinanceira } from 'src/models/Types';


interface Cliente {
  codigo: number;
  nome: string;
  tratameno: string;
  data: Date;
  telefone1: string;
  telefone2?: string;
  email1: string;
  email2?: string;
  observacoes: string;
  foto?: string;
  status: string;
}

interface Produto {
  codigo: number;
  descricao: string;
  valor: number;
}



function Wallets() {

  const [clienteList, setClienteList] = useState<Cliente[]>([]);
  const [ProdutoList, setProdutoList] = useState<Produto[]>([]);
  const [MoviList, setMoviList] = useState<MovimentacaoFinanceira[]>([]);

  useEffect(() => {
    api.get('/Clientes/GetClientes').then(response => {
      setClienteList(response.data);
    });
  }, []);


  useEffect(() => {
    api.get('/Itens/GetItens').then(response => {
      setProdutoList(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('/Movimento/GetMovimento').then(response => {
      setMoviList(response.data);
    });
  }, []);

  return (
    <>
      <Card style={{
        display: 'flex', height: '100vh', justifyContent: 'center',
        backgroundImage: "url(" + "https://i.pinimg.com/originals/39/1e/7b/391e7ba4cb2c0752bf007c7bfb4ea143.png" + ")",
        backgroundSize: 'cover'
      }}>
        <CardContent style={{ marginTop: '30px' }}>
          <Grid container spacing={3}>
            <Grid item>
              <Card sx={{ px: 1 }} style={{ width: '250px' }}>
                <CardContent>
                  <GroupIcon sx={{ fontSize: 30 }} color="primary" />
                  <Typography variant="h3" noWrap>
                    Clientes
                  </Typography>
                  <Box sx={{ pt: 3 }}>
                    <Typography variant="h3" gutterBottom noWrap>
                      {clienteList.length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ px: 1 }} style={{ width: '250px' }}>
                <CardContent>
                  <LocalMallIcon sx={{ fontSize: 30 }} color="warning" />
                  <Typography variant="h3" noWrap>
                    Produtos
                  </Typography>
                  <Box sx={{ pt: 3 }}>
                    <Typography variant="h3" gutterBottom noWrap>
                      {ProdutoList.length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ px: 1 }} style={{ backgroundColor: ' 	 ', width: '250px' }}>
                <CardContent>
                  <AttachMoneyIcon sx={{ fontSize: 30 }} color="success" />
                  <Typography variant="h3" noWrap>
                    Movimentações
                  </Typography>
                  <Box sx={{ pt: 3 }}>
                    <Typography variant="h3" gutterBottom noWrap>
                      {MoviList.length}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

export default Wallets;
