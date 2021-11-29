import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import { useTheme, IconButton } from '@mui/material';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import api from 'src/service/api';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function BasicAlerts() {

}

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleListItemDelete = (value) => {
    api.delete(`/Movimento/ExcluirMovimento/${value}`)
      .then(response => {

        if (response.status === 200) {

          window.location.reload();

        }

      }).catch(error => {



      });


  };

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Deletar Movimentação</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            disabled
            label="Nome"
            style={{ width: 415 }}
            value={selectedValue.cliente.nome}
          />
        </ListItem>
        <ListItem>
          <TextField
            disabled
            label="Status"
            style={{ width: 415 }}
            value={selectedValue.compra.status}
          />
        </ListItem>
        <ListItem>
          <TextField
            disabled
            label="N° da compra"
            style={{ width: 415 }}
            value={selectedValue.compra.numCompra}
          />
        </ListItem>

        <ListItem autoFocus button onClick={() => handleListItemDelete(selectedValue.compra.numCompra)}>
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
  Numcompra: number;
}

function ModalDelMovi<ModalProps>({ NumCompra }) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
    api.get(`/Movimento/GetCompra/${NumCompra}`)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          console.log(response)
          setMovimento(response.data);
        }
      })
  }

  const handleClose = (value) => {
    setOpen(false);
  };

  const [movimento, setMovimento] = useState<any>();




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
        {movimento &&
          <SimpleDialog
            selectedValue={movimento}
            open={open}
            onClose={handleClose}
          />
        }
      </Grid>
    </>
  );
}

export default ModalDelMovi;
