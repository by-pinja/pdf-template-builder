import reducer from '../../Store/reducers';
import * as actions from '../../Store/actions';
import TemplateUtil from '../../Util/TemplateUtil';

function runActions(state, acts) {
  for (let action of acts) {
    state = reducer(state, action);
  }
  return state;
}

describe('reducer', () => {
  let state;

  beforeEach(() => {
    state = reducer(undefined, {});
  });

  describe('ADD_ELEMENT', () => {
    it('adds an element to root and selects it', () => {
      const element = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(element, 'root')
      ]);

      expect(state.present.layout.root)
      .toEqual([element]);

      expect(state.present.selectedUuids)
      .toEqual([element.i]);
    });
    
    it('adds an element in to the selected element if it\'s a group', () => {
      const firstElement = TemplateUtil.createComponent();
      firstElement.meta.type = 'group';

      const secondElement = TemplateUtil.createComponent();
      secondElement.meta.type = 'text';

      state = runActions(state, [
        actions.addElement(firstElement, 'root'),
        actions.addElement(secondElement, firstElement.i),
      ]);

      expect(state.present.layout.root)
      .toEqual([firstElement]);

      expect(state.present.layout[firstElement.i])
      .toEqual([secondElement]);
    });

    it('adds an element adjacent to the selected element if it\'s not a group', () => {
      const firstElement = TemplateUtil.createComponent();
      firstElement.meta.type = 'text';

      const secondElement = TemplateUtil.createComponent();
      secondElement.meta.type = 'text';

      state = runActions(state, [
        actions.addElement(firstElement, 'root'),
        actions.addElement(secondElement, firstElement.i),
      ]);

      expect(state.present.layout.root)
      .toEqual([firstElement, secondElement]);
    });
  });

  describe('DUPLICATE_ELEMENT', () => {
    it('duplicates the selected element to the same container and selects it', () => {
      const element = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(element, 'root'),
        actions.duplicateElement(),
      ]);

      const duplicated = state.present.layout.root[1];

      expect(state.present.layout.root)
      .toEqual([element, duplicated]);

      expect(state.present.selectedUuids)
      .toEqual([duplicated.i]);

      delete element.i;
      delete duplicated.i;

      // duplicated element goes below the original
      // subtract from y to make them identical
      duplicated.y -= 1;

      expect(element)
      .toEqual(duplicated);
    });

    it('allows duplicating multiple elements at once', () => {
      const firstElement = TemplateUtil.createComponent();
      const secondElement = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(firstElement, 'root'),
        actions.addElement(secondElement, 'root'),
        actions.selectElement(firstElement.i, true),
        actions.duplicateElement(),
      ]);

      const firstDupe = state.present.layout.root[2];
      const secondDupe = state.present.layout.root[3];

      expect(state.present.layout.root)
      .toEqual([firstElement, secondElement, firstDupe, secondDupe]);

      expect(state.present.selectedUuids)
      .toEqual([firstDupe.i, secondDupe.i]);

      delete firstElement.i;
      delete secondElement.i;
      delete firstDupe.i;
      delete secondDupe.i;

      // duplicated element goes below the original
      // subtract from y to make them identical
      firstDupe.y -= 1;
      secondDupe.y -= 1;

      expect(firstElement)
      .toEqual(firstDupe);

      expect(secondElement)
      .toEqual(secondDupe);
    });
  });
    
  describe('RESIZE_ELEMENT', () => {
    it('updates element\'s dimensions', () => {
      const element = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(element, 'root'),
        actions.resizeElement(element.i, 4, 3),
      ]);

      const {w, h} = state.present.layout.root[0];

      expect({w, h})
      .toEqual({w: 4, h: 3});
    });
  });
    
  describe('REMOVE_ELEMENT', () => {
    it('removes a single element', () => {
      const element = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(element, 'root'),
        actions.removeElement(),
      ]);

      expect(state.present.layout.root)
      .toEqual([]);
    });

    it('removes multiple elements', () => {
      const firstElement = TemplateUtil.createComponent();
      const secondElement = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(firstElement, 'root'),
        actions.addElement(secondElement, 'root'),
        actions.selectElement(firstElement.i, true),
        actions.removeElement(),
      ]);

      expect(state.present.layout.root)
      .toEqual([]);
    });

    it('doesn\'t remove required elements', () => {
      const headerGroup = state.present.layout.header[0];

      state = runActions(state, [
        actions.selectElement(headerGroup.i),
        actions.removeElement(),
      ]);

      expect(state.present.layout.header)
      .toEqual([headerGroup]);
    });
  });
    
  describe('UPDATE_ELEMENT', () => {
    it('updates a single element', () => {
      const element = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(element, 'root'),
        actions.updateElement({content: 'text', fontFamily: 'Comic Sans'}),
      ]);

      element.meta.content = 'text';
      element.meta.fontFamily = 'Comic Sans';

      expect(state.present.layout.root[0])
      .toEqual(element);
    });
    
    it('updates multiple elements', () => {
      const firstElement = TemplateUtil.createComponent();
      const secondElement = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(firstElement, 'root'),
        actions.addElement(secondElement, 'root'),
        actions.selectElement(firstElement.i, true),
        actions.updateElement({fontFamily: 'Comic Sans', fontSize: 20}),
      ]);

      firstElement.meta.fontFamily = 'Comic Sans';
      firstElement.meta.fontSize = 20;
      secondElement.meta.fontFamily = 'Comic Sans';
      secondElement.meta.fontSize = 20;

      expect(state.present.layout.root)
      .toEqual([firstElement, secondElement]);
    });

    it('doesn\'t allow changing element\'s type', () => {
      const element = TemplateUtil.createComponent();

      state = runActions(state, [
        actions.addElement(element, 'root'),
        actions.updateElement({type: 'group'}),
      ]);

      expect(state.present.layout.root[0])
      .toEqual(element);
    });

  });

  describe('SELECT_ELEMENT', () => {
    it('handles single selection', () => {
      state = runActions(state, [
        actions.selectElement('123-456'),
        actions.selectElement('abc-def')
      ]);

      expect(state.present.selectedUuids)
      .toEqual(['abc-def']);
    });
    
    it('allows selecting multiple elements', () => {
      state = runActions(state, [
        actions.selectElement('123-456'),
        actions.selectElement('abc-def', true)
      ]);

      expect(state.present.selectedUuids)
      .toEqual(['123-456', 'abc-def']);
    });
    
    it('removes element from selection if it\'s already selected', () => {
      state = runActions(state, [
        actions.selectElement('123-456'),
        actions.selectElement('abc-def', true),
        actions.selectElement('123-456', true)
      ]);

      expect(state.present.selectedUuids)
      .toEqual(['abc-def']);
    });
  });
});