import React from 'react';
import SettingFontColor from '../../Component/SettingFontColor';
import { shallow } from 'enzyme';

describe('<SettingFontColor />', () => {
  describe('render()', () => {
    test('will render', () => {
      const wrapper = shallow(
        <SettingFontColor onChange={() => {}} defaultValue="#000" />
      );

      expect(wrapper.html()).not.toBe(null);
    });
  });
});
