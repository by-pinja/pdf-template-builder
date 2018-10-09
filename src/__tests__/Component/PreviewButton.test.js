import React from 'react';
import PreviewButton from '../../Component/PreviewButton';
import { shallow } from 'enzyme';

describe('<PreviewButton />', () => {
  describe('render()', () => {
    test('will render a button if pdfStorageUri prop is given', () => {
      const wrapper = shallow(
        <PreviewButton pdfStorageUri={'https://dummy:5000/api/'} />
      );

      expect(wrapper.html()).not.toBe(null);
    });

    test('will render nothing is callback is not given', () => {
      const wrapper = shallow(
        <PreviewButton />
      );

      expect(wrapper.html()).toBe(null);
    });
  });
});
