import React, { Component } from 'react';
import Tooltip from '@material-ui/core/es/Tooltip/Tooltip';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import Redo from '@material-ui/icons/Redo';
import PropTypes from 'prop-types';

class RedoButton extends Component {
  render() {
    return (
      <Tooltip title="Redo">
        <div>
          <IconButton
            color="inherit"
            aria-label="Redo"
            onClick={this.props.onRedo}
            disabled={!this.props.canRedo}
          >
            <Redo />
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

RedoButton.propTypes = {
  canRedo: PropTypes.bool.isRequired,
  onRedo: PropTypes.func.isRequired
};

export default RedoButton;
