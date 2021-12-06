import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import { Container, Grid, Card, CardHeader, CardContent, Divider, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Footer from 'src/components/Footer';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import api from 'src/service/api';
import * as t from '../../../../models/Types'


const emails = ['username@gmail.com', 'user02@gmail.com'];

function BasicAlerts() {

}

interface dialogProps{
  onClose: () => void;
  produtos: t.produto[];
  open: boolean;
  body: t.Pedido;
  setApiResponse: Dispatch<SetStateAction<t.Pedido>>

}

var resposta: t.Pedido;

function SimpleDialog(props: dialogProps) {
  const { onClose, produtos, open, body, setApiResponse } = props;

  const handleClose = () => {
    onClose();
  };

  const [formData, setFormData] = useState({
    codigo: 0,
    quantidade: 0
  });


   function handleSubmit() {
    const { codigo, quantidade } = formData;

    let data: t.Pedido;
    data = body;
    data.codItem = codigo;
    data.quantidadeNovoItem = Number(quantidade);
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.post('/Pedidos/AdicionarItem/', data, config)
      .then(response => {
        if (response.status === 200){
          setApiResponse(response.data)
          onClose()
          

        }
      }).catch(error => {
      });
  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }


  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Adicionar novo item</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            id=""
            name="codigo"
            select
            label="Produto"
            helperText="Selecione o produto"
            style={{ width: 415 }}
            onChange={handleFieldChange}
          >
          {produtos && 
            produtos.map((opcao) => (
              <MenuItem key={opcao.codigo} value={opcao.codigo}>
                {opcao.descricao}
              </MenuItem>
            ))
          }
          </TextField>
        </ListItem>
        <ListItem>
          <TextField
            name="quantidade"
            label="Quantidade"
            style={{ width: 415, height: 80 }}
            onChange={handleFieldChange}
          />
        </ListItem>

        <ListItem autoFocus button onClick={handleSubmit}>
          <ListItemAvatar>
            <Avatar>
              <CheckIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Confirmar" />
        </ListItem>
      </List>
    </Dialog>
  );
}

interface modalProps{
  apiResponse: t.Pedido;
  changeResponse: Dispatch<SetStateAction<t.Pedido>>
}

function ModalPedidos({apiResponse, changeResponse}: modalProps) {

  const [open, setOpen] = useState(false);
  const [produtos, setprodutos] = useState<t.produto[]>();

  const handleClickOpen = () => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.get(`/Itens/GetItens`, config).then(response => {
      setOpen(true);
      setprodutos(response.data);
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item>
        <Button sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={handleClickOpen}><AddTwoToneIcon sx={{ fontSize: 25 }} /></Button>
        <SimpleDialog
          produtos={produtos}
          open={open}
          onClose={handleClose}
          body={apiResponse}
          setApiResponse={changeResponse}
        />
      </Grid>
    </>
  );
  
}

export default ModalPedidos;
