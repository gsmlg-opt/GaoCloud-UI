import { makeStyles } from '@mui/styles.js';
import pageStyles from 'jss/page.js';
import dialogStyles from 'jss/dialog.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  ...dialogStyles(theme),
  radioControl: {
    marginTop: 10,
    flexDirection: 'row',
  },
});

export default makeStyles(styles);
