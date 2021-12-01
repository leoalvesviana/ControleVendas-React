import { Box, Container, Card } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import Hero from './Hero';
import { Dispatch, SetStateAction } from 'react';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

interface initialPageProps {
  setLogin: Dispatch<SetStateAction<boolean>>
}

const Overview: React.FC<initialPageProps> = ({ setLogin }) => {

  return (
    <OverviewWrapper >
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Hero setLogin={setLogin} />
    </OverviewWrapper>
  );
}

export default Overview;
