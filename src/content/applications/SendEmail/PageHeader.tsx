import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ModalSendEmail from 'src/content/pages/Components/ModalSendEmail';
import * as t from '../../../models/Types'
import { Dispatch, SetStateAction } from 'react';
import ModalCreateEmail from 'src/content/pages/Components/ModalCreateEmail';

interface HeaderProps {
  setEmail: Dispatch<SetStateAction<t.Email[]>>
}

const PageHeader: React.FC<HeaderProps> = ({ setEmail }) => {

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              E-mails
            </Typography>
            <Typography variant="subtitle2">
            </Typography>
          </Grid>
          <Grid item>
            <ModalCreateEmail changeEmail={setEmail} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PageHeader;
