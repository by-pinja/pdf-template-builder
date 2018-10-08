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
import { withNamespaces } from 'react-i18next';

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
    const { element, t } = this.props;
    const { popperOpen, popperRef } = this.state;

    if (!element) {
      return '';
    }

    const popperId = popperOpen ? 'color-popper' : null;

    return (
      <Grid container direction="row" spacing={8} item xs={12}>
        <Grid item container xs={7} spacing={8} justify="flex-start">
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

          <Grid item xs={12}>
            <ToggleButtonGroup
              value={element.fontStyle}
              onChange={this.handleChange('fontStyle')}
            >
              <ToggleButton value="bold">
                <Tooltip title={t('common.bold')}>
                  <FormatBoldIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="italic">
                <Tooltip title={t('common.italic')}>
                  <FormatItalicIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="underline">
                <Tooltip title={t('common.underline')}>
                  <FormatUnderlinedIcon />
                </Tooltip>
              </ToggleButton>

              <ClickAwayListener onClickAway={this.handleClickAway}>
                <div style={{ display: 'inline-block' }}>
                  <ToggleButton value="color" onClick={this.handleColorPopper}>
                    <Tooltip title={t('common.color')}>
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

        <Grid item container direction="row" xs={5} spacing={8}>
          <Grid item>
            <ToggleButtonGroup
              value={element.horizontalAlignment || 'left'}
              exclusive
              onChange={this.handleChange('horizontalAlignment')}
            >
              <ToggleButton value="left">
                <Tooltip title={t('common.align.left')}>
                  <FormatAlignLeftIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="center">
                <Tooltip title={t('common.align.center')}>
                  <FormatAlignCenterIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="right">
                <Tooltip title={t('common.align.right')}>
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
                <Tooltip title={t('common.align.top')}>
                  <VerticalAlignTopIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="middle">
                <Tooltip title={t('common.align.middle')}>
                  <VerticalAlignMiddleIcon />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="bottom">
                <Tooltip title={t('common.align.bottom')}>
                  <VerticalAlignBottomIcon />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ElementStyle.propTypes = {
  element: PropTypes.object,
  onUpdateElement: PropTypes.func.isRequired
};

export default withNamespaces()(withStyles(styles)(ElementStyle));