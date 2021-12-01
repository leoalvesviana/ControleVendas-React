import PropTypes from 'prop-types';
import * as t from "../../../../models/Types"
import { FC, ChangeEvent, useState, useEffect, Dispatch, SetStateAction } from 'react';
import api from 'src/service/api';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { IconButton, useTheme } from '@mui/material';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


toast.configure()

interface SimpleDialogProps{
  onClose: () => void;
  setClientes: Dispatch<SetStateAction<t.Cliente[]>>;
  selectedValue: t.Cliente;
  open: boolean;
}

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, selectedValue, open, setClientes } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };

  const handleListItemCreate = () => {
    onClose();
  };


  const handleListItemDelete = (value) => {
    api.delete(`/Clientes/ExcluirCliente/${value}`)
      .then(response => {
        if (response.status === 200) {
          toast.success('Cliente deletado!!', { autoClose: 1000 });
          api.get('/Clientes/GetClientes')
        .then(response => {
          if (response && response.status === 200 && response.data) {
            setClientes(response.data);
            onClose()
          }
        });
        }
      }).catch(error => {
        toast.error('Não foi possível deletar, Cliente possui uma movimentação vinculada.', { autoClose: 6000 });
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Deletar Cliente</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            disabled
            label="Nome Completo"
            style={{ marginBottom: 25 }}
            value={selectedValue.nome}
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
  setClientes: Dispatch<SetStateAction<t.Cliente[]>>;

}

const ModalDelCliente: React.FC<ModalProps> = ({ Codigo, setClientes }) => {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
    api.get(`/Clientes/GetCliente/${Codigo}`)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          setCliente(response.data);
        }
      })
  }
  const handleClose = () => {
    setOpen(false);
  };

  const [cliente, setCliente] = useState<any>();


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
          title="Deletar"
        >
          <DeleteTwoToneIcon fontSize="small" />
        </IconButton>
        {cliente &&
          <SimpleDialog
            setClientes={setClientes}
            selectedValue={cliente}
            open={open}
            onClose={handleClose}
          />
        }
      </Grid>
    </>
  );
}

export default ModalDelCliente;
