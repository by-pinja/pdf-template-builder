import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/IconButton/IconButton';
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next';

class PreviewButton extends Component {
  constructor(props) {
    super(props);

    this.preview = this.preview.bind(this);
  }

  preview() {
    fetch(this.props.pdfStorageUri, {
      method: 'POST',
      headers: {
        Authorization: 'ApiKey apikeyfortesting',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        html: this.props.templateHtml(),
        baseData: this.props.templateData,
        rowData: [{}],
        options: this.props.exportTemplate().options
      })
    })
      .then(res => res.json())
      .then(res => {
        window.open(res[0].pdfUri, '_blank');
      })
    ;
  }

  render() {
    if (!this.props.pdfStorageUri) {
      return '';
    }

    const { t } = this.props;

    return (
      <Tooltip title={t('showPreview')}>
        <IconButton
          color="inherit"
          aria-label={t('showPreview')}
          onClick={this.preview}
        >
          <RemoveRedEye/>
        </IconButton>
      </Tooltip>
    );
  }
}

PreviewButton.propTypes = {
  pdfStorageUri: PropTypes.string,
  templateHtml: PropTypes.func.isRequired,
  templateData: PropTypes.object.isRequired,
  exportTemplate: PropTypes.func.isRequired
};

export default withNamespaces()(PreviewButton);
