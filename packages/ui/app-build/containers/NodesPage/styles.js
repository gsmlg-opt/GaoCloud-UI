import { makeStyles } from '@mui/styles.js';
import pageStyles from 'jss/page.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  tableBtn: {
    marginRight: 10,
  },
});

export default makeStyles(styles);
