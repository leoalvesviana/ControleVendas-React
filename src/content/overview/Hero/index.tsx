import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { makeStyles } from '@mui/material/styles';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

// const Container1 = styled(Container)(
//   ({ theme }) => `
//     background-color: #836FFF;
//     text-align: center;
//     align-items: center;
//     justify-content: center;
// `
// );

const LoginContainer = styled(Box)(
  ({ theme }) => `
    background-color: white;
    width: 500px;
    height: 480px;
    align-items: center;
    justify-content: center;
    padding: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    border-radius: 15px;
    box-shadow: 0px 0px 8px 1px #3a3a3a66;
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);


function Hero() {

  return (
    <Container sx={{ textAlign: 'center' }}>
      <Grid spacing={{ xs: 6, md: 10 }} justifyContent="center" alignItems="center" container>
        <Grid item md={10} lg={8} mx="auto">
          <LoginContainer>
            <TypographyH1 sx={{ mb: 2 }} variant="h3">
              Login
            </TypographyH1>

            <Grid sx={{ mt: 8 }} container spacing={1} alignItems="flex-end" justifyContent="center">
              <Grid item>
                <AccountCircleIcon />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Usuário" />
              </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }} container spacing={1} alignItems="flex-end" justifyContent="center">
              <Grid item>
                <VpnKeyRoundedIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-password-input"
                  label="Senha"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <TypographyH2
              sx={{ lineHeight: 1.5, pb: 4 }}
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
            >

            </TypographyH2>


            <Grid container spacing={3} mt={5}>

              <Grid item>
                <Button
                  component={RouterLink}
                  to="/dashboards/home"
                  size="large"
                  variant="contained"
                  style={{ width: 470 }}
                >
                  Entrar
                </Button>

              </Grid>
              <Grid item md={6}>


              </Grid>

            </Grid>

          </LoginContainer>


        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
