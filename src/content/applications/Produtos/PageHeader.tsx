import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import ModalProduto from '../../pages/Components/ModalProduto';
import ModalAltValoresProduto from '../../pages/Components/ModalAltValoresProduto';
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
              Produtos
            </Typography>
            <Typography variant="subtitle2">
              Tabela de produtos cadastrados.
            </Typography>
          </Grid>
          <Grid item>
            <Button><ModalProduto /></Button>
            <Button><ModalAltValoresProduto /></Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PageHeader;
