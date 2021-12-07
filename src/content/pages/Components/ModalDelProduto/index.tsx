import PropTypes from 'prop-types';
import * as t from "../../../../models/Types"
import { FC, ChangeEvent, useState, useEffect, Dispatch, SetStateAction } from 'react';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
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
import { IconButton, useTheme } from '@mui/material';
import api from 'src/service/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure()

interface SimpleDialogProps{
  onClose: () => void;
  setProdutos: Dispatch<SetStateAction<t.produto>>;
  selectedValue: t.produto;
  open: boolean;
}

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, selectedValue, open, setProdutos} = props;


  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  const handleListItemDelete = (value) => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.delete(`/Itens/ExcluirItem/${value}`, config)
      .then(response => {
        if (response.status === 200) {
          toast.success('Produto deletado!!', { autoClose: 1000 });
          api.get('/Itens/GetItens',config)
          .then(response => {
            if (response && response.status === 200 && response.data) {
              setProdutos(response.data);
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
      }).catch(error => {
        toast.warn('Sessão expirada', { autoClose: 1000 });
        sessionStorage.clear();
        sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
        setTimeout(function refreshing() {
          window.location.reload();
        }, 500);
    });
  };

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Deletar Produto</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            disabled
            label="Descrição"
            style={{ width: 415, marginBottom: 25 }}
            value={selectedValue.descricao}
          />
        </ListItem>

        <ListItem autoFocus button onClick={() => handleListItemDelete(selectedValue.codigo)}>
          <ListItemAvatar>
            <Avatar>
              <CheckIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Deletar" />
        </ListItem>
      </List>
    </Dialog>
  );
}

interface ModalProps {
  Codigo: number;
  setProdutos: Dispatch<SetStateAction<t.produto>>;
}

function ModalDelProduto<ModalProps>({ Codigo, setProdutos }) {

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
    api.get(`/Itens/GetItem/${Codigo}`,config)
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
  const handleClose = () => {
    setOpen(false);
  };

  const [item, setItem] = useState<t.produto>();

  return (
    <>
      <Grid item>
        <IconButton
          sx={{
            '&:hover': { background: theme.colors.error.lighter },
            color: theme.palette.error.main
          }}
          color="inherit"
          size="small"
          onClick={handleClickOpen}
        >
          <DeleteTwoToneIcon fontSize="small" />
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

export default ModalDelProduto;
