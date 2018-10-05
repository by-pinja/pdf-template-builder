import React, { Component } from 'react';
import Grid from '@material-ui/core/es/Grid/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/es/Paper/Paper';
import Fade from '@material-ui/core/es/Fade/Fade';
import Popper from '@material-ui/core/es/Popper/Popper';
import { SketchPicker } from 'react-color';
import ClickAwayListener from '@material-ui/core/es/ClickAwayListener/ClickAwayListener';

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
      <Grid container direction="row" className={classes.root} spacing={8}>
        <Grid item>
          <ToggleButtonGroup
            value={element.horizontalAlignment || 'left'}
            exclusive
            onChange={this.handleChange('horizontalAlignment')}
          >
            <ToggleButton value="left">
              <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center">
              <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right">
              <FormatAlignRightIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item>
          <ToggleButtonGroup
            value={element.fontStyle}
            onChange={this.handleChange('fontStyle')}
          >
            <ToggleButton value="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underline">
              <FormatUnderlinedIcon />
            </ToggleButton>

            <ClickAwayListener onClickAway={this.handleClickAway}>
              <div style={{ display: 'inline-block' }}>
                <ToggleButton value="color" onClick={this.handleColorPopper}>
                  <FormatColorFillIcon />
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
    );
  }
}

ElementStyle.propTypes = {
  element: PropTypes.object,
  onUpdateElement: PropTypes.func.isRequired
};

export default withStyles(styles)(ElementStyle);