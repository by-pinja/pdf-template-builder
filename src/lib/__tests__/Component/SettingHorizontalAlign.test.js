import React from 'react';
import SettingHorizontalAlign from '../../Component/SettingHorizontalAlign';
import { shallow } from 'enzyme';

describe('<SettingHorizontalAlign />', () => {
  describe('render()', () => {
    test('will render', () => {
      const wrapper = shallow(
        <SettingHorizontalAlign onChange={() => {}} defaultValue="left" />
      );

      expect(wrapper.html()).not.toBe(null);
    });
  });
});
