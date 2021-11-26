import PropTypes from 'prop-types';
import { useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
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
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
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


  async function handleSubmit() {
    const { nome, tratameno, telefone1, email1, observacao } = formData;

    const data = {
      nome,
      tratameno,
      telefone1,
      email1,
      observacao,
    };
    await api.post('/Clientes/InserirCliente', data);
  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const [formData, setFormData] = useState({
    nome: '',
    tratameno: '',
    telefone1: '',
    email1: '',
    observacao: '',
  });




  return (
    <Dialog onClose={handleClose} open={open} >

      <DialogTitle><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Cadastrar Cliente</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="Nome Completo"
            name="nome"
            multiline
            style={{ width: 415 }}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Tratamento"
            name="tratameno"
            multiline
            style={{ width: 415 }}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Telefone"
            name="telefone1"
            style={{ width: 415 }}
            multiline
            onChange={handleFieldChange}
          />&nbsp; <Fab style={{ width: 35, height: 30 }} color="secondary" aria-label="add">
            <AddIcon sx={{ fontSize: 25 }} />
          </Fab>
        </ListItem>
        <ListItem>
          <TextField
            label="Email"
            name="email1"
            style={{ width: 415 }}
            multiline
            onChange={handleFieldChange}
          />&nbsp;<Fab style={{ width: 35, height: 30 }} color="secondary" aria-label="add">
            <AddIcon sx={{ fontSize: 25 }} />
          </Fab>
        </ListItem>
        <ListItem>
          <TextField
            label="Observação"
            name="observacao"
            multiline
            style={{ width: 415, height: 80 }}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem onClick={() => handleListItemCreate('Create')}>
          <ListItem autoFocus button onClick={handleSubmit} >
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

function Modals() {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


  return (
    <>
      <Grid item>
        <Button sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={handleClickOpen}><AddTwoToneIcon sx={{ fontSize: 25 }} /></Button>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default Modals;
