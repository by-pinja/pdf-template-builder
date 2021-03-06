import GridOff from '@material-ui/icons/GridOff';
import GridOn from '@material-ui/icons/GridOn';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { withNamespaces } from 'react-i18next';

class ToggleGridButton extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.onChangeGridVisibility(!this.props.gridVisible);
  }

  render() {
    const { gridVisible, t } = this.props;

    const title = gridVisible ? t('hideGrid') : t('showGrid');
    const icon  = gridVisible ? <GridOff /> : <GridOn />;

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

export default withNamespaces()(ToggleGridButton);
