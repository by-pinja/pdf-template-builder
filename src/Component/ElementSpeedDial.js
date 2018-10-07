import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon/SpeedDialIcon';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import TextFields from '@material-ui/icons/TextFields';
import GroupIcon from '@material-ui/icons/BrandingWatermark';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction/SpeedDialAction';

const styles = theme => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 100
  },
});

const actions = [
  { icon: <AddPhotoAlternate />, name: 'Image' },
  { icon: <TextFields />, name: 'Text' },
  { icon: <GroupIcon />, name: 'Group' },
];

class ElementSpeedDial extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      open: false
    };
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClick = action => () => {
    this.setState(state => ({
      open: !state.open,
    }));

    this.props.onAddElement(
      this.props.selectedUuid,
      action.toLowerCase()
    );
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.speedDial}>
        <SpeedDial
          ariaLabel="Element speed dial"
          icon={<SpeedDialIcon openIcon={<TextFields />} />}
          onBlur={this.handleClose}
          onClick={this.handleClick('Text')}
          onClose={this.handleClose}
          onFocus={this.handleOpen}
          onMouseEnter={this.handleOpen}
          onMouseLeave={this.handleClose}
          open={open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipPlacement="left"
              tooltipOpen
              onClick={this.handleClick(action.name)}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

export default withStyles(styles)(ElementSpeedDial);
