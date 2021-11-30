import { Typography, Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ModalCreateUser from 'src/content/pages/Components/ModalCreateUser';
import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';

interface HeaderProps{
  setUsuarios: Dispatch<SetStateAction<t.Usuario[]>>
}

const PageHeader: React.FC<HeaderProps> = ({setUsuarios}) => {

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Usuarios
        </Typography>
        <Typography variant="subtitle2">
          Tabela de usuarios cadastrados.
        </Typography>
      </Grid>
      <Grid item>
        <ModalCreateUser changeUsuarios={setUsuarios}/>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
