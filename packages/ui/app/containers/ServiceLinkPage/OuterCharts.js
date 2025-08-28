/**
 *
 * Outer Charts
 *
 */

import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import _ from 'lodash';

import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import OuterServiceTree from '../../components/tree/OuterServiceTree.js';

import { makeSelectOuterServices } from '../../ducks/outerServices/selectors.js';

import useStyles from './styles';
import messages from './messages';

const separator = '$';

export const OuterCharts = ({ outerServices }) => {
  const classes = useStyles();
  const [width, setWidth] = useState(400);
  const ref = useCallback((el) => {
    if (el) {
      const { width: w } = el.getBoundingClientRect();
      setWidth(w - 40);
    }
  }, []);
  const os = outerServices.toJS() || [];

  return (
    <GridContainer>
      {os &&
        os.map &&
        os.map((s, i) => {
          const [type, idx, name] = s.name.split(separator);
          const { children } = s;
          const count = _.reduce(
            children,
            (n, c) => {
              const m = _.reduce(
                c.children,
                (nn, cc) => {
                  const mm = _.reduce(
                    cc.children,
                    (nnn, ccc) => {
                      const mmm = _.reduce(
                        ccc.children,
                        (nnnn, cccc) => nnnn + 1,
                        0
                      );
                      return nnn + mmm;
                    },
                    0
                  );
                  return nn + mm;
                },
                0
              );
              return n + (m < 4 ? 4 : m);
            },
            0
          );

          return (
            <GridItem xs={12} sm={12} md={12} key={i}>
              <Card>
                <CardHeader color="default" icon>
                  <h3 className={classes.cardTitle}>
                    <b>
                      <FormattedMessage {...messages.outerServiceName} />
                    </b>
                    {'    '}
                    {name}
                  </h3>
                </CardHeader>
                <CardBody ref={i === 0 ? ref : null}>
                  <OuterServiceTree
                    width={width}
                    height={75 * count > 300 ? 75 * count : 300}
                    data={s}
                  />
                </CardBody>
                <CardFooter />
              </Card>
            </GridItem>
          );
        })}
    </GridContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  outerServices: makeSelectOuterServices(),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(OuterCharts);
