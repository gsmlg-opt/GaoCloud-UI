import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @mui/material components
import withStyles from '@mui/material/styles/withStyles';
// @mui/icons-material

// core components
import cardIconStyle from './cardIconStyle';

function CardIcon({ ...props }) {
  const { classes, className, children, color, ...rest } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[`${color}CardHeader`]]: color,
    [className]: className !== undefined,
  });
  return (
    <div className={cardIconClasses} {...rest}>
      {children}
    </div>
  );
}

CardIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    'rose',
    'cyan',
    'cyanInverse',
  ]),
};

export default withStyles(cardIconStyle)(CardIcon);
