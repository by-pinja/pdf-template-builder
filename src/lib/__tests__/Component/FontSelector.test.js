import FontSelector from '../../Component/FontSelector';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import React from 'react';
import { available } from '../../config';
import { shallow } from 'enzyme';

describe('<FontSelector />', () => {
  describe('render()', () => {
    test('will render select with properly styled options', () => {
      const wrapper = shallow(<FontSelector/>);
      const component = wrapper.dive();

      const allFonts = available.fonts.slice().sort();
      const renderedFonts = [];

      component.find(MenuItem)
        .forEach(i => renderedFonts.push(i.props().style.fontFamily))
      ;

      expect(allFonts).toEqual(renderedFonts);
    });
  });
});
