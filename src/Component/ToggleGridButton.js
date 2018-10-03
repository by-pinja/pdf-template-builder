import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import GridOn from '@material-ui/icons/GridOn';
import GridOff from '@material-ui/icons/GridOff';
import PropTypes from 'prop-types';

class ToggleGridButton extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.onChangeGridVisibility(!this.props.gridVisible);
  }

  render() {
    const title = this.props.gridVisible ? 'Hide grid' : 'Show grid';
    const icon  = this.props.gridVisible ? <GridOff /> : <GridOn />;
    return (
      <Tooltip title={title}>
        <div>
          <IconButton
            color="inherit"
            aria-label={title}
            onClick={this.handleToggle}
          >
            {icon}
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

ToggleGridButton.propTypes = {
  gridVisible: PropTypes.bool.isRequired,
  onChangeGridVisibility: PropTypes.func.isRequired
};

export default ToggleGridButton;
