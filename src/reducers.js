import update from 'immutability-helper';
import Schema from './Resource/Schema';
import undoable from 'redux-undo';

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
          elements: { 
            [action.payload.i]: {
              $set: { }
            }
          },
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
        elements: {
          $unset: [action.payload]
        },
        $unset: ['selectedUuid']
      });

    case 'UPDATE_ELEMENT':
      return update(state, {
        elements: {
          [action.payload.i]: {
            $merge: action.payload
          },
        }
      });

    case 'SELECT_ELEMENT':
      if (state.selectedUuid === action.payload) {
        return state;
      }

      return {...state, selectedUuid: action.payload};

    case 'SET_LAYOUT':
      if (JSON.stringify(state.layout) === JSON.stringify(action.payload)) {
        return state;
      }

      return {...state, layout: action.payload};

    case 'CONFIGURE':
      return {
        ...state,
        pdfStorageUri: action.payload.pdfStorageUri,
        schema: action.payload.schema || []
      };
    default:
      return state;
  }
};

function getInitialState() {
  const state = {
    elements: {},
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

const pdfTemplateBuilder = undoable(store);

export default pdfTemplateBuilder;