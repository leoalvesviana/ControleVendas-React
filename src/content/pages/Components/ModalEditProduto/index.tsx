import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import * as t from "../../../../models/Types"
import { FC, ChangeEvent, useState, useEffect, Dispatch, SetStateAction } from 'react';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IconButton, useTheme } from '@mui/material';
import api from '../../../../service/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

interface SimpleDialogProps{
  onClose: () => void;
  setProdutos: Dispatch<SetStateAction<t.produto>>;
  selectedValue: t.produto;
  open: boolean;
}

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, selectedValue, open, setProdutos } = props;

  const handleClose = () => {
    onClose();
  };


  const [formData, setFormData] = useState({
    codigo: selectedValue.codigo,
    descricao: selectedValue.descricao,
    valor: selectedValue.valor,
  });


  async function handleSubmit() {
    const { codigo, descricao, valor } = formData;

    const data = {
      codigo,
      descricao,
      valor
    };
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    await api.put('/Itens/AtualizarItem/', data, config)
      .then(response => {
        if (response.status === 200) {
          api.get('/Itens/GetItens', config)
          .then(response => {
            if (response && response.status === 200 && response.data) {
              setProdutos(response.data);
              onClose()
            }
          }).catch(error => {
            toast.warn('Sessão expirada', { autoClose: 1000 });
            sessionStorage.clear();
            sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
            setTimeout(function refreshing() {
              window.location.reload();
            }, 500);
        });
          toast.success('Produto Atualizado com sucesso!', { autoClose: 2000 });
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

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Editar Produto</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            label="Descrição"
            name="descricao"
            style={{ width: 415 }}
            onChange={handleFieldChange}
            value={formData.descricao}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Valor"
            name="valor"
            style={{ width: 415, height: 80 }}
            onChange={handleFieldChange}
            value={formData.valor}
          />
        </ListItem>

        <ListItem autoFocus button onClick={handleSubmit}>
          <ListItemAvatar>
            <Avatar>
              <CheckIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Confirmar" />
        </ListItem>
      </List>
    </Dialog>
  );
}

interface ModalProps {
  Codigo: number;
  setProdutos: Dispatch<SetStateAction<t.produto>>;
}

function ModalEditProduto<ModalProps>({ Codigo, setProdutos }) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const theme = useTheme();

  const handleClickOpen = () => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    setOpen(true);
    api.get(`/Itens/GetItem/${Codigo}`, config)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          setItem(response.data);
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

  const [item, setItem] = useState<t.produto>();

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
          <EditTwoToneIcon fontSize="small" />
        </IconButton>
        {item &&
          <SimpleDialog
            setProdutos={setProdutos}
            selectedValue={item}
            open={open}
            onClose={handleClose}
          />
        }
      </Grid>
    </>
  );
}

export default ModalEditProduto;
