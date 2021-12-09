import PropTypes from 'prop-types';
import { Dispatch, SetStateAction, useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
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
  setUser: Dispatch<SetStateAction<t.Usuario[]>>
}

const SimpleDialog: React.FC<DialogProps> = (props) => {
  const { onClose, setUser, open } = props;

  const handleClose = () => {
    onClose();
  };

  async function handleSubmit() {
    const { nome, login, email, senha } = formData;

    const data = {
      nome,
      login,
      email,
      senha,
      admin: checkbox,
    };
    if (nome === "" || login === "" || email === "" || senha === "") {
      toast.error("Os campos 'Assunto', 'Texto' devem ser preenchidos.",
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
      await api.post('/Usuario/Inserir', data, config).then(response => {
        if (response.status === 200) {
          api.get(`/Usuario/ObterTodos`, config).then(response => {
            if (response.status === 200) {
              toast.success('Usuário criado com sucesso!', { autoClose: 2000 });
              setUser(response.data)
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
    nome: '',
    login: '',
    email: '',
    senha: ''
  });

  const [checkbox, setCheckbox] = useState(false);

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox)
  }


  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Escrever E-mail</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="Do:"
            name="indice1"
            multiline
            required
            style={{ width: 200 }}
            onChange={handleFieldChange}
          />&nbsp;
          <TextField
            label="Até:"
            name="indice2"
            required
            multiline
            style={{ width: 200 }}
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
            label="Texto"
            name="texto"
            multiline
            required
            style={{ width: 405 }}
            onChange={handleFieldChange}
          />

        </ListItem>
        <ListItem autoFocus button onClick={handleSubmit}>
          <ListItemAvatar>
            <SendIcon color="primary" sx={{ fontSize: 25 }} />
          </ListItemAvatar>
          <ListItemText primary="Enviar" />
        </ListItem>
      </List>
    </Dialog>
  );
}

interface ModalProps {
  changeUsuarios: Dispatch<SetStateAction<t.Usuario[]>>
}

const ModalCreateUser: React.FC<ModalProps> = ({ changeUsuarios }) => {

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
          onClick={handleClickOpen}><AttachEmailOutlinedIcon sx={{ fontSize: 25 }} /></Button>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          setUser={changeUsuarios}
        />
      </Grid>
    </>
  );
}

export default ModalCreateUser;
