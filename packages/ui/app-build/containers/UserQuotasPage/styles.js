import { makeStyles } from '@mui/styles.js';
import pageStyles from 'jss/page.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  username: {
    fontSize: '14px',
    display: 'block',
    marginTop: '20px',
  },
  detailsBtn: {
    marginRight: 10,
  },
});

export default makeStyles(styles);
