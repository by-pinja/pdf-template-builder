import TemplateUtil from '../Util/TemplateUtil';

export const selectElement = uuid => ({
  type: 'SELECT_ELEMENT',
  payload: uuid
});

export const addElement = (parentId, type = 'text') => ({
  type: 'ADD_ELEMENT',
  payload: {
    element: {...TemplateUtil.createComponent(), type},
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

export const updateOptions = options => ({
  type: 'UPDATE_OPTIONS',
  payload: options
});

export const setGridVisibility = visible => ({
  type: 'SET_GRID_VISIBILITY',
  payload: visible
});

export const setEditorLoading = visible => ({
  type: 'SET_EDITOR_LOADING',
  payload: visible
});