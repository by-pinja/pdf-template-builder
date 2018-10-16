import React from 'react';
import SaveButton from '../../Component/SaveButton';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton/IconButton';

describe('<SaveButton />', () => {
  describe('render()', () => {
    test('will render a button if onSaveTemplate() callback is given', () => {
      const mockOnSave = jest.fn();

      const wrapper = shallow(
        <SaveButton onSaveTemplate={mockOnSave} />
      );

      expect(wrapper.html()).not.toBe(null);
    });

    test('will render nothing is callback is not given', () => {
      const wrapper = shallow(
        <SaveButton />
      );

      expect(wrapper.html()).toBe(null);
    });
  });

  describe('onClick()', () => {
    test('triggers onSave callback', () => {
      const mockOnSave = jest.fn();
      const mockExportTemplate = jest.fn();
      const mockGetTemplateHtml = jest.fn();

      const wrapper = shallow(
        <SaveButton
          onSaveTemplate={mockOnSave}
          exportTemplate={mockExportTemplate}
          getTemplateHtml={mockGetTemplateHtml}
        />
      );

      const component = wrapper.dive();
      component.find(IconButton).simulate('click');

      expect(mockOnSave.mock.calls.length).toEqual(1);
      expect(mockExportTemplate.mock.calls.length).toEqual(1);
      expect(mockGetTemplateHtml.mock.calls.length).toEqual(1);
    });
  });
});