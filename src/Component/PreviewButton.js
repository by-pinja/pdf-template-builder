import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import IconButton from '@material-ui/core/es/IconButton/IconButton';
import PropTypes from 'prop-types'

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
        options: {}
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

    return (
      <Tooltip title="Preview">
        <IconButton
          color="inherit"
          aria-label="Preview"
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
  templateData: PropTypes.object.isRequired
};

export default PreviewButton;
