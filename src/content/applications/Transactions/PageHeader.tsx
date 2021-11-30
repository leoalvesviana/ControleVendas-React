import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Modals from 'src/content/pages/Components/Modals';
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
              Clientes
            </Typography>
            <Typography variant="subtitle2">
              Tabela de clientes cadastrados.
            </Typography>
          </Grid>
          <Grid item>
            <Modals />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PageHeader;
