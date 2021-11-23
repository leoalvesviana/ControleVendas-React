import { Typography, Button, Grid } from '@mui/material';

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
          Produtos
        </Typography>
        <Typography variant="subtitle2">
          Tabela de produtos cadastrados.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
        >
          Alterar Valores
        </Button>&nbsp;
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
        ><AddTwoToneIcon sx={{ fontSize: 25 }} /></Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
