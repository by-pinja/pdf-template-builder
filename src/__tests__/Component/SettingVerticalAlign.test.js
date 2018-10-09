import React from 'react';
import { shallow } from 'enzyme';
import SettingVerticalAlign from '../../Component/SettingVerticalAlign';

describe('<SettingVerticalAlign />', () => {
  describe('render()', () => {
    test('will render', () => {
      const wrapper = shallow(
        <SettingVerticalAlign onChange={() => {}} defaultValue="top" />
      );

      expect(wrapper.html()).not.toBe(null);
    });
  });
});
