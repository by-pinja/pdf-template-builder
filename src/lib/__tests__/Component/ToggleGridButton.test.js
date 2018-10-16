import React from 'react';
import ToggleGridButton from '../../Component/ToggleGridButton';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton/IconButton';

describe('<ToggleGridButton />', () => {
  describe('onClick()', () => {
    [true, false]
      .forEach(visible => {
        test(`sets grid visibility to ${visible} if it is ${!visible}`, () => {
          const mockOnToggleGrid = jest.fn();

          const wrapper = shallow(
            <ToggleGridButton onChangeGridVisibility={mockOnToggleGrid} gridVisible={visible} />
          );

          const component = wrapper.dive();
          component.find(IconButton).simulate('click');

          expect(mockOnToggleGrid.mock.calls.length).toEqual(1);
          expect(mockOnToggleGrid).toBeCalledWith(!visible);
        });
      })
    ;
  });
});
