import update from 'immutability-helper';
import Schema from '../Resource/Schema';
import undoable, { excludeAction } from 'redux-undo';
import { getSelectedElementGroupId } from './util';

const initialState = getInitialState();

const store = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      const parentId = action.payload.parentId || 'root';

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
            [action.payload.parentId || 'root']: {
              $push: [action.payload.element]
            }
          }
        }
      );

    case 'REMOVE_ELEMENT':
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

    case 'CONFIGURE':
      return {
        ...state,
        pdfStorageUri: action.payload.pdfStorageUri,
        schema: action.payload.schema || [],
        onSaveTemplate: action.payload.onSaveTemplate
      };

    case 'UPDATE_PAGE':
      return update(state, {
        page: {
          $merge: action.payload
        }
      });
    default:
      return state;
  }
};

function getInitialState() {
  const state = {
    layout: {
      root: []
    },
    schema: [],
    selectedUuid: null,
    pdfStorageUri: process.env.REACT_APP_PDF_STORAGE_URI,
    page: {
      layoutRelative: true
    }
  };

  if (process.env.NODE_ENV === 'development') {
    state.schema = new Schema().forExample();
  }

  return state;
}

const pdfTemplateBuilder = undoable(store, { filter: excludeAction(['CONFIGURE']) });

export default pdfTemplateBuilder;