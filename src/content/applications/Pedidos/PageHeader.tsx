import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import ModalPedidos from 'src/content/pages/Components/ModalPedidos';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

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
              Pedidos
            </Typography>
            <Typography variant="subtitle2">
              Realizar um pedido.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Cliente:
            </Typography>
            <Typography variant="subtitle2">
              Nome:
              Endereço:
            </Typography>
          </Grid>
          <Grid item>
            <ModalPedidos />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PageHeader;
