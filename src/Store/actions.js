import TemplateUtil from '../Util/TemplateUtil';

export const selectElement = uuid => ({
  type: 'SELECT_ELEMENT',
  payload: uuid
});

export const addElement = parentId => ({
  type: 'ADD_ELEMENT',
  payload: {
    element: TemplateUtil.createComponent(),
    parentId
  }
});

export const updateElement = element => ({
  type: 'UPDATE_ELEMENT',
  payload: element
});

export const removeElement = uuid => ({
  type: 'REMOVE_ELEMENT',
  payload: uuid
});

export const setLayout = (layout, parentId) => ({
  type: 'SET_LAYOUT',
  payload: {layout, parentId}
});

export const importTemplate = data => ({
  type: 'IMPORT_TEMPLATE',
  payload: data
});

export const configure = configurations => ({
  type: 'CONFIGURE',
  payload: configurations
});

export const updatePage = page => ({
  type: 'UPDATE_PAGE',
  payload: page
});

export const setGridVisibility = visible => ({
  type: 'SET_GRID_VISIBILITY',
  payload: visible
});