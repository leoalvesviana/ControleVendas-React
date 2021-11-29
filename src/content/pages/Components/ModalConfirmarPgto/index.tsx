import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { ChangeEvent, useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Checkbox } from '@mui/material';
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
  const [checkbox, setCheckbox] = useState(false);

  const handleListItemCreate = (value) => {
    if(checkbox === true){
      var data = new Date;
      let day = data.getDate();
      let month = data.getMonth();
      let year = data.getFullYear();
      let dataParam = `${year}-${month+1}-${day}`;
      console.log(dataParam)
      api.get(`/Movimento/ConfirmarPagamento/${value}`,{
        params: {
          Data: dataParam
        }
      })
        .then(response => {

      if (response.status === 200) {

        window.location.reload();

      }
    })
  }else{
      api.get(`/Movimento/ConfirmarPagamento/${value}`)
      .then(response => {

      if (response.status === 200) {

        window.location.reload();

      }
    })
  }
  };

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox)
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Confirmar Pagamento</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
          disabled 
          label="N° da compra"
          style={{ width: 415 }}
          value={selectedValue}
          />
        </ListItem>
        <ListItem>
        <Checkbox
            aria-label="Deseja alterar a data de compra para hoje?"
            color="primary"
            checked={checkbox}
            onClick={handleCheckboxChange}
            title="Alterar para data de hoje?"
        />
        </ListItem>


        <ListItem autoFocus button onClick={() => handleListItemCreate(selectedValue)}>
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
  Numcompra: number;
}

function ModalConfirmarPgto<ModalProps>({NumCompra}) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

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
        <Button sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          onClick={handleClickOpen}><AddTwoToneIcon sx={{ fontSize: 25 }} /></Button>
        <SimpleDialog
          selectedValue={NumCompra}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default ModalConfirmarPgto;
