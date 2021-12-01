import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Modals from 'src/content/pages/Components/Modals';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';

interface Props{
  setClientes: Dispatch<SetStateAction<t.Cliente[]>>;
}

const PageHeader: React.FC<Props> = ({setClientes}) => {

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Clientes
            </Typography>
            <Typography variant="subtitle2">
              Tabela de clientes cadastrados.
            </Typography>
          </Grid>
          <Grid item>
            <Modals setClientes={setClientes}/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PageHeader;
