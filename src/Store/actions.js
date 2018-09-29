import TemplateUtil from '../Util/TemplateUtil';

export const selectElement = uuid => ({
  type: 'SELECT_ELEMENT',
  payload: uuid
});

export const addElement = () => ({
  type: 'ADD_ELEMENT',
  payload: TemplateUtil.createComponent()
});

export const updateElement = element => ({
  type: 'UPDATE_ELEMENT',
  payload: element
});

export const removeElement = uuid => ({
  type: 'REMOVE_ELEMENT',
  payload: uuid
});

export const setLayout = layout => ({
  type: 'SET_LAYOUT',
  payload: layout
});

export const configure = configurations => ({
  type: 'CONFIGURE',
  payload: configurations
});
