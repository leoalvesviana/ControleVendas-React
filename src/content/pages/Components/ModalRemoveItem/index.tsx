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
import { Container, Grid, Card, CardHeader, CardContent, Divider, MenuItem, IconButton, useTheme } from '@mui/material';
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
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function BasicAlerts() {

}

interface dialogProps{
  onClose: () => void;
  codItem: number;
  open: boolean;
  body: t.Pedido;
  setApiResponse: Dispatch<SetStateAction<t.Pedido>>

}

var resposta: t.Pedido;

function SimpleDialog(props: dialogProps) {
  const { onClose, codItem, open, body, setApiResponse } = props;

  const handleClose = () => {
    onClose();
  };


   function handleSubmit() {

    let data: t.Pedido;
    data = body;
    data.codItem = codItem;
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.post('/Pedidos/RemoverItem/', data, config)
      .then(response => {
        if (response.status === 200){
          setApiResponse(response.data)
          onClose()
          

        }
      });
  }

  const [item, setItem] = useState<t.produto>();

  useEffect(() =>{
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.get(`/Itens/GetItem/${codItem}`, config).then(response => {
      if(response && response.status === 200){
        setItem(response.data);
      }
    })
  },[])

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Adicionar novo item</DialogTitle>
      <List sx={{ pt: 0 }}>
        
        <ListItem>
          <TextField
            name="itemName"
            label="Descrição"
            disabled
            style={{ width: 415, height: 80 }}
            value={item && item.descricao}
          />
        </ListItem>
        <ListItem>
          <TextField
            name="itemValue"
            label="Valor"
            disabled
            style={{ width: 415, height: 80 }}
            value={item && item.valor}
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
  codItem: number;
}

function ModalRemoveItem({apiResponse, changeResponse, codItem}: modalProps) {

  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid item>
        <IconButton
            sx={{
              '&:hover': { background: theme.colors.error.lighter },
              color: theme.palette.error.main
            }}
            color="inherit"
            size="small"
            onClick={handleClickOpen}
          >
            <DeleteTwoToneIcon fontSize="small" />
          </IconButton>
        {apiResponse && codItem &&
        <SimpleDialog
            codItem={codItem}
            open={open}
            onClose={handleClose}
            body={apiResponse}
            setApiResponse={changeResponse}
          />
        }
      </Grid>
    </>
  );
  
}

export default ModalRemoveItem;
