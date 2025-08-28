import { makeStyles } from '@mui/styles';
import pageStyles from '../../jss/page.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  tableBtn: {
    marginRight: 10,
  },
});

export default makeStyles(styles);
