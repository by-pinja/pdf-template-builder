import React from 'react';
import RedoButton from '../../Component/RedoButton';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton/IconButton';

describe('<RedoButton />', () => {
  describe('onClick()', () => {
    test('triggers onRedo action if enabled', () => {
      const mockOnRedo = jest.fn();

      const wrapper = shallow(
        <RedoButton onRedo={mockOnRedo} canRedo={true} />
      );

      const component = wrapper.dive();
      component.find(IconButton).simulate('click');

      expect(mockOnRedo.mock.calls.length).toEqual(1);
    });

    test('does not trigger onRedo if disabled', () => {
      const mockOnRedo = jest.fn();

      const wrapper = shallow(
        <RedoButton onRedo={mockOnRedo} canRedo={false} />
      );

      const component = wrapper.dive();
      component.find(IconButton).simulate('click');

      expect(mockOnRedo.mock.calls.length).toEqual(0);
    });
  });
});