import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, IconButton } from '@mui/material';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
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

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Confirmar Pagamento</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <TextField
            name="novaData"
            label="Nova Data"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            defaultValue="Nova Data"
            style={{ width: 415 }}
          />
        </ListItem>


        <ListItem autoFocus button onClick={() => handleListItemCreate('Create')}>
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

function ModalDelProduto() {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    window.location.reload();
  };


  return (
    <>
      <Grid item>
        <IconButton
          sx={{
            '&:hover': {
              background: theme.colors.success.lighter
            },
            color: theme.palette.success.main
          }}
          color="inherit"
          size="small"
          onClick={handleClickOpen}
        >
          <AttachMoneyTwoToneIcon fontSize="small" />
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

export default ModalDelProduto;
