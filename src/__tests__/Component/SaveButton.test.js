import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import SaveButton from '../../Component/SaveButton';

import IconButton from '@material-ui/core/IconButton/IconButton';

describe('<SaveButton />', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({dive: true});
  });

  describe('render()', () => {
    test('will render a button if onSaveTemplate() callback is given', () => {
      const mockOnSave = jest.fn();

      const wrapper = shallow(
        <SaveButton onSaveTemplate={mockOnSave} />
      );

      expect(wrapper.html()).not.toBe(null);
    });

    test('will render nothing if callback is not given', () => {
      const wrapper = shallow(
        <SaveButton />
      );

      expect(wrapper.html()).toBe(null);
    });
  });

  describe('onClick()', () => {
    test('triggers onSave callback', () => {
      const mockOnSave = jest.fn();

      const wrapper = shallow(
        <SaveButton onSaveTemplate={mockOnSave} />
      );

      const component = wrapper.dive();
      component.find(IconButton).simulate('click');

      expect(mockOnSave.mock.calls.length).toEqual(1);
    });
  });
});