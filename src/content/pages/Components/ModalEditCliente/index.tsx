import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  IconButton,
  useTheme,
} from '@mui/material';
import api from 'src/service/api';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

const emails = ['username@gmail.com', 'user02@gmail.com'];


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };


  async function handleListEdit(value) {
    await api.put('/Clientes/AtualizarCliente').then(response => {
      if (response.status === 200) {
        window.location.reload();
      }
    }).catch(error => {

    });;
  }



  // async function handleSubmit() {
  //   const { nome, tratameno, telefone1, email1, observacao } = formData;

  //   const data = {
  //     nome,
  //     tratameno,
  //     telefone1,
  //     email1,
  //     observacao,
  //   };
  //   await api.put('/Clientes/AtualizarCliente', data).then(response => {
  //     if (response.status === 200) {
  //       window.location.reload();
  //     }
  //   }).catch(error => {

  //   });;
  // }

  // const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
  //   console.log(event.target.name, event.target.value);
  //   const { name, value } = event.target;
  //   setFormData({ ...formData, [name]: value });
  // }

  // const [formData, setFormData] = useState({
  //   nome: '',
  //   tratameno: '',
  //   telefone1: '',
  //   email1: '',
  //   observacao: '',
  // });


  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Editar Cliente</DialogTitle>
      <List sx={{ pt: 0 }}>
        {selectedValue.clientes.map((cliente) => {
          return (
            <><ListItem>
              <TextField
                label="Nome Completo"
                disabled
                style={{ width: 415 }}
                value={cliente.nome} />
            </ListItem><ListItem>
                <TextField
                  label="Tratamento"
                  disabled
                  style={{ width: 415 }}
                  value={cliente.tratameno} />
              </ListItem><ListItem>
                <TextField
                  label="Telefone"
                  disabled
                  style={{ width: 415 }}
                  value={cliente.telefone1} />&nbsp; <Fab style={{ width: 35, height: 30 }} color="secondary" aria-label="add">
                  <AddIcon sx={{ fontSize: 25 }} />
                </Fab>
              </ListItem><ListItem>
                <TextField
                  label="Email"
                  disabled
                  style={{ width: 415 }}
                  value={cliente.email1} />&nbsp;<Fab style={{ width: 35, height: 30 }} color="secondary" aria-label="add">
                  <AddIcon sx={{ fontSize: 25 }} />
                </Fab>
              </ListItem><ListItem>
                <TextField
                  label="Observação"
                  disabled
                  style={{ width: 415, height: 80 }}
                  value={cliente.observacao} />
              </ListItem><ListItem autoFocus button onClick={() => handleListEdit(selectedValue.cliente.codigo)}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CheckIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Confirmar" />
                </ListItem>
              </ListItem></>
          );
        })}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function ModalEditCliente() {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
    api.get('/Clientes/GetClientes').then(response => {
      if (response && response.status === 200 && response.data) {
        setClienteList(response.data);
        console.log(response);
      }
    });
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [clienteList, setClienteList] = useState<any>([]);

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
        <SimpleDialog
          selectedValue={clienteList}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default ModalEditCliente;
