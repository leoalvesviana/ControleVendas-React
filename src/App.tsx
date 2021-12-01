import { useNavigate, useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import Hero from './content/overview/Hero';
import Overview from './content/overview';

const App = () => {

  const content = useRoutes(routes);

  const [logado, setLogado] = useState<boolean>(false);

  const navigate = useNavigate();

  console.log(logado)

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {logado !== true &&
          <Overview setLogin={setLogado}/>
        }
        {logado === true &&
         content
         }
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
