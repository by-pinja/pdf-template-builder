import React, { Component } from 'react';
import Card from '@material-ui/core/Card/Card';
import Typography from '@material-ui/core/Typography/Typography';
import CardContent from '@material-ui/core/CardContent/CardContent';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Delete from '@material-ui/icons/Delete';
import FileCopy from '@material-ui/icons/FileCopy';
import PropTypes from 'prop-types'
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import MaterialSelect from './MaterialSelect';
import ElementStyleContainer from '../Container/ElementStyleContainer';
import { capitalize } from '../Util/String';
import { scaleWidthTo, getSizeOf } from '../Util/Image';
import { withNamespaces } from 'react-i18next';

const styles = theme => ({
  actionButton: {
    marginLeft: theme.spacing.unit
  },
  actionButtonGroup: {
    display: 'flex',
  },
  card: {
    overflow: 'visible'
  },
  select: {
    width: '100%'
  },
  iconLeft: {
    marginRight: theme.spacing.unit
  },
  settingGroup: {
    flexBasis: 'auto'
  }
});

class ElementTools extends Component {
  constructor(props) {
    super(props);

    this.handleChange         = this.handleChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleImageUpload    = this.handleImageUpload.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!props.element || (this.props.element && this.props.element.i === props.element.i)) {
      return;
    }

    // Automatically open the image input
    if (
      props.element.type === 'image' &&
      !props.element.image &&
      (!props.element.tag || !props.element.tag.type === 'image')
    ) {
      setTimeout(() => this.fileInput.click());
    }
  }

  handleChange = name => event => {
    const element = {
      ...this.props.element, 
      [name]: (event.target ? event.target.value : (event.length !== undefined ? null : event))
    };

    this.props.onUpdateElement(element);
  };

  handleChangeCheckbox = name => event => {
    const element = {
      ...this.props.element,
      [name]: event.target.checked
    };

    this.props.onUpdateElement(element);
  };

  handleImageUpload = event => {
    if (!event.target.files.length) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      getSizeOf(reader.result, size => {
        const element = {
          ...this.props.element,
          image: reader.result
        };

        // Scale image container down or up to some proper size
        const { width, height } = scaleWidthTo(10, size);

        this.props.onResizeElement(element.i, width, height);
        this.props.onUpdateElement(element);
      });
    };

    reader.onerror = console.error;
  };

  render() {
    const { classes, element, t, schema } = this.props;

    if (!element) {
      return '';
    }

    let selectedOption = null;

    if (element.tag) {
      // Flatten the grouped schema and find the matching prop
      selectedOption = [].concat.apply([], schema.map(({ options }) => options))
        .find(({tag}) => tag === element.tag.value) || null
      ;
    }

    const isImage = element.type === 'image';
    const isGroup = element.type === 'group';
    const isText  = element.type === 'text';
    const isSelection = element.type === 'selection';

    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={16} direction="column">
            <Grid container item xs={12} direction="row" justify="space-between" wrap="nowrap" className={classes.settingGroup}>
              <Typography color="textSecondary" variant="headline">
                {t('elementSettings', { type: capitalize(t(element.type)) })}
                </Typography>

                {!element.required && (
                  <div className={classes.actionButtonGroup}>
                    <Tooltip title={t('duplicateThisElement', { type: t(element.type).toLowerCase() })}>
                      <Button
                        variant="fab"
                        color="secondary"
                        aria-label="Duplicate"
                        mini={true}
                        className={classes.actionButton}
                        onClick={() => this.props.onDuplicateElement(element)}
                      >
                        <FileCopy/>
                      </Button>
                    </Tooltip>

                    <Tooltip title={t('deleteThisElement', { type: t(element.type).toLowerCase() })}>
                      <Button
                        variant="fab"
                        color="secondary"
                        aria-label="Remove"
                        mini={true}
                        className={classes.actionButton}
                        onClick={() => this.props.onRemoveElement(element.i)}
                      >
                        <Delete/>
                      </Button>
                    </Tooltip>
                  </div>
                )}
            </Grid>

            {(isText || isGroup || isSelection) && (
              <Grid item xs={12} className={classes.settingGroup}>
                <ElementStyleContainer />
              </Grid>
            )}

            {isGroup && (
              <Grid item xs={12} className={classes.settingGroup}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.props.element.layoutRelative}
                        onChange={this.handleChangeCheckbox('layoutRelative')}
                        value="layoutRelative"
                      />
                    }
                    label={t('layoutRelative')}
                  />
                </FormGroup>
              </Grid>
            )}

            {isImage && (
              <Grid item xs={6} className={classes.settingGroup}>
                <input
                  id="file-input"
                  accept="image/*"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={this.handleImageUpload}
                  ref={input => this.fileInput = input}
                />

                <label htmlFor="file-input">
                  <Button variant="raised" color="primary" component="span">
                    <AddAPhoto className={classes.iconLeft} />
                    {t('uploadImage')}
                  </Button>
                </label>
              </Grid>
            )}

            {!isSelection &&
              <Grid item xs={12} className={classes.settingGroup}>
                <MaterialSelect
                  id="tag"
                  label={t('bindToProperty')}
                  className={classes.select}
                  value={selectedOption}
                  getOptionLabel={({ text }) => text}
                  getOptionValue={({ tag }) => tag}
                  onChange={({ tag }) => this.handleChange('tag')(tag ? { value: tag } : [])}
                  placeholder={t('bindToProperty')}
                  options={schema}
                />
              </Grid>
            }

            {isText && (
              <Grid item xs={12} className={classes.settingGroup}>
                <TextField
                  id="content"
                  label={t('content')}
                  className={classes.select}
                  value={this.props.element.content || ''}
                  onChange={this.handleChange('content')}
                  margin="normal"
                  multiline
                />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

ElementTools.propTypes = {
  element: PropTypes.object,
  schema: PropTypes.array.isRequired,
  onRemoveElement: PropTypes.func.isRequired,
  onUpdateElement: PropTypes.func.isRequired,
  onResizeElement: PropTypes.func.isRequired,
  onDuplicateElement: PropTypes.func.isRequired,
};

export default withNamespaces()(withStyles(styles)(ElementTools));