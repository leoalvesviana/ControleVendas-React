import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import Wallets from './Wallets';

function DashboardCrypto() {
  return (
    <Container style={{
      height: '100%', backgroundImage: "url(" + "https://i.pinimg.com/originals/39/1e/7b/391e7ba4cb2c0752bf007c7bfb4ea143.png" + ")",
      backgroundSize: 'cover'
    }}>
      <Helmet>
        <title>Página Inicial</title>
      </Helmet>
      <Grid item lg={12} xs={12}>
        <Wallets />
      </Grid>
    </Container>
  );
}

export default DashboardCrypto;
