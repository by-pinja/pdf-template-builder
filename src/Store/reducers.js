import update from 'immutability-helper';
import Schema from '../Resource/Schema';
import undoable, { excludeAction } from 'redux-undo';
import { getElement, getSelectedElementGroupId, getSelectedElementMeta } from './util';
import TemplateUtil from '../Util/TemplateUtil';
import PageSize from '../Resource/PageSize';

const initialState = getInitialState();

const store = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      let parentId = action.payload.parentId || 'root';

      // Get closest element with type 'group'
      if (parentId !== 'root') {
        (() => {
          while (true) {
            const parentEl = getElement(parentId, state);

            if (parentId === 'root' || parentEl.meta.type === 'group') {
              break;
            }

            parentId = getSelectedElementGroupId(state, parentEl.i);
          }
        })();
      }

      if (!state.layout[parentId]) {
        state.layout[parentId] = [];
      }

      return update(
        {
          ...state,
          selectedUuid: action.payload.element.i
        },
        {
          layout: {
            [parentId]: {
              $push: [action.payload.element]
            }
          }
        }
      );

    case 'RESIZE_ELEMENT':
      return update(state, {
        layout: {
          [getSelectedElementGroupId(state)]: {
            [state.layout[getSelectedElementGroupId(state)].findIndex(l => l.i === action.payload.i)]: {
              w: { $set: action.payload.width },
              h: { $set: action.payload.height }
            }
          }
        }
      });

    case 'REMOVE_ELEMENT':
      // Prevent removal if element is required
      if (getSelectedElementMeta(state).required) {
        return state;
      }

      return update(state, {
        layout: {
          [getSelectedElementGroupId(state)]: {
            $splice: [[state.layout[getSelectedElementGroupId(state)].findIndex(l => l.i === action.payload), 1]]
          }
        },
        $unset: ['selectedUuid']
      });

    case 'UPDATE_ELEMENT':
      return update(state, {
        layout: {
          [getSelectedElementGroupId(state)]: {
            [state.layout[getSelectedElementGroupId(state)].findIndex(l => l.i === action.payload.i)]: {
              meta: {
                $set: action.payload
              }
            }
          }
        }
      });

    case 'SELECT_ELEMENT':
      if (state.selectedUuid === action.payload) {
        return state;
      }

      return {...state, selectedUuid: action.payload};

    case 'SET_LAYOUT':
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

    case 'IMPORT_TEMPLATE':
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

    case 'CONFIGURE':
      return {
        ...state,
        schema: action.payload.schema || [],
        onPreview: action.payload.onPreview,
        onSaveTemplate: action.payload.onSaveTemplate
      };

    case 'UPDATE_PAGE':
      return update(state, {
        page: {
          $merge: action.payload
        }
      });

    case 'UPDATE_OPTIONS':
      return update(state, {
        options: {
          $merge: action.payload
        }
      });

    case 'SET_GRID_VISIBILITY':
      return {...state, gridVisible: action.payload};

    case 'SET_EDITOR_LOADING':
      return {...state, editorLoading: action.payload};

    default:
      return state;
  }
};

function getInitialState() {
  const header = update(
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
      header: [header],
      footer: [{...header}]
    },
    page: { layoutRelative: true },
    options: {
      footer: {},
      header: {},
      orientation: PageSize.orientation.portrait,
      format: PageSize.format.a4
    },
    schema: [],
    selectedUuid: null,
    gridVisible: false
  };

  if (process.env.NODE_ENV === 'development') {
    state.schema = new Schema().forExample();
  }

  return state;
}

const pdfTemplateBuilder = undoable(store, { filter: excludeAction(['CONFIGURE']) });

export default pdfTemplateBuilder;