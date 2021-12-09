import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ModalSendEmail from 'src/content/pages/Components/ModalSendEmail';
import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';

interface HeaderProps {
  setUsuarios: Dispatch<SetStateAction<t.Usuario[]>>
}

const PageHeader: React.FC<HeaderProps> = ({ setUsuarios }) => {

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Enviar e-mail
            </Typography>
            <Typography variant="subtitle2">
              Lista de E-mails enviados.
            </Typography>
          </Grid>
          <Grid item>
            <ModalSendEmail changeUsuarios={setUsuarios} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PageHeader;
