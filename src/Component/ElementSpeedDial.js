import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon/SpeedDialIcon';
import AddPhotoAlternate from '@material-ui/icons/AddPhotoAlternate';
import TextFields from '@material-ui/icons/TextFields';
import GroupIcon from '@material-ui/icons/BrandingWatermark';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction/SpeedDialAction';
import { withNamespaces } from 'react-i18next';
import TemplateUtil from '../Util/TemplateUtil';

const styles = theme => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 100
  },
});

const actions = [
  { icon: <AddPhotoAlternate />, name: 'Image', title: 'image' },
  { icon: <TextFields />, name: 'Text', title: 'text' },
  { icon: <GroupIcon />, name: 'Group', title: 'group' },
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

    const element = TemplateUtil.createComponent();
    element.meta.type = action.toLowerCase();

    this.props.onAddElement(element, this.props.selectedUuid);
  };

  render() {
    const { classes, t } = this.props;
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
              tooltipTitle={t(action.title)}
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

export default withNamespaces()(withStyles(styles)(ElementSpeedDial));
