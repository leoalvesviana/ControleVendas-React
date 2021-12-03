import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';

import Wallets from './Wallets';

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Página Inicial</title>
      </Helmet>
      <Grid item lg={12} xs={12}>
        <Wallets />
      </Grid>
    </>
  );
}

export default DashboardCrypto;
