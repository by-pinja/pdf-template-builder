import update from 'immutability-helper';
import uuid from 'uuid/v4';
import Schema from '../Resource/Schema';
import undoable, { excludeAction, groupByActionTypes } from 'redux-undo';
import { getElement, getSelectedElementGroupId } from './util';
import TemplateUtil from '../Util/TemplateUtil';
import PageSize from '../Resource/PageSize';

const initialState = getInitialState();

const store = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ELEMENT': {
      let parentId = action.payload.parentId || 'root';

      // Get closest element with type 'group'
      if (parentId !== 'root') {
        while (true) {
          const parentEl = getElement(parentId, state);

          if (parentId === 'root' || parentEl.meta.type === 'group') {
            break;
          }

          parentId = getSelectedElementGroupId(state, parentEl.i);
        }
      }

      if (!state.layout[parentId]) {
        state.layout[parentId] = [];
      }

      return update(
        {
          ...state,
          selectedUuids: [action.payload.element.i]
        },
        {
          layout: {
            [parentId]: {
              $push: [action.payload.element]
            }
          }
        }
      );
    }

    case 'DUPLICATE_ELEMENT': {
      const layout = {};
      const newElements = [];

      for (let elUuid of state.selectedUuids) {
        const original = getElement(elUuid, state);

        if (original.meta.required) {
          continue;
        }

        const groupId = getSelectedElementGroupId(state, elUuid);
        const element = Object.assign({}, original);
        element.i = uuid();
        // try to append it right below the original
        element.y += 1;

        layout[groupId] = layout[groupId] || {
          $push: []
        };

        layout[groupId].$push.push(element);
        newElements.push(element.i);
      }

      return update(state, {
        layout,
        selectedUuids: {
          $set: newElements
        }
      });
    }

    case 'RESIZE_ELEMENT': {
      const groupId = getSelectedElementGroupId(state);

      return update(state, {
        layout: {
          [groupId]: {
            [state.layout[groupId].findIndex(l => l.i === action.payload.i)]: {
              w: { $set: action.payload.width },
              h: { $set: action.payload.height }
            }
          }
        }
      });
    }

    case 'REMOVE_ELEMENT': {
      const layout = {};

      for (let uuid of state.selectedUuids) {
        if (getElement(uuid, state).meta.required) {
          continue;
        }

        const groupId = getSelectedElementGroupId(state, uuid);

        layout[groupId] = layout[groupId] || {
          $splice: []
        };
        
        const groupIndex = state.layout[groupId].findIndex(l => l.i === uuid);
        layout[groupId].$splice.push([groupIndex, 1]);
      }

      // $splice needs to be sorted by index desc so array indexes won't change when splicing
      for (let key of Object.keys(layout)) {
        layout[key].$splice.sort(
          (a, b) => b[0] - a[0]
        );
      }

      return update(state, {
        layout,
        selectedUuids: {
          $set: []
        }
      });
    }

    case 'UPDATE_ELEMENT': {
      const layout = {};

      Object.entries(state.layout)
      .forEach(([key, item]) => {
        item.forEach((element, idx) => {
          if (!state.selectedUuids.includes(element.i)) return;

          layout[key] = layout[key] || {};
          layout[key][idx] = {
            meta: {}
          };

          Object.entries(action.payload)
          .forEach(([prop, value]) => {
            // filter some props
            // empty string is used as a value when selection's elements' props differ from each other
            if ((prop !== 'content' && value === '') || prop === 'type') {
              return;
            }

            layout[key][idx].meta[prop] = {
              $set: value
            };
          });
        });
      });

      return update(state, {
        layout
      });
    }

    case 'SELECT_ELEMENT': {
      let uuid = action.payload.uuid;
      let selectedUuids;

      if (action.payload.ctrlKey) {
        if (state.selectedUuids.includes(uuid)) {
          selectedUuids = state.selectedUuids.slice();
          selectedUuids.splice(selectedUuids.indexOf(uuid), 1);
        } else {
          selectedUuids = state.selectedUuids.concat(uuid);
        }
      } else if (!uuid) {
        selectedUuids = [];
      } else {
        selectedUuids = [uuid];
      }

      return {...state, selectedUuids};
    }

    case 'SET_LAYOUT': {
      const newState = {
        ...state,
        layout: {
          ...state.layout,
          [action.payload.parentId]: action.payload.layout.map(component => {
            const index = state.layout[action.payload.parentId].findIndex(l => l.i === component.i);

            if (index >= 0) {
              return {...component, meta: state.layout[action.payload.parentId][index].meta};
            }

            return component;
          })
        }
      };

      // Return the same state if really nothing changed (history works better)
      if (JSON.stringify(state.layout) === JSON.stringify(newState.layout)) {
        return state;
      }

      return newState;
    }

    case 'IMPORT_TEMPLATE': {
      const initialState = getInitialState();

      return update(
        state,
        {
          layout: {
            $set: update(
              action.payload.layout,
              {
                header: {
                  $set: action.payload.layout.header || initialState.layout.header
                },
                footer: {
                  $set: action.payload.layout.footer || initialState.layout.footer
                }
              }
            )
          },
          page: {
            $set: action.payload.page || initialState.page
          },
          options: {
            $set: action.payload.options || initialState.options
          }
        }
      );
    }

    case 'CONFIGURE':
      return {
        ...state,
        schema: action.payload.schema || [],
        onPreview: action.payload.onPreview,
        onSaveTemplate: action.payload.onSaveTemplate,
        onChange: action.payload.onChange
      };

    case 'UPDATE_PAGE': {
      const paperSize = getPaperSize(state);
      const contentWidth = (paperSize.width - action.payload.border * 2) / 15;

      const obj = {};

      // update layout elements' widths if they're bigger than paper's width
      // only updating header's and footer's first children could be enough?
      Object.entries(state.layout)
      .forEach(([key, item]) => {
        item.forEach((element, idx) => {
          if (key === 'header' || key === 'footer' || element.w > contentWidth) {
            obj[key] = obj[key] || {};

            obj[key][idx] = {
              w: {
                $set: contentWidth
              }
            };
          }
        });
      });

      return update(state, {
        layout: obj,
        page: {
          $merge: action.payload
        }
      });
    }

    case 'UPDATE_OPTIONS':
      return update(state, {
        options: {
          $merge: action.payload
        }
      });

    case 'SET_GRID_VISIBILITY':
      return {...state, gridVisible: action.payload};

    case 'SET_BORDER_VISIBILITY':
      return {...state, bordersVisible: action.payload};

    case 'SET_EDITOR_LOADING':
      return {...state, editorLoading: action.payload};

    default:
      return state;
  }
};

const getPaperSize = state => {
  const { format, orientation } = state.options;

  const pageSize = Object.assign({}, PageSize.size[format.toLowerCase()]);

  if (orientation === PageSize.orientation.landscape) {
    pageSize.width = [pageSize.height, pageSize.height = pageSize.width][0];
  }

  return pageSize;
};

function getInitialState() {
  const header = () => update(
    TemplateUtil.createComponent(),
    {
      h: {
        $set: 3
      },
      meta: {
        required: {
          $set: true
        },
        type: {
          $set: 'group'
        },
      }
    }
  );

  const state = {
    layout: {
      root: [],
      header: [header()],
      footer: [header()]
    },
    page: {
      layoutRelative: true,
      border: 20
    },
    options: {
      footer: {},
      header: {},
      orientation: PageSize.orientation.portrait,
      format: PageSize.format.a4
    },
    schema: [],
    selectedUuids: [],
    gridVisible: false,
    bordersVisible: true,
    editorLoading: false
  };

  if (process.env.NODE_ENV === 'development') {
    state.schema = new Schema().forExample();
  }

  return state;
}

const pdfTemplateBuilder = undoable(store, {
  filter: excludeAction(['CONFIGURE']),
  groupBy: groupByActionTypes('UPDATE_PAGE')
});

export default pdfTemplateBuilder;