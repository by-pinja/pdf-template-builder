import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import PageToolsContainer from './../Container/PageToolsContainer';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import TemplateBuilder from './../Util/TemplateBuilder';
import Button from '@material-ui/core/Button/Button';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import PropTypes from 'prop-types'
import ElementToolsContainer from '../Container/ElementToolsContainer';

const styles = theme => ({
  toolbox: {
    marginRight: theme.spacing.unit * 2,
    flex: 1
  },
  editor: {
    minHeight: 848,
    width: 595,
    fontFamily: 'Open Sans'
  },
  previewButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  container: {
    display: 'flex',
    padding: 20,
    position: 'relative'
  }
});

class PdfTemplateBuilder extends Component {
  constructor(props) {
    super(props);

    this.getTemplateHtml     = this.getTemplateHtml.bind(this);
    this.handleShowPreview   = this.handleShowPreview.bind(this);
    this.getComponentContent = this.getComponentContent.bind(this);

    this.state = {};
  }

  configure(props) {
    this.props.onDoConfigure(props);
  }

  getTemplateHtml() {
    return TemplateBuilder.buildTemplate(
      this.props.layout,
      this.props.elements
    );
  }

  handleShowPreview() {
    const data = {};

    this.props.schema.map(
      prop => data[prop.tag] = prop.example
    );

    fetch(this.props.pdfStorageUri, {
      method: 'POST',
      headers: {
        Authorization: 'ApiKey apikeyfortesting',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        html: this.getTemplateHtml(),
        baseData: data,
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

  getComponentContent(i) {
    const schema = this.props.schema;
    const meta = this.props.elements[i];

    if (!meta || !meta.tag) {
      return {};
    }

    const prop = schema.find(prop => prop.tag === meta.tag);

    if (!prop) {
      return {};
    }

    return {
      text: prop.example,
      tooltip: prop.text
    };
  }

  render() {
    const { classes } = this.props;

    let previewButton = '';

    if (this.props.pdfStorageUri) {
      previewButton = (
        <Tooltip title="Preview">
          <Button
            variant="fab"
            color="primary"
            aria-label="Preview"
            mini={true}
            className={classes.previewButton}
            onClick={this.handleShowPreview}
          >
            <RemoveRedEye/>
          </Button>
        </Tooltip>
      );
    }

    return (
      <div className={classes.container}>
        <div className={classes.toolbox}>
          <PageToolsContainer />

          <ElementToolsContainer
            element={this.state.element}
            schema={this.state.schema}
            onChangeElement={this.onElementChange}
          />
        </div>

        <Paper
          className={classes.editor}
          elevation={1}
        >
          <GridLayout
            cols={12}
            rowHeight={30}
            width={595}
            compactType={null}
            preventCollision={true}
            onLayoutChange={this.props.onChangeLayout}
          >
            {this.props.layout.map(
              e => {
                const classes = this.state.selected === e.i ? 'active' : '';
                const content = this.getComponentContent(e.i);

                return (
                  <div
                    id={'component-' + e.i}
                    className={classes}
                    key={e.i}
                    data-grid={e}
                    onClick={() => this.props.onSelectElement(e.i)}
                    style={{ padding: 5, boxSizing: 'border-box'}}
                  >
                    <Tooltip title={content.tooltip || ''}>
                      <span>
                        {content.text}
                      </span>
                    </Tooltip>
                  </div>
                );
              })
            }
          </GridLayout>
        </Paper>

        {previewButton}
      </div>
    );
  }
}

PdfTemplateBuilder.propTypes = {
  onSelectElement: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
  onDoConfigure: PropTypes.func.isRequired
};

export default withStyles(styles)(PdfTemplateBuilder);
