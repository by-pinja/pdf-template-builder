import update from 'immutability-helper';
import Schema from './Resource/Schema';
import undoable, { excludeAction } from 'redux-undo';

const initialState = getInitialState();

const store = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return update(
        {
          ...state,
          selectedUuid: action.payload.i
        },
        {
          layout: {
            $push: [action.payload]
          }
        }
      );

    case 'REMOVE_ELEMENT':
      return update(state, {
        layout: {
          $splice: [[state.layout.findIndex(l => l.i === action.payload), 1]]
        },
        $unset: ['selectedUuid']
      });

    case 'UPDATE_ELEMENT':
      return update(state, {
        layout: {
          [state.layout.findIndex(l => l.i === action.payload.i)]: {
            meta: {
              $set: action.payload
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
        layout: action.payload.map(component => {
          const index = state.layout.findIndex(l => l.i === component.i);

          if (index >= 0) {
            return {...component, meta: state.layout[index].meta};
          }

          return component;
        })
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
    default:
      return state;
  }
};

function getInitialState() {
  const state = {
    layout: [],
    schema: [],
    selectedUuid: null,
    pdfStorageUri: process.env.REACT_APP_PDF_STORAGE_URI
  };

  if (process.env.NODE_ENV === 'development') {
    state.schema = new Schema().forExample();
  }

  return state;
}

const pdfTemplateBuilder = undoable(store, { filter: excludeAction(['CONFIGURE']) });

export default pdfTemplateBuilder;