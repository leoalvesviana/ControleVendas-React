import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@mui/material';
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
import api from 'src/service/api';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import { textAlign } from '@mui/system';
import { FormatAlignJustify } from '@mui/icons-material';

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
      <DialogTitle>Detalhes da Compra</DialogTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedValue.produtos.map((produto, i) => (
            <TableRow
              key={produto.codigo}
            >
              <TableCell>{produto.codigo}</TableCell>
              <TableCell>{produto.descricao}</TableCell>
              <TableCell>{produto.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total Itens:  {selectedValue.totalItens}</TableCell>
            <TableCell>Valor Total:  {selectedValue.valorTotal}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <List sx={{ pt: 4 }}>
        <ListItem autoFocus button onClick={() => handleListItemCreate('Create')}>
          <ListItemAvatar>
            <Avatar>
              <CheckIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="OK" />
        </ListItem>
      </List>
    </Dialog >
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

function ModalDetailCompra<ModalProps>({ Numcompra }) {

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const theme = useTheme();

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
    api.get(`/Movimento/DetalhesCompra/${Numcompra}`)
      .then(response => {
        if (response && response.status === 200 && response.data) {
          console.log(response)
          setMovimento(response.data);
        }
      })
  }
  const [movimento, setMovimento] = useState<any>();


  return (
    <>
      <Grid item>
        <IconButton
          sx={{
            '&:hover': { background: theme.colors.primary.lighter },
            color: theme.palette.primary.main
          }}
          color="inherit"
          size="small"
          onClick={handleClickOpen}
        >


          <AssignmentTwoToneIcon fontSize="small" />
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

export default ModalDetailCompra;
