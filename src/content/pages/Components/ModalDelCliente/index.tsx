import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useState } from 'react';
import api from 'src/service/api';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  IconButton,
  useTheme
} from '@mui/material';
import { ChangeEvent } from 'react-transition-group/node_modules/@types/react';
import PageTitle from 'src/components/PageTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
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
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Footer from 'src/components/Footer';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

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

  const handleListItemCreate = (value) => {
    onClose(value);
    return (
      <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert variant="outlined" severity="success">
          This is a success alert — check it out!
        </Alert>
      </Stack>
    );
  };


  async function handleSubmit() {
    const { codigo } = formData;

    const data = {
    };
    await api.put('/Clientes/ExcluirClientes', data).then(response => {
      if (response.status === 200) {
        window.location.reload();
      }
    }).catch(error => {

    });;
  }

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const [formData, setFormData] = useState({
    codigo: 0,
  });

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Deletar Cliente</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            label="Nome Completo"
            style={{ marginBottom: 25 }}
          />
        </ListItem>


        <ListItem sx={{ pt: 1 }} autoFocus button onClick={() => handleListItemCreate('Create')}>
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

function ModalDelCliente() {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };


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
        <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default ModalDelCliente;
