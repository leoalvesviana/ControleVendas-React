import { Typography, Button, Grid } from '@mui/material';
import Modals from 'src/content/pages/Components/Modals';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Detalhes
        </Typography>
        <Typography variant="subtitle2">
          Cliente: <br />
          Email: <br />
          Observações:
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Detalhes
        </Typography>
        <Typography variant="subtitle2">
          Resumo do cliente: <br />
          Numero de compras: <br />
          Total geral:
        </Typography>
      </Grid>
      <Grid item>
        <Modals />
      </Grid>
    </Grid>
  );
}

export default PageHeader;
