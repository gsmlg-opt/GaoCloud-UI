import { makeStyles } from '@mui/styles.js';
import dialogStyles from 'jss/dialog.js';

export const styles = (theme) => ({
  ...dialogStyles(theme),
  dialogCardBody: {
    display: 'flex',
    height: 'calc(100vh - 225px)',
  },
});

export default makeStyles(styles);
