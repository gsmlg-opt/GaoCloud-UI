import React from 'react';
// nodejs library to set properties for components
// nodejs library that concatenates classes
import classNames from 'classnames';

// @mui/material components
import withStyles from '@mui/styles';
import IconButton from '@mui/material/IconButton';

// core components

import iconButtonStyle from './iconButtonStyle';

function RegularIconButton({ ...props }) {
  const {
    classes,
    children,
    disabled,
    block,
    size,
    className,
    ...rest
  } = props;
  const iconBtnClasses = classNames({
    [classes.iconButton]: true,
    [classes.disabled]: disabled,
    [classes.block]: block,
    [classes[size]]: size,
    [className]: className,
  });
  return (
    <IconButton {...rest} className={iconBtnClasses} disableRipple>
      {children}
    </IconButton>
  );
}



export default withStyles(iconButtonStyle)(RegularIconButton);
