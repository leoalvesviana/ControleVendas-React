import PropTypes from 'prop-types';
import { Dispatch, SetStateAction, useState } from 'react';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import AttachEmailOutlinedIcon from '@mui/icons-material/AttachEmailOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { Container, Grid, Card, CardHeader, CardContent, Divider, ListItem, Checkbox, IconButton, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import React, { Component } from 'react'
import Select, { StylesConfig } from 'react-select'
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

interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

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

  const onChangeEmail = (option: any[]) => {
    // setEmail(option);
    let valor = 0;
    //console.log(option)
  }

  const dot = (color = 'blue') => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const selectStylesMulti: StylesConfig<ColourOption> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', maxWidth: "405px", minWidth: "405px", minHeight: "70px" }),
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };


  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Escrever E-mail</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="De:"
            name="remetente"
            multiline
            style={{ width: 405 }}
            onChange={handleFieldChange}
          />
        </ListItem>
        <ListItem>
          <Select
            // value={produtos}
            // options={optionsProdutos}
            isMulti={true}
            // onChange={e => onChangeProdutos(e)}
            styles={selectStylesMulti}
            placeholder="Para:"

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
  changeEmail: Dispatch<SetStateAction<t.Email[]>>
}

const ModalEnviarEmail: React.FC<ModalProps> = ({ changeEmail }) => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          < ForwardToInboxTwoToneIcon fontSize="small" />
        </IconButton>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          setUser={changeEmail}
        />
      </Grid>
    </>
  );
}

export default ModalEnviarEmail;
