import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import VerticalAlignMiddleIcon from '@material-ui/icons/VerticalAlignCenter';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper/Paper';
import Fade from '@material-ui/core/Fade/Fade';
import Popper from '@material-ui/core/Popper/Popper';
import { SketchPicker } from 'react-color';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/ClickAwayListener';
import FontSelector from './FontSelector';
import TextField from '@material-ui/core/TextField/TextField';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 2
  }
});

class ElementStyle extends Component {
  constructor(props) {
    super(props);

    this.handleChange      = this.handleChange.bind(this);
    this.handleColorPopper = this.handleColorPopper.bind(this);
    this.handleClickAway   = this.handleClickAway.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);

    this.state = { popperOpen: false };
  }

  handleChange = name => (event, value) => {
    const element = {
      ...this.props.element,
      [name]: value
    };

    this.props.onUpdateElement(element);
  };

  handleEventChange = name => event => {
    this.handleChange(name)(event, event.target.value);
  };

  handleColorPopper = event => {
    event.persist();

    this.setState({
      popperOpen: !this.state.popperOpen,
      popperRef: event.target
    });
  };

  handleColorChange = (color, event) => {
    this.handleChange('color')(event, color.hex);
  };

  handleClickAway = () => {
    this.setState({
      popperOpen: false
    });
  };

  render() {
    const { element, classes } = this.props;
    const { popperOpen, popperRef } = this.state;

    if (!element) {
      return '';
    }

    const popperId = popperOpen ? 'color-popper' : null;

    return (
      <Card className={classes.root}>
        <CardContent>
          <Grid container direction="row" spacing={8}>
            <Grid item container xs={6} spacing={8} justify="flex-start">
              <Grid item xs={12} container spacing={8}>
                <Grid item style={{ width: '150px' }}>
                  <FontSelector
                    value={element.fontFamily}
                    onChange={this.handleEventChange('fontFamily')}
                    style={{ width: '100%' }}
                  />
                </Grid>

                <Grid item style={{ width: '50px' }}>
                  <TextField
                    id="fontSize"
                    type="number"
                    value={this.props.element.fontSize || 12}
                    onChange={this.handleEventChange('fontSize')}
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>

              <Grid item>
                <ToggleButtonGroup
                  value={element.fontStyle}
                  onChange={this.handleChange('fontStyle')}
                >
                  <ToggleButton value="bold">
                    <Tooltip title="Bold">
                      <FormatBoldIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="italic">
                    <Tooltip title="Italic">
                      <FormatItalicIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="underline">
                    <Tooltip title="Underline">
                      <FormatUnderlinedIcon />
                    </Tooltip>
                  </ToggleButton>

                  <ClickAwayListener onClickAway={this.handleClickAway}>
                    <div style={{ display: 'inline-block' }}>
                      <ToggleButton value="color" onClick={this.handleColorPopper}>
                        <Tooltip title="Text color">
                          <FormatColorTextIcon />
                        </Tooltip>
                        <ArrowDropDownIcon />
                      </ToggleButton>
                      <Popper
                        id={popperId}
                        style={{ zIndex: 100 }}
                        open={popperOpen}
                        disablePortal={true}
                        anchorEl={popperRef}
                        transition
                      >
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={150}>
                            <Paper>
                              <SketchPicker
                                color={element.color || '#000'}
                                onChange={this.handleColorChange}
                              />
                            </Paper>
                          </Fade>
                        )}
                      </Popper>
                    </div>
                  </ClickAwayListener>
                </ToggleButtonGroup>
              </Grid>
            </Grid>

            <Grid item container direction="row" xs={6} spacing={8} justify="flex-end">
              <Grid item>
                <ToggleButtonGroup
                  value={element.horizontalAlignment || 'left'}
                  exclusive
                  onChange={this.handleChange('horizontalAlignment')}
                >
                  <ToggleButton value="left">
                    <Tooltip title="Align left">
                      <FormatAlignLeftIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="center">
                    <Tooltip title="Align center">
                      <FormatAlignCenterIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="right">
                    <Tooltip title="Align right">
                      <FormatAlignRightIcon />
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>

              <Grid item>
                <ToggleButtonGroup
                  value={element.verticalAlignment || 'top'}
                  exclusive
                  onChange={this.handleChange('verticalAlignment')}
                >
                  <ToggleButton value="top">
                    <Tooltip title="Align top">
                      <VerticalAlignTopIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="middle">
                    <Tooltip title="Align middle">
                      <VerticalAlignMiddleIcon />
                    </Tooltip>
                  </ToggleButton>
                  <ToggleButton value="bottom">
                    <Tooltip title="Align bottom">
                      <VerticalAlignBottomIcon />
                    </Tooltip>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

ElementStyle.propTypes = {
  element: PropTypes.object,
  onUpdateElement: PropTypes.func.isRequired
};

export default withStyles(styles)(ElementStyle);