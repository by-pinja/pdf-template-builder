import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import GridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';

class LayoutEditor extends Component {
  constructor(props) {
    super(props);

    this.getComponentContent = this.getComponentContent.bind(this);
  }

  getComponentContent(i) {
    const meta = this.props.layout[this.props.parent.i].find(e => e.i === i).meta;

    if (!meta || !meta.tag) {
      return meta.content ? { text: meta.content, tooltip: 'Free text' } : {};
    }

    const example = meta.tag.example;

    return {
      text: (!example || typeof example === typeof []) ? '' : example,
      tooltip: meta.tag.label
    };
  }

  render() {
    const cols = 12;

    if (!this.props.layout[this.props.parent.i]) {
      return '';
    }

    // Paper width, TODO: refactor when add support for different page sizes
    let width = 595;

    if (this.props.parent.i !== 'root') {
      const parentElement = document.querySelector('#component-' + this.props.parent.i);

      if (!parentElement) {
        return '';
      }

      width = parentElement.offsetWidth;
    }

    const layout = this.props.layout[this.props.parent.i];

    let layoutMode = 'absolute';

    if (this.props.parent.i === 'root') {
      layoutMode = this.props.page.layoutRelative ? 'relative' : layoutMode;
    } else {
      layoutMode = this.props.parent.meta.layoutRelative ? 'relative' : layoutMode;
    }

    return(
      <GridLayout
        layout={layout}
        cols={cols}
        rowHeight={30}
        width={width}
        maxRows={this.props.parent.h}
        containerPadding={[0, 0]}
        isDraggable={this.props.parent.i === this.props.selectedGroupId}
        margin={[0, 0]}
        compactType={layoutMode === 'absolute' ? null : 'vertical'}
        preventCollision={layoutMode === 'absolute'}
        onLayoutChange={layout => this.props.onChangeLayout(layout, this.props.parent.i)}
      >
        {this.props.layout[this.props.parent.i].map(
          e => {
            const classes = this.props.selectedUuid === e.i ? 'active' : '';
            const content = this.getComponentContent(e.i);
            const { meta } = e;

            const textStyle = {
              position: 'absolute',
              textAlign: meta.horizontalAlignment,
              width: '100%',
              fontFamily: meta.fontFamily,
              fontSize: Number(meta.fontSize || 16),
              color: meta.color
            };

            if (meta.verticalAlignment === 'middle') {
              textStyle.top = '50%';
              textStyle.transform = 'translateY(-50%)'
            } else if (meta.verticalAlignment === 'bottom') {
              textStyle.bottom = 0;
            }

            if (layoutMode === 'relative') {
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

                <LayoutEditor {...this.props} parent={e} />
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
  parent: PropTypes.object.isRequired,
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
