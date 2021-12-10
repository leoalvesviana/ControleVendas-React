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
import MarkAsUnreadTwoToneIcon from '@mui/icons-material/MarkAsUnreadTwoTone';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
import api from 'src/service/api';
import { Link } from 'react-router-dom';
import * as t from '../../../../models/Types'
import { toast } from 'react-toastify';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function BasicAlerts() {

}

interface DialogProps {
  onClose: () => void;
  open: boolean;
  Codigo: number;
  Email: t.Email;
}

const SimpleDialog: React.FC<DialogProps> = (props) => {
  const { onClose, open, Codigo, Email } = props;

  const handleClose = () => {
    onClose();
  };

  async function handleSubmit() {
    const { assunto, corpoDoEmail } = formData;
    const remetente = {
      codigo: Codigo,
      email: Email.email,
      senha: Email.senha
    };
    if (assunto != "" || corpoDoEmail != "") {
      toast.error("Os campos 'Assunto', 'Corpo do Email' devem ser preenchidos.",
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
      const data = {
        remetente,
        destinatarios: [],
        assunto,
        corpoDoEmail
      };
      let config = {
        headers: {
          authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
        }
      }
      await api.post('/Email/EnviarTodos', data, config).then(response => {
        if (response.status === 200) {
          onClose();
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

  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const [formData, setFormData] = useState({
    assunto: "",
    corpoDoEmail: ""
  });

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Enviar Email para todos os Clientes</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="Remetente"
            name="email"
            disabled
            style={{ width: 415 }}
            value={Email.email}
            multiline
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Assunto"
            name="assunto"
            required
            style={{ width: 405 }}
            multiline
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Corpo do Email"
            name="corpoDoEmail"
            multiline
            required
            style={{ width: 405 }}
            onChange={handleFieldChange}
          />

        </ListItem>
        <Link to="/tarefas/SendEmail">
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

interface ModalProps {
  codigo: number;
}

const ModalSendEveryone: React.FC<ModalProps> = ({ codigo }) => {

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
          title="Enviar Email para todos"
        >
          <MarkAsUnreadTwoToneIcon fontSize="small" />
        </IconButton>
        {Email &&
          <SimpleDialog
            open={open}
            onClose={handleClose}
            Codigo={codigo}
            Email={Email}
          />
        }
      </Grid>
    </>
  );
}

export default ModalSendEveryone;
