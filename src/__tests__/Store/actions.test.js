import configureStore from 'redux-mock-store';
import * as actions from '../../Store/actions';

const mockStore = configureStore();
const store = mockStore();

describe('redux actions', () => {
  beforeEach(() => store.clearActions());

  describe('select element', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          payload: { uuid: null, ctrlKey: undefined },
          type: 'SELECT_ELEMENT'
        },
        {
          payload: { uuid: '3301-ad2412-asd', ctrlKey: undefined },
          type: 'SELECT_ELEMENT'
        },
        {
          payload: { uuid: '3301-ad2412-asd', ctrlKey: true },
          type: 'SELECT_ELEMENT'
        },
      ];

      store.dispatch(actions.selectElement(null));
      store.dispatch(actions.selectElement('3301-ad2412-asd'));
      store.dispatch(actions.selectElement('3301-ad2412-asd', true));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('add element', () => {
    test('dispatches the correct action and payload', () => {
      const element = { i: '3301-ad2412-asd' };
      const parentId = 'root';

      const expectedActions = [
        {
          payload: { parentId, element },
          type: 'ADD_ELEMENT'
        }
      ];

      store.dispatch(actions.addElement(element, parentId));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('resize element', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        { 
          type: 'RESIZE_ELEMENT',
          payload: { i: 'id', width: 10, height: 15 }
        }
      ];

      store.dispatch(actions.resizeElement('id', 10, 15));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('update element', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'UPDATE_ELEMENT',
          payload: { i: 'id' }
        }
      ];

      store.dispatch(actions.updateElement({ i: 'id' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('set layout', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'SET_LAYOUT',
          payload: { layout: { i: 'id' }, parentId: 'parentId' }
        }
      ];

      store.dispatch(actions.setLayout({ i: 'id' }, 'parentId'));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('import template', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'IMPORT_TEMPLATE',
          payload: { layout: { root: {} } }
        }
      ];

      store.dispatch(actions.importTemplate({ layout: { root: {} } }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('configure', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'CONFIGURE',
          payload: { language: 'fi' }
        }
      ];

      store.dispatch(actions.configure({ language: 'fi' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('update page', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'UPDATE_PAGE',
          payload: { layoutRelative: true }
        }
      ];

      store.dispatch(actions.updatePage({ layoutRelative: true }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('update options', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        {
          type: 'UPDATE_OPTIONS',
          payload: { format: 'A4' }
        }
      ];

      store.dispatch(actions.updateOptions({ format: 'A4' }));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('set grid visibility', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        { type: 'SET_GRID_VISIBILITY', payload: false },
        { type: 'SET_GRID_VISIBILITY', payload: true },
      ];

      store.dispatch(actions.setGridVisibility(false));
      store.dispatch(actions.setGridVisibility(true));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('set editor loading', () => {
    test('dispatches the correct action and payload', () => {
      const expectedActions = [
        { type: 'SET_EDITOR_LOADING', payload: false },
        { type: 'SET_EDITOR_LOADING', payload: true },
      ];

      store.dispatch(actions.setEditorLoading(false));
      store.dispatch(actions.setEditorLoading(true));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
