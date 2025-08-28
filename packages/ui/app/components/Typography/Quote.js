import React from 'react';
import { withStyles } from '@mui/styles';
import typographyStyle from './typographyStyle';

function Quote({ ...props }) {
  const { classes, text, author, ...rest } = props;
  return (
    <blockquote
      {...rest}
      className={`${classes.defaultFontStyle} ${classes.quote}`}
    >
      <p className={classes.quoteText}>{text}</p>
      <small className={classes.quoteAuthor}>{author}</small>
    </blockquote>
  );
}



export default withStyles(typographyStyle)(Quote);
