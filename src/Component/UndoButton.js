import React, { Component } from 'react';
import Tooltip from '@material-ui/core/es/Tooltip/Tooltip';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import Undo from '@material-ui/icons/Undo';
import PropTypes from 'prop-types';

class UndoButton extends Component {
  render() {
    return (
      <Tooltip title="Undo">
        <div>
          <IconButton
            color="inherit"
            aria-label="Undo"
            onClick={this.props.onUndo}
            disabled={!this.props.canUndo}
          >
            <Undo />
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

UndoButton.propTypes = {
  canUndo: PropTypes.bool.isRequired,
  onUndo: PropTypes.func.isRequired
};

export default UndoButton;
