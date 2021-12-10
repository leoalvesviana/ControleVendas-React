import PropTypes from 'prop-types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import OptionType from 'react-select'

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
  EmailRemetente: t.Email
}

const SimpleDialog: React.FC<DialogProps> = (props) => {
  const { onClose, EmailRemetente, open } = props;

  const handleClose = () => {
    onClose();
  };

  const [options, setOptions] = useState<any[]>();
  const [selecionados, setSelecionados] = useState<any[]>();
  const [destinatarios, setDestinatarios] = useState<any[]>([]);
  const [clientes, setClientes] = useState<t.Cliente[]>();

  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.get(`/Clientes/GetClientes/`,config).then(response => {
      if(response.status === 200){
        setClientes(response.data);
        let _optionsOptionsClientes = [];
        response.data.forEach((Clientes) => {
          _optionsOptionsClientes.push({ value: Clientes.codigo, label: `${Clientes.nome}` })
        })
        setOptions(_optionsOptionsClientes)
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

  async function handleSubmit() {
    const { assunto, corpoDoEmail } = formData;

    const remetente: t.Email = {
      codigo: EmailRemetente.codigo,
      email: EmailRemetente.email,
      senha: EmailRemetente.senha
    };
    
    clientes.forEach( (cliente) => {
      
      selecionados.forEach((op) => {
        if(cliente.codigo === op.value){
          let escolhidos = destinatarios;
          escolhidos.push(cliente);
          setDestinatarios(escolhidos);
        }
      })
    })

    const data = {
      remetente,
      destinatarios: destinatarios,
      assunto,
      corpoDoEmail
    };

    if (assunto == "" || corpoDoEmail == "" || destinatarios == null) {
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
      await api.post('/Email/EnviarSelecionados', data, config).then(response => {
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
    assunto: '',
    corpoDoEmail: ''
  });

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

  const onChangeDestinatarios = (opcao: any) => {
    setSelecionados(opcao)
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Escrever E-mail</DialogTitle>
      <List sx={{ pt: 0 }} >
        <ListItem>
          <TextField
            label="De:"
            name="remetente"
            disabled
            multiline
            style={{ width: 405 }}
            value={EmailRemetente.email}
          />
        </ListItem>
        <ListItem>
          <Select           
            isMulti={true}
            onChange={e => onChangeDestinatarios(e)}
            options={options}
            value={selecionados}
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
            name="corpoDoEmail"
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
  codigo: number
}

const ModalEnviarEmail: React.FC<ModalProps> = ({ codigo }) => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
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
    api.get(`/Email/GetEmail/${codigo}`,config).then(response => {
      if(response.status === 200){
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
        >
          < ForwardToInboxTwoToneIcon fontSize="small" />
        </IconButton>
        {Email &&
          <SimpleDialog
          open={open}
          onClose={handleClose}
          EmailRemetente={Email}
        />
        }
      </Grid>
    </>
  );
}

export default ModalEnviarEmail;
