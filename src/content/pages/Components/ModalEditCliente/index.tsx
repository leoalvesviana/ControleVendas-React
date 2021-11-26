import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';
import api from 'src/service/api';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Stack from '@mui/material/Stack';

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
    await api.put('/Clientes/AtualizarCliente', data).then(response => {
      if (response.status === 200) {
        window.location.reload();
      }
    }).catch(error => {

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
    email1: '',
    observacao: '',
  });


  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Editar Cliente</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            label="Nome Completo"
            name="nome"
            style={{ width: 415 }}
          />&nbsp;
        </ListItem>
        <ListItem>
          <TextField
            label="Tratamento"
            name="tratameno"
            style={{ width: 415 }}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Telefone"
            name="telefone1"
            style={{ width: 415 }}
          />&nbsp; <Fab style={{ width: 35, height: 30 }} color="secondary" aria-label="add">
            <AddIcon sx={{ fontSize: 25 }} />
          </Fab>
        </ListItem>
        <ListItem>
          <TextField
            label="Email"
            name="email1"
            style={{ width: 415 }}
          />&nbsp;<Fab style={{ width: 35, height: 30 }} color="secondary" aria-label="add">
            <AddIcon sx={{ fontSize: 25 }} />
          </Fab>
        </ListItem>
        <ListItem>
          <TextField
            label="Observação"
            name="observacao"
            style={{ width: 415, height: 80 }}
          />
        </ListItem>

        <ListItem autoFocus button onClick={() => handleListItemCreate('Create')}>
          <ListItem autoFocus button onClick={handleSubmit} >
            <ListItemAvatar>
              <Avatar>
                <CheckIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Confirmar" />
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

function ModalEditCliente() {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();

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
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.primary.lighter
            },
            color: theme.palette.primary.main
          }}
          color="inherit"
          size="small"
          onClick={handleClickOpen}
        >
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default ModalEditCliente;
