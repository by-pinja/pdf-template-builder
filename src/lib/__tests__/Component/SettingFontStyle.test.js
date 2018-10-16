import React from 'react';
import SettingFontStyle from '../../Component/SettingFontStyle';
import { shallow } from 'enzyme';

describe('<SettingFontStyle />', () => {
  describe('render()', () => {
    test('will render', () => {
      const wrapper = shallow(
        <SettingFontStyle onChange={() => {}} />
      );

      expect(wrapper.html()).not.toBe(null);
    });
  });
});
