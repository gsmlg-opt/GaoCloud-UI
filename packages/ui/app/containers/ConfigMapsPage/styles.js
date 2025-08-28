import { makeStyles } from '@mui/styles';
import pageStyles from '../../jss/page.js';
import dialogStyles from '../../jss/dialog.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  ...dialogStyles(theme),
  fileContentButton: {
    display: 'inline-block',
    margin: '0 0 17px 0',
    paddingTop: 16,
  },
  dialogCard: {
    marginTop: 0,
  },
  fileNameLink: {
    color: theme.palette.highlight.main,
    cursor: 'pointer',
  },
  cardFooter: {
    display: 'block',
  },

});

export default makeStyles(styles);
