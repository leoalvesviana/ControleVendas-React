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
import { toast } from 'react-toastify';


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
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get('/Clientes/GetClientes', config).then(response => {
      setClienteList(response.data);
    }).catch(error => {
      toast.warn('Sessão expirada', { autoClose: 1000 });
      sessionStorage.clear();
      sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
      setTimeout(function refreshing() {
        window.location.reload();
      }, 500);
  });
  }, []);


  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get('/Itens/GetItens', config).then(response => {
      setProdutoList(response.data);
    }).catch(error => {
      toast.warn('Sessão expirada', { autoClose: 1000 });
      sessionStorage.clear();
      sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
      setTimeout(function refreshing() {
        window.location.reload();
      }, 500);
  });
  }, []);

  useEffect(() => {

    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }

    api.get('/Movimento/GetMovimento', config).then(response => {
      setMoviList(response.data);
    }).catch(error => {
      toast.warn('Sessão expirada', { autoClose: 1000 });
      sessionStorage.clear();
      sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
      setTimeout(function refreshing() {
        window.location.reload();
      }, 500);
  });
  }, []);

  return (
    <>
      <Card style={{
        display: 'flex', justifyContent: 'center', backgroundColor: 'transparent', boxShadow: 'none'
      }}>
        <CardContent style={{ marginTop: '30px', height: '100%' }}>
          <Grid container spacing={3}>
            <Grid item>
              <Card sx={{ px: 1 }} style={{ width: '250px' }}>
                <CardContent>
                  <GroupIcon sx={{ fontSize: 30 }} color="info" />
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
                  <LocalMallIcon sx={{ fontSize: 30 }} color="secondary" />
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
