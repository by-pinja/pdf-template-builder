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
          payload: null,
          type: 'SELECT_ELEMENT'
        },
        {
          payload: '3301-ad2412-asd',
          type: 'SELECT_ELEMENT'
        }
      ];

      store.dispatch(actions.selectElement(null));
      store.dispatch(actions.selectElement('3301-ad2412-asd'));

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

});
