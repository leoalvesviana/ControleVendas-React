import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import PageTitle from 'src/components/PageTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/service/api';
import * as t from "../../../../models/Types"
import { FC, ChangeEvent, useState, useEffect, Dispatch, SetStateAction } from 'react';

const emails = ['username@gmail.com', 'user02@gmail.com'];

toast.configure()

interface SimpleDialogProps{
  onClose: () => void;
  setProdutos: Dispatch<SetStateAction<t.produto[]>>;
  open: boolean;
}

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, setProdutos, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  const handleListItemCreate = () => {
    onClose();
  };

  const [formData, setFormData] = useState({
    descricao: '',
    valor: 0,
  });

  async function handleSubmit() {
    const { descricao, valor } = formData;

    const data = {
      descricao,
      valor
    };

    if (descricao === "" || valor === 0) {
      toast.error("Os campos 'Descrição' e 'Valor' devem ser preenchidos.",
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
      await api.post('/Itens/InserirItem', {
        descricao: data.descricao,
        valor: Number(valor)
      }, config).then(response => {
        if (response.status === 200) {
          api.get('/Itens/GetItens', config)
          .then(response => {
            if (response && response.status === 200 && response.data) {
              setProdutos(response.data);
              onClose()
            }
          });
          toast.success('Produto cadastrado com sucesso!', { autoClose: 2000 });
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


  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Cadastrar Produto</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            label="Descrição"
            name="descricao"
            style={{ width: 415 }}
            multiline
            onChange={handleFieldChange}
            required={true}
          />
        </ListItem>
        <ListItem>
          <TextField
            type="number"
            label="Valor"
            name="valor"
            style={{ width: 415, height: 80 }}
            onChange={handleFieldChange}
            required={true}
          />
        </ListItem>
        <ListItem autoFocus button onClick={handleSubmit}>
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
  setProdutos: Dispatch<SetStateAction<t.produto[]>>;
}

const ModalProduto: React.FC<ModalProps> = ({setProdutos}) => {

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
          setProdutos={setProdutos}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default ModalProduto;
