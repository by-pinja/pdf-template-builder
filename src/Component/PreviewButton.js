import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next';

class PreviewButton extends Component {
  render() {
    const { t, onPreview, templateData, templateHtml, exportTemplate } = this.props;

    if (!onPreview) {
      return '';
    }

    return (
      <Tooltip title={t('showPreview')}>
        <IconButton
          color="inherit"
          aria-label={t('showPreview')}
          onClick={() => onPreview(templateHtml(), templateData, exportTemplate().options)}
        >
          <RemoveRedEye/>
        </IconButton>
      </Tooltip>
    );
  }
}

PreviewButton.propTypes = {
  onPreview: PropTypes.func,
  templateHtml: PropTypes.func.isRequired,
  templateData: PropTypes.object.isRequired,
  exportTemplate: PropTypes.func.isRequired,
};

export default withNamespaces()(PreviewButton);
