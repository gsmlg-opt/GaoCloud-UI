import { makeStyles } from '@mui/styles';
import pageStyles from '../../jss/page.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  formPlusIcon: {
    position: 'absolute',
    left: '25%',
    top: -36,
  },
  formTable: {
    marginTop: 30,
  },
  h4: {
    margin: 0,
  },
});

export default makeStyles(styles);
