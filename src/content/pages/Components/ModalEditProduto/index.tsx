import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useState } from 'react';
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
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
import api from '../../../../service/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
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
    await api.put('/Itens/AtualizarItem/', data)
      .then(response => {
        if (response.status === 200) {
          setTimeout(function refreshing() {
            window.location.reload();
          }, 2000);
          toast.success('Produto Atualizado com sucesso!', { autoClose: 2000 });
        }
      }).catch(error => {
        toast.error('Error!');
      });;
  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
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

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

interface ModalProps {
  Codigo: number;
}

function ModalEditProduto<ModalProps>({ Codigo }) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
    api.get(`/Itens/GetItem/${Codigo}`)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          console.log(response)
          setItem(response.data);
        }
      })
  }

  const [item, setItem] = useState<any>();

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
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
