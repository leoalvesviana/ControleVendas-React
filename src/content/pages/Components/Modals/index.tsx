import PropTypes from 'prop-types';
import { useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Grid, Icon } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
import api from 'src/service/api';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const emails = ['username@gmail.com', 'user02@gmail.com'];

toast.configure()



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
    // toast.success('Cadastrado com sucesso!!', { autoClose: false })
  };


  async function handleSubmit() {
    const { nome, tratameno, telefone1, telefone2, email1, email2, observacao } = formData;

    const data = {
      nome,
      tratameno,
      telefone1,
      telefone2,
      email1,
      email2,
      observacao,
    };
    await api.post('/Clientes/InserirCliente', data).then(response => {
      if (response.status === 200) {
        setTimeout(function refreshing() {
          window.location.reload();
        }, 2000);
        toast.success('Cliente cadastrado com sucesso!', { autoClose: 2000 });
      }
    }).catch(error => {
      toast.error('Error!', { autoClose: 5000 });
    });;
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
    telefone2: '',
    email1: '',
    email2: '',
    observacao: '',
  });




  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle style={{ fontSize: 20 }}>Cadastrar Cliente</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="Nome Completo"
            name="nome"
            multiline
            style={{ width: 415 }}
            onChange={handleFieldChange}
          />&nbsp;
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
          />&nbsp;
          <TextField
            label="Telefone 2 (Opcional)"
            name="telefone2"
            style={{ width: 415 }}
            multiline
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Email"
            name="email1"
            style={{ width: 415 }}
            multiline
            onChange={handleFieldChange}
          />&nbsp;
          <TextField
            label="Email 2 (Opcional)"
            name="email2"
            style={{ width: 415 }}
            multiline
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Observação"
            name="observacao"
            multiline
            style={{ width: 550, height: 80 }}
            onChange={handleFieldChange}
          />
        </ListItem>
        <Link to="/tarefas/clientes">
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
        </Link>
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
