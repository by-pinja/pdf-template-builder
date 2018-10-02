import React, { Component } from 'react';
import Tooltip from '@material-ui/core/es/Tooltip/Tooltip';
import GridLayout from 'react-grid-layout';

class LayoutEditor extends Component {
  constructor(props) {
    super(props);

    this.getComponentContent = this.getComponentContent.bind(this);
  }

  getComponentContent(i) {
    const schema = this.props.schema;

    const meta = this.props.layout[this.props.parentId].find(e => e.i === i).meta;

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
    const cols = 12;

    if (!this.props.layout[this.props.parentId]) {
      return '';
    }

    const parentElement = document.querySelector('#component-' + this.props.parentId);

    if (!parentElement) {
      return '';
    }

    const width = parentElement.offsetWidth;

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
        compactType={null}
        preventCollision={true}
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

export default LayoutEditor;
