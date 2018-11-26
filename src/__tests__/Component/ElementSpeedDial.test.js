import ElementSpeedDial from '../../Component/ElementSpeedDial';
import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction/SpeedDialAction';
import { shallow } from 'enzyme';

describe('<ElementSpeedDial />', () => {
  describe('render()', () => {
    test('will render the element', () => {
      const wrapper = shallow(
        <ElementSpeedDial onAddElement={() => {}} />
      );

      expect(wrapper.html()).not.toBe(null);
    });
  });

  describe('click the main button', () => {
    test('will call the onAddElement with default element type', () => {
      const mockOnAddElement = jest.fn();

      const wrapper = shallow(
        <ElementSpeedDial onAddElement={mockOnAddElement} />
      );

      const component = wrapper.dive();

      component.find(SpeedDial).simulate('click');

      expect(mockOnAddElement.mock.calls.length).toBe(1);
      expect(mockOnAddElement.mock.calls[0][0].meta.type).toBe('text');
    });
  });

  describe('the child button', () => {
    test('will call onAddElement with the proper type', () => {
      const mockOnAddElement = jest.fn();

      const wrapper = shallow(
        <ElementSpeedDial onAddElement={mockOnAddElement} />
      );

      const component = wrapper.dive();

      component.find(SpeedDialAction).forEach(e => e.simulate('click'));

      expect(mockOnAddElement.mock.calls.length).toBe(3);
      expect(mockOnAddElement.mock.calls[0][0].meta.type).toBe('image');
      expect(mockOnAddElement.mock.calls[1][0].meta.type).toBe('text');
      expect(mockOnAddElement.mock.calls[2][0].meta.type).toBe('group');
    });
  });
});
