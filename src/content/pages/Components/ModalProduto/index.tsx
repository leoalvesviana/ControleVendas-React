import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
import PageTitle from 'src/components/PageTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import api from 'src/service/api';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function BasicAlerts() {

}

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleListItemCreate = (value) => {
    onClose(value);
  };

  const [formData, setFormData] = useState({
    descricao: '',
    valor: 0,
  });

  async function handleSubmit() {
    const { descricao, valor } = formData;

    const data = {
      descricao,
      valor
    };
    await api.post('/Itens/InserirItem', {
      descricao: data.descricao,
      valor: Number(valor)
    }).then(response => {
      if (response.status === 200) {
        setTimeout(function refreshing() {
          window.location.reload();
        }, 2000);
        toast.success('Produto cadastrado com sucesso!', { autoClose: 2000 });
      }
    }).catch(error => {
      toast.error('Error!', { autoClose: 5000 });
    });;
  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  }


  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Cadastrar Produto</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            label="Descrição"
            name="descricao"
            style={{ width: 415 }}
            multiline
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            type="number"
            label="Valor"
            name="valor"
            style={{ width: 415, height: 80 }}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem onClick={() => handleListItemCreate('Create')}>
          <ListItem autoFocus button onClick={handleSubmit}>
            <ListItemAvatar>
              <Avatar>
                <CheckIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cadastrar" />
          </ListItem>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function ModalProduto() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);

  };


  return (
    <>
      <Grid item>
        <Button sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={handleClickOpen}><AddTwoToneIcon sx={{ fontSize: 25 }} /></Button>
        <SimpleDialog
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default ModalProduto;
