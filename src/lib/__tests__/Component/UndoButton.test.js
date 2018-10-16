import React from 'react';
import UndoButton from '../../Component/UndoButton';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton/IconButton';

describe('<UndoButton />', () => {
  describe('onClick()', () => {
    test('triggers onUndo action if enabled', () => {
      const mockOnUndo = jest.fn();

      const wrapper = shallow(
        <UndoButton onUndo={mockOnUndo} canUndo={true} />
      );

      const component = wrapper.dive();
      component.find(IconButton).simulate('click');

      expect(mockOnUndo.mock.calls.length).toEqual(1);
    });

    test('does not trigger onUndo if disabled', () => {
      const mockOnUndo = jest.fn();

      const wrapper = shallow(
        <UndoButton onUndo={mockOnUndo} canUndo={false} />
      );

      const component = wrapper.dive();
      component.find(IconButton).simulate('click');

      expect(mockOnUndo.mock.calls.length).toEqual(0);
    });
  });
});