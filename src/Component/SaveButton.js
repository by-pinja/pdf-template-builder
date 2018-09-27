import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Save from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

class SaveButton extends Component {
  render() {
    if (!this.props.onSaveTemplate) {
      return '';
    }

    return (
      <Tooltip title="Save">
        <div>
          <IconButton
            color="inherit"
            aria-label="Save"
            onClick={this.props.onSaveTemplate}
          >
            <Save />
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

SaveButton.propTypes = {
  onSaveTemplate: PropTypes.func
};

export default SaveButton;
