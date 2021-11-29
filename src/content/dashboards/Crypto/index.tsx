import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';

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
