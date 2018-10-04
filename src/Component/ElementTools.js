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
import SettingTextAlignContainer from '../Container/SettingTextAlignContainer';
import SettingTextFontContainer from '../Container/SettingTextFontContainer';
import NoteAdd from '@material-ui/icons/NoteAdd';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import FormGroup from '@material-ui/core/FormGroup/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Switch from '@material-ui/core/Switch/Switch';
import MaterialSelect from './MaterialSelect';

const styles = theme => ({
  actionButton: {
    float: 'right',
    marginLeft: theme.spacing.unit
  },
  card: {
    marginTop: theme.spacing.unit * 2,
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
      const element = {
        ...this.props.element,
        image: reader.result
      };

      this.props.onUpdateElement(element);
    };

    reader.onerror = console.error;
  };

  render() {
    const { classes } = this.props;

    if (!this.props.element) {
      return '';
    }

    const toLabel = schema => ({
      label: schema.text,
      value: schema.tag,
      type: schema.type,
      example: schema.example
    });

    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={16} direction="column">
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="headline">
                Element settings

                <Tooltip title="Delete this element">
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

                <Tooltip title="Add new element">
                  <Button
                    variant="fab"
                    color="primary"
                    aria-label="Add"
                    mini={true}
                    onClick={() => this.props.onAddElement(this.props.element.i)}
                    className={classes.actionButton}
                  >
                    <NoteAdd/>
                  </Button>
                </Tooltip>
              </Typography>
            </Grid>

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

            <Grid item xs={6}>
              <input
                id="file-input"
                accept="image/*"
                type="file"
                style={{ display: 'none' }}
                onChange={this.handleImageUpload}
              />

              <label htmlFor="file-input">
                <Button variant="raised" color="primary" component="span">
                  <AddAPhoto className={classes.iconLeft} />
                  Upload image
                </Button>
              </label>
            </Grid>

            <Grid item xs={12} md={6}>
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

            <Grid item xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12} md={6}>
                  <SettingTextAlignContainer />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SettingTextFontContainer />
                </Grid>
              </Grid>
            </Grid>



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
  onUpdateElement: PropTypes.func.isRequired
};

export default withStyles(styles)(ElementTools);