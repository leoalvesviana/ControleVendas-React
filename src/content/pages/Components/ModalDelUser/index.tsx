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
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function BasicAlerts() {

}

interface DialogProps {
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
    await api.delete(`/Usuario/Excluir/${Codigo}`).then(response => {
      if (response.status === 200) {
        api.get(`/Usuario/ObterTodos`).then(response => {
          if (response.status === 200) {
            setUser(response.data)
            onClose();
          }
        })
      }
    });
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Remover Usuario</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="Nome Completo"
            name="nome"
            multiline
            disabled
            style={{ width: 415 }}
            value={user.nome}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Login"
            name="login"
            disabled
            multiline
            style={{ width: 415 }}
            value={user.login}
          />
        </ListItem>
        <Link style={{ textDecoration: 'none' }} to="/tarefas/Usuarios">
          <ListItem autoFocus button onClick={handleSubmit} >
            <ListItemAvatar>
              <Avatar>
                <CheckIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Remover" />
          </ListItem>
        </Link>
      </List>
    </Dialog>
  );
}

interface ModalProps {
  changeUsuarios: Dispatch<SetStateAction<t.Usuario[]>>
  codigo: number;
}

const ModalDelUser: React.FC<ModalProps> = ({ changeUsuarios, codigo }) => {

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
      if (response.status === 200) {
        setUsuario(response.data)
      }
    })
  }, [api])

  return (
    <>
      <Grid item height="42px">
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.error.lighter
            },
            color: theme.palette.error.main
          }}
          color="inherit"
          size="small"
          onClick={handleClickOpen}
        >
          <DeleteTwoToneIcon fontSize="small" />
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

export default ModalDelUser;
