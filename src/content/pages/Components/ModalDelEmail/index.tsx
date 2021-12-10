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
import { toast } from 'react-toastify';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function BasicAlerts() {

}

interface DialogProps {
  onClose: () => void;
  open: boolean;
  setEmail: Dispatch<SetStateAction<t.Email[]>>
  Codigo: number;
  Email: t.Email;
}

const SimpleDialog: React.FC<DialogProps> = (props) => {
  const { onClose, setEmail, open, Codigo, Email } = props;

  const handleClose = () => {
    onClose();
  };

  async function handleSubmit() {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    await api.delete(`/Email/ExcluirEmail/${Codigo}`, config).then(response => {
      if (response.status === 200) {
        api.get(`/Email/GetEmails`, config).then(response => {
          if (response.status === 200) {
            setEmail(response.data)
            onClose();
          }
        }).catch(error => {
          toast.warn('Sessão expirada', { autoClose: 1000 });
          sessionStorage.clear();
          sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
          setTimeout(function refreshing() {
            window.location.reload();
          }, 500);
      })
      }
    }).catch(error => {
      toast.warn('Sessão expirada', { autoClose: 1000 });
      sessionStorage.clear();
      sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
      setTimeout(function refreshing() {
        window.location.reload();
      }, 500);
  });
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Remover Email</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="Email"
            name="email"
            multiline
            disabled
            style={{ width: 415 }}
            value={Email.email}
          />
        </ListItem>
        <Link style={{ textDecoration: 'none' }} to="/tarefas/SendEmail">
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
  changeEmail: Dispatch<SetStateAction<t.Email[]>>
  codigo: number;
}

const ModalDelEmail: React.FC<ModalProps> = ({ changeEmail, codigo }) => {

  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [Email, setEmail] = useState<t.Email>();

  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.get(`/Email/GetEmail/${codigo}`, config).then(response => {
      if (response.status === 200) {
        setEmail(response.data)
      }
    }).catch(error => {
      toast.warn('Sessão expirada', { autoClose: 1000 });
      sessionStorage.clear();
      sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
      setTimeout(function refreshing() {
        window.location.reload();
      }, 500);
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
        {Email &&
          <SimpleDialog
            open={open}
            onClose={handleClose}
            setEmail={changeEmail}
            Codigo={codigo}
            Email={Email}
          />
        }
      </Grid>
    </>
  );
}

export default ModalDelEmail;
