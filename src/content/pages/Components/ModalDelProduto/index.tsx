import PropTypes from 'prop-types';
import { useState } from 'react';
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
import 'react-toastify/dist/ReactToastify.css'

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;


  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleListItemDelete = (value) => {
    api.delete(`/Itens/ExcluirItem/${value}`)
      .then(response => {
        if (response.status === 200) {
          toast.success('Produto deletado!!', { autoClose: 1000 });
          setTimeout(function refreshing() {
            window.location.reload();
          }, 1000);
        }
      }).catch(error => {
        toast.error('Não foi possível deletar, Produto possui uma movimentação vinculada.', { autoClose: 6000 });
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

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

interface ModalProps {
  Codigo: number;
}

function ModalDelProduto<ModalProps>({ Codigo }) {

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
  const handleClose = (value) => {
    setOpen(false);
  };

  const [item, setItem] = useState<any>();

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
