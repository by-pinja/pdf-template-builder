import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';
import PageTools from './PageTools';
import ElementTools from './ElementTools';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core/styles';
import update from 'immutability-helper';
import TemplateBuilder from './Util/TemplateBuilder';
import Button from '@material-ui/core/Button/Button';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import TemplateUtil from './Util/TemplateUtil';
import Schema from './Resource/Schema';

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

    this.onLayoutChange      = this.onLayoutChange.bind(this);
    this.onSelectElement     = this.onSelectElement.bind(this);
    this.onElementChange     = this.onElementChange.bind(this);
    this.onAddElement        = this.onAddElement.bind(this);
    this.onDeleteElement     = this.onDeleteElement.bind(this);
    this.getTemplateHtml     = this.getTemplateHtml.bind(this);
    this.handleShowPreview   = this.handleShowPreview.bind(this);
    this.getComponentContent = this.getComponentContent.bind(this);

    this.state = {
      layout: [],
      elements: {},
      element: null
    };
  }

  componentDidMount() {
    this.configureEnv();
  }

  configure(props) {
    this.setState({
      pdfStorageUri: props.pdfStorageUri,
      schema: props.schema
    });
  }

  getTemplateHtml() {
    return TemplateBuilder.buildTemplate(this.state.layout, this.state.elements);
  }

  configureEnv() {
    const config = {};

    if (process.env.REACT_APP_PDF_STORAGE_URI) {
      config.pdfStorageUri = process.env.REACT_APP_PDF_STORAGE_URI;
    }

    if (process.env.NODE_ENV === 'development') {
      config.schema = new Schema().forExample();
    }
    
    this.configure(config);
  }

  onLayoutChange(layout) {
    this.setState({ layout });
  }

  onSelectElement(i) {
    if (!i) {
      return this.setState({
        element: null,
        selected: null
      });
    }

    this.setState({
      element: {
        ...this.state.elements[i],
        i
      },
      selected: i
    });
  }

  onElementChange(element) {
    const state = this.state;

    const newState = update(state, {
      elements: {
        [this.state.selected]: {
          $set: element
        }
      }
    });

    this.setState(newState);
  }

  onAddElement() {
    const state = this.state;

    const component = TemplateUtil.createComponent();

    this.setState(
      update(state, {
        layout: {
          $push: [component]
        },
        elements: {
          [component.i]: {
            $set: { content: '' }
          }
        }
      })
    );
  }

  onDeleteElement() {
    const state = this.state;
    const index = state.layout.findIndex(l => l.i === state.selected);

    this.setState(
      update(state, {
        layout: {
          $splice: [[index, 1]]
        },
        elements: {
          $unset: [state.selected]
        }
      })
    );

    this.onSelectElement(null);
  }

  handleShowPreview() {
    const data = {};

    this.state.schema.map(
      prop => data[prop.tag] = prop.example
    );

    fetch(this.state.pdfStorageUri, {
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
    const schema = this.state.schema;
    const meta = this.state.elements[i];

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

    if (this.state.pdfStorageUri) {
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
          <PageTools onAddElement={this.onAddElement} />

          <ElementTools
            element={this.state.element}
            schema={this.state.schema}
            onChangeElement={this.onElementChange}
            onDeleteElement={this.onDeleteElement}
          />
        </div>

        <Paper
          className={classes.editor}
          elevation={1}
        >
          <GridLayout
            onLayoutChange={this.onLayoutChange}
            cols={12}
            rowHeight={30}
            width={595}
            compactType={null}
            preventCollision={true}
          >
            {this.state.layout.map(
              e => {
                const classes = this.state.selected === e.i ? 'active' : '';
                const content = this.getComponentContent(e.i);

                return (
                  <div
                    id={'component-' + e.i}
                    className={classes}
                    key={e.i}
                    data-grid={e}
                    onClick={() => this.onSelectElement(e.i)}
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

export default withStyles(styles)(PdfTemplateBuilder);
