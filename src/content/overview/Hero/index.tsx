import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { makeStyles } from '@mui/material/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import api from 'src/service/api';

toast.configure()

function alertLogin() {
  toast.info('Login efetuado com sucesso.', { autoClose: 2000 });
}

function alertError() {
  toast.error('usuario ou senha inválidos.', { autoClose: 2000 });
}

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




interface initialPageProps {
  setLogin: Dispatch<SetStateAction<boolean>>
}

const Hero: React.FC<initialPageProps> = () => {

  const handleFieldChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomeUsuario: '',
    senha: ''
  });

  const Handlesubmit = () => {

    const { nomeUsuario, senha } = formData;

    const data = {
      nomeUsuario,
      senha
    }


    api.post(`/Login/Logar`, data).then(response => {
      if (response.status === 200) {
        sessionStorage.setItem("Logado", JSON.stringify(response.data))
        sessionStorage.setItem("UsuarioLogado", JSON.stringify(true))
        setTimeout(function refreshing() {
          window.location.replace("/dashboards/home")
        }, 700);
        alertLogin();

      }
      else {
        alertError();
      }
    })
  }

  return (
    <Container style={{
      textAlign: 'center', backgroundColor: 'white', width: '100vw', height: '100vh', margin: 0, maxWidth: '100%',
      backgroundImage: "url(" + "https://www.pinclipart.com/picdir/big/125-1254871_grey-wave-png-clipart.png" + ")"
      , backgroundSize: 'cover'
    }}>
      <Grid justifyContent="center" alignItems="center" container >
        <Grid item md={10} lg={8} mx="auto">
          <LoginContainer >
            <TypographyH1 sx={{ mb: 2 }} variant="h3">
              Login
            </TypographyH1>

            <Grid sx={{ mt: 8 }} container spacing={1} alignItems="flex-end" justifyContent="center">
              <Grid item>
                <AccountCircleIcon />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" name="nomeUsuario" label="Usuário" onChange={handleFieldChange} />
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
                  name="senha"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleFieldChange}
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
                  size="large"
                  variant="contained"
                  style={{ width: 470 }}
                  onClick={Handlesubmit}
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
