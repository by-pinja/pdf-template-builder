import React, { Component } from 'react';
import Tooltip from '@material-ui/core/es/Tooltip/Tooltip';
import GridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';

class LayoutEditor extends Component {
  constructor(props) {
    super(props);

    this.getComponentContent = this.getComponentContent.bind(this);
  }

  getComponentContent(i) {
    const schema = this.props.schema;

    const meta = this.props.layout[this.props.parentId].find(e => e.i === i).meta;

    if (!meta || !meta.tag) {
      return meta.content ? { text: meta.content, tooltip: 'Free text' } : {};
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
    const cols = 12;

    if (!this.props.layout[this.props.parentId]) {
      return '';
    }

    // Paper width, TODO: refactor when add support for different page sizes
    let width = 595;

    if (this.props.parentId !== 'root') {
      const parentElement = document.querySelector('#component-' + this.props.parentId);

      if (!parentElement) {
        return '';
      }

      width = parentElement.offsetWidth;
    }

    let layout = 'absolute';

    if (this.props.parentId === 'root') {
      layout = this.props.page.layoutRelative ? 'relative' : layout;
    }

    return(
      <GridLayout
        layout={this.props.layout[this.props.parentId]}
        cols={cols}
        rowHeight={30}
        width={width}
        maxRows={this.props.maxRows}
        containerPadding={[0, 0]}
        isDraggable={this.props.parentId === this.props.selectedGroupId}
        margin={[0, 0]}
        compactType={layout === 'absolute' ? null : 'vertical'}
        preventCollision={layout === 'absolute'}
        onLayoutChange={layout => this.props.onChangeLayout(layout, this.props.parentId)}
      >
        {this.props.layout[this.props.parentId].map(
          e => {
            const classes = this.props.selectedUuid === e.i ? 'active' : '';
            const content = this.getComponentContent(e.i);
            const { meta } = e;

            const textStyle = {
              position: 'absolute',
              textAlign: meta.horizontalAlignment,
              width: '100%',
              fontFamily: meta.fontFamily,
              fontSize: Number(meta.fontSize || 16)
            };

            if (meta.verticalAlignment === 'middle') {
              textStyle.top = '50%';
              textStyle.transform = 'translateY(-50%)'
            } else if (meta.verticalAlignment === 'bottom') {
              textStyle.bottom = 0;
            }

            if (layout === 'relative') {
              e.w = cols;
              e.minW = cols;
            } else {
              delete e.minW;
            }

            return (
              <div
                id={'component-' + e.i}
                className={classes}
                key={e.i}
                data-grid={e}
                onClick={(event) => event.stopPropagation() || this.props.onSelectElement(e.i)}
                onDragEnd={e => e.stopPropagation()}
                style={{ boxSizing: 'border-box'}}
              >
                <Tooltip title={content.tooltip || ''}>
                  <span style={textStyle}>
                    {content.text}
                  </span>
                </Tooltip>

                <LayoutEditor {...this.props} parentId={e.i} maxRows={e.h} />
              </div>
            );
          })
        }
      </GridLayout>
    );
  }
}

LayoutEditor.propTypes = {
  selectedUuid: PropTypes.string,
  layout: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
  onSelectElement: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
  onDoConfigure: PropTypes.func.isRequired,
  onDeleteElement: PropTypes.func.isRequired,
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired
};

export default LayoutEditor;
