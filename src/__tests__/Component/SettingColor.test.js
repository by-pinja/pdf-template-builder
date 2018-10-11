import BorderColorIcon from '@material-ui/icons/BorderColor';
import React from 'react';
import SettingColor from '../../Component/SettingColor';
import { shallow } from 'enzyme';

describe('<SettingColor />', () => {
  describe('render()', () => {
    test('will render', () => {
      const wrapper = shallow(
        <SettingColor onChange={() => {}} defaultValue="#000" icon={<BorderColorIcon/>} title="My color" />
      );

      expect(wrapper.html()).not.toBe(null);
    });
  });
});
