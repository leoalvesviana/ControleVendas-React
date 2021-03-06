import { Typography, Button, Grid, Card, CardContent } from '@mui/material';

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
              Movimentações
            </Typography>
            <Typography variant="subtitle2">
              Tabela de movimentações.
            </Typography>
          </Grid>
        </Grid >
      </CardContent>
    </Card>
  );
}

export default PageHeader;
