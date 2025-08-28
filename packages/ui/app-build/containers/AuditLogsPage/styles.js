import { makeStyles } from '@mui/styles.js';
import pageStyles from 'jss/page.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  details: {
    margin: 0,
    fontSize: 14,
    maxWidth: 240,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    verticalAlign: 'middle',
    display: 'inline-block',
    whiteSpace: 'nowrap',
  },
});

export default makeStyles(styles);
