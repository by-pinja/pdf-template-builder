function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import update from 'immutability-helper';
import Schema from '../Resource/Schema';
import undoable, { excludeAction } from 'redux-undo';
import { getElement, getSelectedElementGroupId, getSelectedElementMeta } from './util';
import TemplateUtil from '../Util/TemplateUtil';
import PageSize from '../Resource/PageSize';

var initialState = getInitialState();

var store = function store() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case 'ADD_ELEMENT':
      var parentId = action.payload.parentId || 'root';

      // Get closest element with type 'group'
      if (parentId !== 'root') {
        (function () {
          while (true) {
            var parentEl = getElement(parentId, state);

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

      return update(Object.assign({}, state, {
        selectedUuid: action.payload.element.i
      }), {
        layout: _defineProperty({}, parentId, {
          $push: [action.payload.element]
        })
      });

    case 'RESIZE_ELEMENT':
      return update(state, {
        layout: _defineProperty({}, getSelectedElementGroupId(state), _defineProperty({}, state.layout[getSelectedElementGroupId(state)].findIndex(function (l) {
          return l.i === action.payload.i;
        }), {
          w: { $set: action.payload.width },
          h: { $set: action.payload.height }
        }))
      });

    case 'REMOVE_ELEMENT':
      // Prevent removal if element is required
      if (getSelectedElementMeta(state).required) {
        return state;
      }

      return update(state, {
        layout: _defineProperty({}, getSelectedElementGroupId(state), {
          $splice: [[state.layout[getSelectedElementGroupId(state)].findIndex(function (l) {
            return l.i === action.payload;
          }), 1]]
        }),
        $unset: ['selectedUuid']
      });

    case 'UPDATE_ELEMENT':
      return update(state, {
        layout: _defineProperty({}, getSelectedElementGroupId(state), _defineProperty({}, state.layout[getSelectedElementGroupId(state)].findIndex(function (l) {
          return l.i === action.payload.i;
        }), {
          meta: {
            $set: action.payload
          }
        }))
      });

    case 'SELECT_ELEMENT':
      if (state.selectedUuid === action.payload) {
        return state;
      }

      return Object.assign({}, state, { selectedUuid: action.payload });

    case 'SET_LAYOUT':
      var newState = Object.assign({}, state, {
        layout: Object.assign({}, state.layout, _defineProperty({}, action.payload.parentId, action.payload.layout.map(function (component) {
          var index = state.layout[action.payload.parentId].findIndex(function (l) {
            return l.i === component.i;
          });

          if (index >= 0) {
            return Object.assign({}, component, { meta: state.layout[action.payload.parentId][index].meta });
          }

          return component;
        })))
      });

      // Return the same state if really nothing changed (history works better)
      if (JSON.stringify(state.layout) === JSON.stringify(newState.layout)) {
        return state;
      }

      return newState;

    case 'IMPORT_TEMPLATE':
      var _initialState = getInitialState();

      return update(state, {
        layout: {
          $set: update(action.payload.layout, {
            header: {
              $set: action.payload.layout.header || _initialState.layout.header
            },
            footer: {
              $set: action.payload.layout.footer || _initialState.layout.footer
            }
          })
        },
        page: {
          $set: action.payload.page || _initialState.page
        },
        options: {
          $set: action.payload.options || _initialState.options
        }
      });

    case 'CONFIGURE':
      return Object.assign({}, state, {
        schema: action.payload.schema || [],
        onPreview: action.payload.onPreview,
        onSaveTemplate: action.payload.onSaveTemplate
      });

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
      return Object.assign({}, state, { gridVisible: action.payload });

    case 'SET_BORDER_VISIBILITY':
      return Object.assign({}, state, { bordersVisible: action.payload });

    case 'SET_EDITOR_LOADING':
      return Object.assign({}, state, { editorLoading: action.payload });

    default:
      return state;
  }
};

function getInitialState() {
  var header = function header() {
    return update(TemplateUtil.createComponent(), {
      h: {
        $set: 3
      },
      meta: {
        required: {
          $set: true
        },
        type: {
          $set: 'group'
        }
      }
    });
  };

  var state = {
    layout: {
      root: [],
      header: [header()],
      footer: [header()]
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
    gridVisible: false,
    bordersVisible: true
  };

  if (process.env.NODE_ENV === 'development') {
    state.schema = new Schema().forExample();
  }

  return state;
}

var pdfTemplateBuilder = undoable(store, { filter: excludeAction(['CONFIGURE']) });

export default pdfTemplateBuilder;