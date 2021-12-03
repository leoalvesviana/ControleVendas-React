import PropTypes from 'prop-types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Grid, Card, CardHeader, CardContent, Divider, ListItem, Checkbox, IconButton, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
import api from 'src/service/api';
import { Link } from 'react-router-dom';
import * as t from '../../../../models/Types'

const emails = ['username@gmail.com', 'user02@gmail.com'];

function BasicAlerts() {

}

interface DialogProps{
  onClose: () => void;
  open: boolean;
  setUser: Dispatch<SetStateAction<t.Usuario[]>>
  Codigo: number;
  user: t.Usuario;
}

const SimpleDialog: React.FC<DialogProps> = (props) => {
  const { onClose, setUser, open, Codigo, user } = props;

  const handleClose = () => {
    onClose();
  };

  async function handleSubmit() {
    const { nome, login, email, senha } = formData;

    const data = {
      codigo: Codigo,
      nome,
      login,
      email,
      senha,
      admin: checkbox,
    };
    await api.post('/Usuario/Atualizar', data).then(response => {
      if (response.status === 200) {
        api.get(`/Usuario/ObterTodos`).then(response => {
          if(response.status === 200){
            setUser(response.data)
            onClose();
          }
        })
      }
    });
  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const [formData, setFormData] = useState({
    nome: user.nome,
    login: user.login,
    email: user.email,
    senha: user.senha
  });

  const [checkbox, setCheckbox] = useState(user.admin);

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox)
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Editar Usuario</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="Nome Completo"
            name="nome"
            multiline
            required
            style={{ width: 415 }}
            onChange={handleFieldChange}
            value={formData.nome}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Login"
            name="login"
            required
            multiline
            style={{ width: 415 }}
            value={formData.login}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Email"
            name="email"
            required
            style={{ width: 415 }}
            value={formData.email}
            multiline
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Senha"
            name="senha"
            type="password"
            required
            style={{ width: 415 }}
            value={formData.senha}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <Checkbox
            name="admin"
            aria-label="Admin"
            color="primary"
            value={checkbox}
            checked={checkbox}
            onClick={handleCheckboxChange}
            title="Alterar para data de hoje?"
        />
        </ListItem>
        <Link to="/tarefas/Usuarios">
            <ListItem autoFocus button onClick={handleSubmit} >
              <ListItemAvatar>
                <Avatar>
                  <CheckIcon color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Confirmar" />
            </ListItem>
        </Link>
      </List>
    </Dialog>
  );
}

interface ModalProps{
  changeUsuarios: Dispatch<SetStateAction<t.Usuario[]>>
  codigo: number;
}

const ModalEditUser: React.FC<ModalProps> = ({changeUsuarios, codigo}) => {

  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user, setUsuario] = useState<t.Usuario>();

  useEffect(() => {
    api.get(`/Usuario/Obter/${codigo}`).then(response => {
      if(response.status === 200){
        setUsuario(response.data)
      }
    })
  }, [api])

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
        {user &&
          <SimpleDialog
          open={open}
          onClose={handleClose}
          setUser={changeUsuarios}
          Codigo={codigo}
          user={user}
        />
        }
      </Grid>
    </>
  );
}

export default ModalEditUser;
