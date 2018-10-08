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
import PropTypes from 'prop-types'
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import MaterialSelect from './MaterialSelect';
import ElementStyleContainer from '../Container/ElementStyleContainer';
import { capitalize } from '../Util/String';
import { scaleWidthTo, getSizeOf } from '../Util/Image';

const styles = theme => ({
  actionButton: {
    float: 'right',
    marginLeft: theme.spacing.unit
  },
  card: {
    overflow: 'visible'
  },
  select: {
    width: '100%'
  },
  iconLeft: {
    marginRight: theme.spacing.unit
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
    if (props.element.type === 'image' && !props.element.image) {
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
    const { classes, element } = this.props;

    if (!element) {
      return '';
    }

    const toLabel = schema => ({
      label: schema.text,
      value: schema.tag,
      type: schema.type,
      example: schema.example
    });

    const isImage = element.type === 'image';
    const isGroup = element.type === 'group';
    const isText  = element.type === 'text';

    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={16} direction="column">
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="headline">
                {capitalize(element.type)} settings

                <Tooltip title={`Delete this ${element.type}`}>
                  <Button
                    variant="fab"
                    color="secondary"
                    aria-label="Remove"
                    mini={true}
                    className={classes.actionButton}
                    onClick={this.props.onRemoveElement}
                  >
                    <Delete/>
                  </Button>
                </Tooltip>
              </Typography>
            </Grid>

            {(isText || isGroup) && (
              <Grid item xs={12}>
                <ElementStyleContainer />
              </Grid>
            )}

            {isGroup && (
              <Grid item xs={12}>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.props.element.layoutRelative}
                        onChange={this.handleChangeCheckbox('layoutRelative')}
                        value="layoutRelative"
                      />
                    }
                    label="Use relative layout"
                  />
                </FormGroup>
              </Grid>
            )}

            {isImage && (
              <Grid item xs={6}>
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
                    Upload image
                  </Button>
                </label>
              </Grid>
            )}

            {isText && (
              <Grid item xs={12}>
                <MaterialSelect
                  id="tag"
                  label="Bind to property"
                  className={classes.select}
                  value={this.props.element.tag || null}
                  onChange={this.handleChange('tag')}
                  options={
                    this.props.schema
                      .map(group => ({ label: group.label, options: group.options.map(toLabel)}))
                  }
                />
              </Grid>
            )}

            {isText && (
              <Grid item xs={12}>
                <TextField
                  id="content"
                  label="Content"
                  className={classes.select}
                  value={this.props.element.content || ''}
                  onChange={this.handleChange('content')}
                  margin="normal"
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
};

export default withStyles(styles)(ElementTools);