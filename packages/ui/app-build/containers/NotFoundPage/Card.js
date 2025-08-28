/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import img404 from '../../../app/images/404.png';

import messages from './messages';
import useStyles from './styles';

const NotFoundCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card404}>
      <CardBody className={classes.card404Body}>
        <img className={classes.img404} src={img404}  />
        <div className={classes.textBlock}>
          <h4>很抱歉,地球我们都找遍了,还是没发现您要的页面</h4>
          <ul>
            请试试以下办法：
            <li>检查网络连接</li>
            <li>检查代理服务器和防火墙</li>
          </ul>
        </div>
      </CardBody>
    </Card>
  );
};

export default NotFoundCard;
