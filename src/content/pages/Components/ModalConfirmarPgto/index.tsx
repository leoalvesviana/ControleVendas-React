import PropTypes from 'prop-types';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTheme, IconButton, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyTwoToneIcon from '@mui/icons-material/AttachMoneyTwoTone';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Label from 'src/components/Label';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'src/service/api';
import * as t from "../../../../models/Types"

const emails = ['username@gmail.com', 'user02@gmail.com'];

toast.configure()

interface SimpleDialogProps{
  onClose: () => void;
  open: boolean;
  selectedValue: number
  setMovimentos: Dispatch<SetStateAction<t.MovimentacaoFinanceiraPage>>;
}

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { onClose, selectedValue, open, setMovimentos } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };
  const [checkbox, setCheckbox] = useState(false);

  const handleListItemCreate = (value) => {
    if (checkbox === true) {
      var data = new Date;
      let day = data.getDate();
      let month = data.getMonth();
      let year = data.getFullYear();
      let dataParam = `${year}-${month + 1}-${day}`;
      console.log(dataParam)
      api.get(`/Movimento/ConfirmarPagamento/${value}`, {
        params: {
          Data: dataParam
        }
      })
        .then(response => {
          if (response.status === 200) {
            toast.success('Pagamento confirmado!!', { autoClose: 1000 });
            api.get(`/Movimento/IndexMovimento`).then(response => {
              if(response.status === 200){
                setMovimentos(response.data);
              }
            })
          }
        })

    } else {
      api.get(`/Movimento/ConfirmarPagamento/${value}`)
        .then(response => {
          if (response.status === 200) {
            toast.success('Pagamento confirmado!!', { autoClose: 1000 });
            api.get(`/Movimento/IndexMovimento`).then(response => {
              if(response.status === 200){
                setMovimentos(response.data);
              }
            })
          }
        })
    }
  };

  const handleCheckboxChange = () => {
    setCheckbox(!checkbox)
  }

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
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
          />&nbsp;
          <Label>Deseja alterar a data de compra para hoje?</Label>
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

interface ModalProps {
  Numcompra: number;
  setMovimentos: Dispatch<SetStateAction<t.MovimentacaoFinanceiraPage>>;
}


function ModalConfirmarPgto<ModalProps>({ NumCompra, setMovimentos }) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          setMovimentos={setMovimentos}
          selectedValue={NumCompra}
          open={open}
          onClose={handleClose}
        />
      </Grid>
    </>
  );
}

export default ModalConfirmarPgto;
