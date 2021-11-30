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

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
        background: transparent;
        margin-left: -${theme.spacing(0.5)};
        margin-bottom: ${theme.spacing(1)};
        margin-top: ${theme.spacing(2)};
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[100]};
        }
`
);

function Wallets() {

  const [clienteList, setClienteList] = useState<Cliente[]>([]);
  const [ProdutoList, setProdutoList] = useState<Produto[]>([]);
  const [MoviList, setMoviList] = useState<MovimentacaoFinanceira[]>([]);

  useEffect(() => {
    api.get('/Clientes/GetClientes').then(response => {
      setClienteList(response.data);
      console.log(response);
    });
  }, []);


  useEffect(() => {
    api.get('/Itens/GetItens').then(response => {
      setProdutoList(response.data);
      console.log(response);
    });
  }, []);

  useEffect(() => {
    api.get('/Movimento/GetMovimento').then(response => {
      setMoviList(response.data);
      console.log(response);
    });
  }, []);


  return (
    <>
      <Card style={{
        display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center',
        // , backgroundColor: '#00ffbf'
      }}>
        <CardContent style={{ margin: '88px 0 10px 0' }}>
          <Grid container spacing={3}>
            <Grid xs={12} sm={8} md={4} item>
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
            <Grid xs={12} sm={6} md={4} item>
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
            <Grid xs={12} sm={6} md={4} item>
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
