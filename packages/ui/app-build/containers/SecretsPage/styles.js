import { makeStyles } from '@mui/styles.js';
import pageStyles from 'jss/page.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  dataListKey: {
    width: '300px',
  },
  dataListValue: {
    width: '300px',
  },
  fileContentButton: {
    display: 'inline-block',
    height: '79px',
    paddingTop: '29px',
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
