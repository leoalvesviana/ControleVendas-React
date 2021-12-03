import PropTypes from 'prop-types';
import * as t from "../../../../models/Types"
import { FC, ChangeEvent, useState, useEffect, Dispatch, SetStateAction } from 'react';
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
import api from 'src/service/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Label from 'src/components/Label';
const emails = ['username@gmail.com', 'user02@gmail.com'];

toast.configure()

interface SimpleDialogProps {
  onClose: () => void;
  setClientes: Dispatch<SetStateAction<t.Cliente[]>>;
  open: boolean;
}

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, open, setClientes } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  const handleListItemCreate = () => {
    onClose();
    // toast.success('Cadastrado com sucesso!!', { autoClose: false })
  };

  const [errorField, setErrorField] = useState<any>("primary");

  async function handleSubmit() {
    const { nome, tratameno, telefone1, telefone2, email1, email2, observacoes } = formData;

    const data = {
      nome,
      tratameno,
      telefone1,
      telefone2,
      email1,
      email2,
      observacoes,
    };

    if (nome === "" || telefone1 === "" || tratameno === "" || email1 === "") {
      toast.error("Os campos 'nome', 'telefone', 'tratamento' e 'email' devem ser preenchido.",
        {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
    } else {
      await api.post('/Clientes/InserirCliente', data).then(response => {
        if (response.status === 200) {
          api.get('/Clientes/GetClientes')
            .then(response => {
              if (response && response.status === 200 && response.data) {
                setClientes(response.data);
                onClose()
              }
            });
          toast.success('Cliente cadastrado com sucesso!', { autoClose: 2000 });
        }
      }).catch(error => {
        toast.error('Error!', { autoClose: 5000 });
      });;
    }

  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    observacoes: '',
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
            required={true}
          />&nbsp;
          <TextField
            label="Tratamento"
            name="tratameno"
            multiline
            style={{ width: 415 }}
            onChange={handleFieldChange}
            required={true}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Telefone"
            name="telefone1"
            style={{ width: 415 }}
            multiline
            onChange={handleFieldChange}
            required={true}
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
            required={true}
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
            name="observacoes"
            multiline
            style={{ width: 550, height: 80 }}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem autoFocus button onClick={handleSubmit} >
          <ListItemAvatar>
            <Avatar>
              <CheckIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Cadastrar" />
        </ListItem>
      </List>
    </Dialog>
  );
}

interface ModalProps {
  setClientes: Dispatch<SetStateAction<t.Cliente[]>>;
}

const Modals: React.FC<ModalProps> = ({ setClientes }) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
          setClientes={setClientes}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default Modals;
