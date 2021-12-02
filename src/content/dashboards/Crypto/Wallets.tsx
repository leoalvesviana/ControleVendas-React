import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  Tooltip,
  CardActionArea
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import StoreIcon from '@mui/icons-material/Store';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import api from 'src/service/api';
import React, { useEffect, useState } from 'react';
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
                  <SupervisedUserCircleIcon sx={{ fontSize: 50 }} color="primary" />
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
                  <StoreIcon sx={{ fontSize: 50 }} color="secondary" />
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
                  <CompareArrowsIcon sx={{ fontSize: 50 }} color="success" />
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
