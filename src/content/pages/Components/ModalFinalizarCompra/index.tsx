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
import { useNavigate } from 'react-router';


const emails = ['username@gmail.com', 'user02@gmail.com'];


function BasicAlerts() {

}

interface dialogProps{
  onClose: () => void;
  open: boolean;
  body: t.Pedido;
  setApiResponse: Dispatch<SetStateAction<t.Pedido>>

}

function SimpleDialog(props: dialogProps) {
  const { onClose, open, body, setApiResponse } = props;

  const handleClose = () => {
    onClose();
  };

  const navigate = useNavigate();

   function handleSubmit() {

    const Status = formData.codigo;

    let data: t.Pedido;
    data = body;
    data.status = Status;
    api.post('/Pedidos/FinalizarCompra/', data)
      .then(response => {
        if (response.status === 200){
          setApiResponse(null)
          navigate(`../clientes/`);
          onClose()
        }
      });
  }

  const [formData, setFormData] = useState({
    codigo: 0
  });
  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  }

  const [status, setStatus] = useState<t.Status[]>();

  useEffect(() =>{
    api.get(`/Status/GetStatuses`).then(response => {
      if(response && response.status === 200){
        setStatus(response.data);
      }
    })
  }, [api])

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
            label="Status"
            helperText="Selecione o status"
            style={{ width: 415 }}
            onChange={handleFieldChange}
          >
          {status && 
            status.map((opcao) => (         
              (opcao.tipo !== "SEM COMPRA" &&
                <MenuItem key={opcao.codigo} value={opcao.codigo}>
                {opcao.tipo}
              </MenuItem>)
            ))
          }
          </TextField>
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

function ModalFinalizarCompra({apiResponse, changeResponse}: modalProps) {

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
        {apiResponse  &&
        <SimpleDialog
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

export default ModalFinalizarCompra;
