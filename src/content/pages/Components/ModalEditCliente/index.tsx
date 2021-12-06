import PropTypes from 'prop-types';
import {
  IconButton,
  useTheme,
} from '@mui/material';
import api from 'src/service/api';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import * as t from "../../../../models/Types"
import { FC, ChangeEvent, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emails = ['username@gmail.com', 'user02@gmail.com'];

toast.configure()

interface SimpleDialogProps{
  onClose: () => void;
  setClientes: Dispatch<SetStateAction<t.Cliente[]>>;
  selectedValue: t.Cliente;
  open: boolean;
}

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, selectedValue, open, setClientes } = props;

  const handleClose = () => {
    onClose();
  };


  async function handleSubmit() {
    const { codigo, nome, tratameno, data, telefone1, telefone2, email1, email2, observacoes, status } = formData;

    const dados = {
      codigo,
      nome,
      tratameno,
      data,
      telefone1,
      telefone2,
      email1,
      email2,
      observacoes,
      status
    };
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    await api.put('/Clientes/AtualizarCliente', dados, config).then(response => {
      if (response.status === 200) {
        api.get('/Clientes/GetClientes', config)
        .then(response => {
          if (response && response.status === 200 && response.data) {
            setClientes(response.data);
            onClose()
          }
        });
        toast.success('Cliente Atualizado com sucesso!', { autoClose: 2000 });
      }
    }).catch(error => {
      toast.error('Error!');
    });;
  }

  const [formData, setFormData] = useState({
    codigo: selectedValue.codigo,
    nome: selectedValue.nome,
    tratameno: selectedValue.tratameno,
    data: selectedValue.data,
    telefone1: selectedValue.telefone1,
    telefone2: selectedValue.telefone2,
    email1: selectedValue.email1,
    email2: selectedValue.email2,
    observacoes: selectedValue.observacoes,
    status: selectedValue.status,
  });

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle style={{ fontSize: 20 }}>Editar Cliente</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            label="Nome Completo"
            name="nome"
            style={{ width: 415 }}
            value={formData.nome}
            onChange={handleFieldChange}
          />&nbsp;
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
          />&nbsp;
          <TextField
            label="Telefone 2"
            name="telefone2"
            style={{ width: 415 }}
            value={formData.telefone2}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Email"
            name="email1"
            style={{ width: 415 }}
            onChange={handleFieldChange}
            value={formData.email1}
          />&nbsp;
          <TextField
            label="Email 2"
            name="email2"
            style={{ width: 415 }}
            onChange={handleFieldChange}
            value={formData.email2}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Observação"
            name="observacoes"
            style={{ width: 550, height: 80 }}
            onChange={handleFieldChange}
            value={formData.observacoes}
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

interface ModalProps {
  codigo: number;
  setClientes: Dispatch<SetStateAction<t.Cliente[]>>;

}

function ModalEditCliente<modalProps>({ codigo, setClientes }) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();
  const [cliente, setCliente] = useState<t.Cliente>();

  const handleClickOpen = () => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.get(`/Clientes/GetCliente/${codigo}`, config)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          setCliente(response.data);
          setOpen(true);
        }
      })
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [clienteList, setClienteList] = useState<any>([]);

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
            setClientes={setClientes}
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
