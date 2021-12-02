import { useNavigate, useRoutes } from 'react-router-dom';
import routes, {normalUserRotes} from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import Hero from './content/overview/Hero';
import Overview from './content/overview';

const App = () => {

  const content = useRoutes(routes);

  const contentNotAdm = useRoutes(normalUserRotes);

  const [logado, setLogado] = useState<boolean>(false);

  const [usuario, setUser] = useState<any>();

  const navigate = useNavigate();



  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("Logado")));
  }, [window])

  useEffect(() => {
    setLogado(JSON.parse(sessionStorage.getItem("UsuarioLogado")));
  }, [logado])

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {usuario == undefined && usuario == null &&
          <Overview setLogin={setLogado}/>
        }
        {usuario && usuario.admin === true &&
         content
        }
        {usuario && usuario.admin === false &&
          contentNotAdm
        }
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
