import GridLayout from 'react-grid-layout';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import { capitalize } from '../Util/String';
import { defaults } from '../config';
import { withNamespaces } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  selected: {
    border: '1px dashed #3f51b5',
    zIndex: 20
  },
  element: {
    overflow: 'hidden',
    transition: 'background-color 0.1s !important',
    '&:hover': {
      background: 'rgba(63, 81, 181, 0.3)',
      border: '1px dashed #007899'
    },
    '& .react-resizable-handle': {
      display: 'none'
    }
  },
  transformHelpers: {
    border: '1px solid rgba(0, 0, 0, 0.1)'
  }
};

class LayoutEditor extends Component {
  constructor(props) {
    super(props);

    this.getComponentContent = this.getComponentContent.bind(this);
  }

  getComponentContent(i) {
    const { t, layout } = this.props;

    const meta = layout[this.props.parent.i].find(e => e.i === i).meta;

    if (!meta || !meta.tag || meta.tag.type !== 'text') {
      return meta.content ? { text: meta.content, tooltip: t('freeText') } : {};
    }

    const example = meta.tag.example;

    return {
      text: (!example || typeof example === typeof []) ? '' : example,
      tooltip: meta.tag.label
    };
  }

  render() {
    const parentId = this.props.parent.i;
    const { classes, bordersVisible } = this.props;

    if (!this.props.layout[parentId]) {
      return '';
    }

    let width = this.props.paperSize.width;
    const cellSize = 15;

    if (!['root', 'header', 'footer'].includes(parentId)) {
      const parentElement = document.querySelector('#component-' + parentId);

      if (!parentElement) {
        return '';
      }

      width = parentElement.offsetWidth;
    }

    const layout = this.props.layout[parentId];
    const cols   = width / cellSize;

    let layoutMode = this.props.layoutMode;

    if (!layoutMode) {
      if (['root', 'header', 'footer'].includes(parentId)) {
        layoutMode = this.props.page.layoutRelative ? 'relative' : 'absolute';
      } else {
        layoutMode = this.props.parent.meta.layoutRelative ? 'relative' : 'absolute';
      }
    }

    return(
      <GridLayout
        layout={layout}
        cols={width / cellSize}
        rowHeight={cellSize}
        width={width}
        maxRows={this.props.parent.h}
        containerPadding={[0, 0]}
        isDraggable={parentId === this.props.selectedGroupId}
        margin={[0, 0]}
        compactType={layoutMode === 'absolute' ? null : 'vertical'}
        preventCollision={layoutMode === 'absolute'}
        onLayoutChange={layout => this.props.onChangeLayout(layout, parentId)}
      >
        {layout.map(
          e => {
            let className = this.props.selectedUuid === e.i ? classes.selected : classes.element;

            bordersVisible && (className += ' ' + classes.transformHelpers);

            const content = this.getComponentContent(e.i);
            const { meta } = e;

            const fontStyle = meta.fontStyle || [];

            const textStyle = {
              position: 'absolute',
              textAlign: meta.horizontalAlignment,
              width: '100%',
              fontFamily: meta.fontFamily,
              fontSize: Number(meta.fontSize || 16),
              color: meta.color,
              fontStyle: fontStyle.includes('italic') ? 'italic' : null,
              fontWeight: fontStyle.includes('bold') ? 'bold' : 'normal',
              textDecoration: fontStyle.includes('underline') ? 'underline' : null
            };

            const containerStyle = {
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
            };

            const borderWidth = meta.borderWidth || defaults.border.width;
            const borderColor = meta.borderColor || defaults.border.color;

            (meta.border || [])
              .forEach(border => containerStyle[`border${capitalize(border)}`] = `${borderWidth}px solid ${borderColor}`);

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

            let imageContent = e.meta.image &&
              <img alt='' src={e.meta.image} style={{ width: '100%' }} draggable={false} />
            ;

            if (e.meta.tag && e.meta.tag.type === 'image') {
              imageContent = (
                <img alt='' src={e.meta.tag.example} style={{ width: '100%' }} draggable={false} />
              );
            }

            return (
              <div
                id={'component-' + e.i}
                className={className}
                key={e.i}
                data-grid={e}
                onClick={(event) => event.stopPropagation() || this.props.onSelectElement(e.i)}
                onDragEnd={e => e.stopPropagation()}
                style={containerStyle}
              >
                <Tooltip title={content.tooltip || ''}>
                  <span style={textStyle}>
                    {content.text}
                    {imageContent}
                  </span>
                </Tooltip>

                <LayoutEditor {...this.props} parent={e} layoutMode={null} />
              </div>
            );
          })
        }
      </GridLayout>
    );
  }
}

LayoutEditor.propTypes = {
  bordersVisible: PropTypes.bool.isRequired,
  layout: PropTypes.object.isRequired,
  layoutMode: PropTypes.string,
  onChangeLayout: PropTypes.func.isRequired,
  onClearHistory: PropTypes.func.isRequired,
  onDoConfigure: PropTypes.func.isRequired,
  onSelectElement: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  selectedUuid: PropTypes.string,
};

export default withNamespaces()(withStyles(styles)(LayoutEditor));
