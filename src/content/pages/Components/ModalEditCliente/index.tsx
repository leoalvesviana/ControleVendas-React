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
    const { codigo, nome, tratameno, data, telefone1, email1, observacao, status } = formData;

    const dados = {
      codigo,
      nome,
      tratameno,
      data,
      telefone1,
      email1,
      observacao,
      status
    };
    await api.put('/Clientes/AtualizarCliente', dados).then(response => {
      if (response.status === 200) {
        window.location.reload();
      }
    }).catch(error => {

    });;
  }

  const [formData, setFormData] = useState({
    codigo: selectedValue.codigo,
    nome: selectedValue.nome,
    tratameno: selectedValue.tratameno,
    data: selectedValue.data,
    telefone1: selectedValue.telefone1,
    email1: selectedValue.email1,
    observacao: selectedValue.observacao,
    status: selectedValue.status,
  });

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

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
            value={formData.nome}   
            onChange={handleFieldChange}
          />&nbsp;
        </ListItem>
        <ListItem>
          <TextField
            label="Tratamento"
            name="tratameno"
            style={{ width: 415 }}
            value={formData.tratameno}
            onChange={handleFieldChange}
          />  
        </ListItem>
        <ListItem>
          <TextField
            label="Telefone"
            name="telefone1"
            style={{ width: 415 }}
            value={formData.telefone1}
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
            onChange={handleFieldChange}
            value={formData.email1}
          />&nbsp;<Fab style={{ width: 35, height: 30 }} color="secondary" aria-label="add">
            <AddIcon sx={{ fontSize: 25 }} />
          </Fab>
        </ListItem>
        <ListItem>
          <TextField
            label="Observação"
            name="observacao"
            style={{ width: 415, height: 80 }}
            onChange={handleFieldChange}
            value={formData.observacao}
          />
        </ListItem>

        <ListItem autoFocus button onClick={handleSubmit} >
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

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

interface modalProps {
  codigo: number;
}

function ModalEditCliente<modalProps>({codigo}) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();
  const [cliente, setCliente] = useState<any>();

  const handleClickOpen = () => {
    api.get(`/Clientes/GetCliente/${codigo}`)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          setCliente(response.data);
          setOpen(true);
        }
      })
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
        {cliente &&
        <SimpleDialog
          selectedValue={cliente}
          open={open}
          onClose={handleClose}
          />
      }
      </Grid>
    </>
  );
}

export default ModalEditCliente;
