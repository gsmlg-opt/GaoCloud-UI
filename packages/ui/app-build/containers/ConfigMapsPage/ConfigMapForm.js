import React, { PureComponent, Fragment, useState,useEffect } from 'react';
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable.js';
import { FormattedMessage } from 'react-intl';
import getByKey from '../../../src/utils/getByKey';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-tomorrow_night';

import ListItem from '@mui/material/ListItem.js';
import Button from '@mui/material/Button.js';
import IconButton from '@mui/material/IconButton.js';
import Dialog from '@mui/material/Dialog.js';
import AddIcon from '@mui/icons-material/Add.js';
import DeleteIcon from '@mui/icons-material/Delete.js';

import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Danger from 'components/Typography/Danger.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import InputField from 'components/Field/InputField.js';
import MinusIcon from 'components/Icons/Minus.js';
import ReadOnlyInput from 'components/CustomInput/ReadOnlyInput.js';
import ConfirmDialog from 'components/Confirm/ConfirmDialog.js';

import messages from './messages';

const DataComponent = ({ meta, input, classes }) => {
  const [open, setOpen] = useState(false);
  const { touched, invalid, error } = meta;

  return (
    <div className={classes.fileContentButton}>
      <Button color="secondary"  onClick={() => setOpen(true)} className={classes.fileNameLink}>
        <FormattedMessage {...messages.formFileContent} />
      </Button>
      {touched && error && <Danger>{error}</Danger>}
      <Dialog
        maxWidth="lg"
        fullWidth
        disableBackdropClick
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{ style: { overflow: 'hidden' } }}
      >
        <Card className={classes.dialogCard}>
          <CardHeader color="light" className={classes.dialogHeader}>
            <h4>
              <FormattedMessage {...messages.formEditFile} />
            </h4>
          </CardHeader>
          <CardBody>
            <AceEditor
              focus
              mode="yaml"
              theme="tomorrow_night"
              value={input.value}
              height="calc(100vh - 225px)"
              width="calc(100vw - 200px)"
              onChange={(val, evt) => {
                input.onChange(val);
              }}
            />
          </CardBody>
          <CardFooter>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setOpen(false);
              }}
            >
              <FormattedMessage {...messages.formSetFile} />
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

const renderConfigs = ({ fields, meta: { error, submitFailed }, classes }) => (
  <Fragment>
    <GridContainer>
      <GridItem xs={3} sm={3} md={3} className={classes.addNodeBtnWrap}>
        <Button
          className={classes.addNodeBtn}
          variant="contained" color="primary"
          onClick={(evt) => fields.push(fromJS({}))}
        >
          <AddIcon className={classes.plusIcon} />
          <FormattedMessage {...messages.formFiles} />
        </Button>
      </GridItem>
    </GridContainer>
    {submitFailed && error && (
      <ListItem>
        <Danger>{error}</Danger>
      </ListItem>
    )}
    <Card className={classes.addList} border={fields&&fields.length>0 ? 'border':null } >
      <CardBody>
        {fields.map((f, i) => (
          <GridContainer key={i}>
            <GridItem xs={4} sm={4} md={4}>
              <InputField
                name={`${f}.name`}
                label={<FormattedMessage {...messages.formFileName} />}
                fullWidth
              />
            </GridItem>
            <GridItem xs={2} sm={2} md={2}>
              <Field
                name={`${f}.data`}
                component={DataComponent}
                classes={classes}
              />
            </GridItem>
            <GridItem xs={3} sm={3} md={3}>
              <IconButton
                variant="contained"
                onClick={(evt) => fields.remove(i)}
                className={classes.minusIcon}
              >
                <MinusIcon />
              </IconButton>
            </GridItem>
          </GridContainer>
        ))}
      </CardBody>
    </Card>
  </Fragment>
);

const ConfigMapForm = ({
  clusters,
  handleSubmit,
  pristine,
  reset,
  submitting,
  error,
  classes,
  edit,
  initialValues,
  type,
  configMap,
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    if (error) {
      setOpenConfirm(true);
    }
  }, [error]);
  return (
    <form className={getByKey(classes, 'form')} onSubmit={handleSubmit}>
      <GridContainer>
        { error ? <ConfirmDialog
          open={openConfirm}
          onClose={() => {
            setOpenConfirm(false)
          }}
          content={<p className={classes.saveFaildText}>{getByKey(error, ['response', 'message'])}</p>}
          hideActions
          type="save"
          showCloseIcon
        />: null}
        <GridItem xs={3} sm={3} md={3} className={classes.formLine}>
          {type === 'create' ? (
            <InputField
              label={<FormattedMessage {...messages.formName} />}
              name="name"
              formControlProps={{
                className: classes.nameControl,
              }}
              inputProps={{
                type: 'text',
                autoComplete: 'off',
                disabled: edit,
              }}
              fullWidth
            />
          ) : (
            <ReadOnlyInput
              labelText={<FormattedMessage {...messages.formName} />}
              value={configMap ? initialValues.get('name') : ''}
              formControlProps={{
                className: classes.nameControl,
              }}
              fullWidth
            />
          )}
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <FieldArray
            name="configs"
            component={renderConfigs}
            classes={classes}
          />
        </GridItem>
      </GridContainer>
    </form>
  )
};

export default ConfigMapForm;
