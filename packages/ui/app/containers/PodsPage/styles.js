import { makeStyles } from '@mui/styles';
import pageStyles from '../../jss/page.js';
import dialogStyles from '../../jss/dialog.js';

export const styles = (theme) => ({
  ...pageStyles(theme),
  ...dialogStyles(theme),
  dialogCardBody: {
    height: 'calc(100vh - 225px)',
  },
  dialogCardBodyPaper: {
    display: 'flex',
    height: '100%',
  },
  separateLineWrap: {
    marginTop: '8px',
    marginRight: '5px',
    background: '#eee',
  },
  separateLine: {
    marginTop: '8px',
    boxShadow: '1px 0px 2px #ccc',
    border: '1px solid #ccc',
  },
  removeBtn: {
    float: 'right',
  },
  createBtnLink: {
    position: 'absolute',
    top: '3px',
    right: '10px',
  },
  logsWrapper: {
    width: '70vw',
    backgroundColor: 'black',
    color: 'white',
    overflow: 'auto',
  },
  logs: {
    backgroundColor: 'black',
    color: 'white',
    width: 'fit-content',
  },
  logTime: {
    color: 'green',
  },
  log: {
    backgroundColor: 'black',
    color: 'white',
    marginLeft: '2em',
  },
  tableWrapper: {
    overflow: 'auto',
  },
  button: {
    padding: '0 0 0 5px',
  },
});

export default makeStyles(styles);
