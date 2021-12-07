import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Grid, Card, CardHeader, CardContent, Divider, MenuItem, IconButton, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Label from 'src/components/Label';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import api from 'src/service/api';
import * as t from '../../../../models/Types'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure()


const emails = ['username@gmail.com', 'user02@gmail.com'];

interface dialogProps {
  onClose: () => void;
  open: boolean;
  body: t.Pedido;
  setApiResponse: Dispatch<SetStateAction<t.Pedido>>

}

function SimpleDialog(props: dialogProps) {
  const { onClose, open, body, setApiResponse } = props;

  const handleClose = () => {
    onClose();
  };

  const navigate = useNavigate();

  function handleSubmit() {

    const Status = formData.codigo;
    let data: t.Pedido;
    data = body;
    data.status = Status;
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.post('/Pedidos/FinalizarCompra/', data, config)
      .then(response => {
        if (response.status === 200) {
          setTimeout(function alertCompra() {
            toast.success('A compra foi finalizada!', { autoClose: 2000 });
          }, 100);
          setApiResponse(null)
          navigate(`../clientes/`);
          onClose()
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

  const [formData, setFormData] = useState({
    codigo: 0
  });
  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const [status, setStatus] = useState<t.Status[]>();

  useEffect(() => {
    let config = {
      headers: {
        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("Token"))}`
      }
    }
    api.get(`/Status/GetStatuses`, config).then(response => {
      if (response && response.status === 200) {
        setStatus(response.data);
      }
    }).catch(error => {
      toast.warn('Sessão expirada', { autoClose: 1000 });
      sessionStorage.clear();
      sessionStorage.setItem("UsuarioLogado", JSON.stringify(false))
      setTimeout(function refreshing() {
        window.location.reload();
      }, 500);
  })
  }, [api])

  return (
    <Dialog onClose={handleClose} open={open}>

      <DialogTitle style={{ display: 'flex', justifyContent: 'flex-end' }}><Button variant="outlined" color="error" onClick={handleClose}><CloseIcon sx={{ fontSize: 25 }} /></Button></DialogTitle>
      <DialogTitle>Finalizar compra</DialogTitle>
      <List sx={{ pt: 0 }}>

        <ListItem>
          <TextField
            id=""
            name="codigo"
            select
            label="Status"
            helperText="Selecione o status"
            style={{ width: 415 }}
            onChange={handleFieldChange}
          >
            {status &&
              status.map((opcao) => (
                (opcao.tipo !== "SEM COMPRA" &&
                  <MenuItem key={opcao.codigo} value={opcao.codigo}>
                    {opcao.tipo}
                  </MenuItem>)
              ))
            }
          </TextField>
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

interface modalProps {
  apiResponse: t.Pedido;
  changeResponse: Dispatch<SetStateAction<t.Pedido>>
}

function ModalFinalizarCompra({ apiResponse, changeResponse }: modalProps) {

  const [open, setOpen] = useState(false);
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
            '&:hover': { background: theme.colors.success.lighter }
          }}
          color="success"
          size="small"
          onClick={handleClickOpen}
        >
          <ListItemAvatar >
            <CheckCircleTwoToneIcon sx={{ mt: 1 }} color="success" />
          </ListItemAvatar>
          <ListItemText sx={{ mr: 2 }} primary="Finalizar compra" />
        </IconButton>
        {apiResponse &&
          <SimpleDialog
            open={open}
            onClose={handleClose}
            body={apiResponse}
            setApiResponse={changeResponse}
          />
        }
      </Grid>
    </>
  );

}

export default ModalFinalizarCompra;
