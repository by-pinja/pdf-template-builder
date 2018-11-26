import React from 'react';
import PreviewButton from '../../Component/PreviewButton';
import { shallow } from 'enzyme';

describe('<PreviewButton />', () => {
  describe('render()', () => {
    test('will render a button if onPreview callback is given', () => {
      const wrapper = shallow(
        <PreviewButton
          onPreview={() => {}}
          templateData={{}}
          templateHtml={() => {}}
          exportTemplate={() => {}}
        />
      );

      expect(wrapper.html()).not.toBe(null);
    });

    test('will render nothing if callback is not given', () => {
      const wrapper = shallow(
        <PreviewButton
          templateData={{}}
          templateHtml={() => {}}
          exportTemplate={() => {}}
        />
      );

      expect(wrapper.html()).toBe(null);
    });
  });
});
