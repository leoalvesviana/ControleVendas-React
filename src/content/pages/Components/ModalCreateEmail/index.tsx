import PropTypes from 'prop-types';
import { Dispatch, SetStateAction, useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Grid, Card, CardHeader, CardContent, Divider, ListItem, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
import api from 'src/service/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import * as t from '../../../../models/Types';
import Label from 'src/components/Label';

toast.configure()

const emails = ['username@gmail.com', 'user02@gmail.com'];

interface DialogProps {
  onClose: () => void;
  open: boolean;
  setEmail: Dispatch<SetStateAction<t.Email[]>>
}

const SimpleDialog: React.FC<DialogProps> = (props) => {
  const { onClose, setEmail, open } = props;

  const handleClose = () => {
    onClose();
  };

  async function handleSubmit() {
    const { email, senha } = formData;

    const data = {
      email,
      senha
    };
    if (email === "" || senha === "") {
      toast.error("Os campos 'Email' e 'Senha' devem ser preenchidos.",
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
      let config = {
        headers: {
          authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
        }
      }
      await api.post('/Email/InserirEmail', data, config).then(response => {
        if (response.status === 200) {
          api.get(`/Email/GetEmails`, config).then(response => {
            if (response.status === 200) {
              toast.success('Email criado com sucesso!', { autoClose: 2000 });
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
  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Cadastrar Email</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="Email"
            name="email"
            required
            style={{ width: 415 }}
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
  changeEmail: Dispatch<SetStateAction<t.Email[]>>
}

const ModalCreateEmail: React.FC<ModalProps> = ({ changeEmail }) => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

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
          open={open}
          onClose={handleClose}
          setEmail={changeEmail}
        />
      </Grid>
    </>
  );
}

export default ModalCreateEmail;
