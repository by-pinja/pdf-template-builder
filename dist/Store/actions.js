export var selectElement = function selectElement(uuid) {
  return {
    type: 'SELECT_ELEMENT',
    payload: uuid
  };
};

export var addElement = function addElement(element, parentId) {
  return {
    type: 'ADD_ELEMENT',
    payload: { element: element, parentId: parentId }
  };
};

export var resizeElement = function resizeElement(i, width, height) {
  return {
    type: 'RESIZE_ELEMENT',
    payload: { i: i, width: width, height: height }
  };
};

export var updateElement = function updateElement(element) {
  return {
    type: 'UPDATE_ELEMENT',
    payload: element
  };
};

export var removeElement = function removeElement(uuid) {
  return {
    type: 'REMOVE_ELEMENT',
    payload: uuid
  };
};

export var setLayout = function setLayout(layout, parentId) {
  return {
    type: 'SET_LAYOUT',
    payload: { layout: layout, parentId: parentId }
  };
};

export var importTemplate = function importTemplate(data) {
  return {
    type: 'IMPORT_TEMPLATE',
    payload: data
  };
};

export var configure = function configure(configurations) {
  return {
    type: 'CONFIGURE',
    payload: configurations
  };
};

export var updatePage = function updatePage(page) {
  return {
    type: 'UPDATE_PAGE',
    payload: page
  };
};

export var updateOptions = function updateOptions(options) {
  return {
    type: 'UPDATE_OPTIONS',
    payload: options
  };
};

export var setGridVisibility = function setGridVisibility(visible) {
  return {
    type: 'SET_GRID_VISIBILITY',
    payload: visible
  };
};

export var setBorderVisibility = function setBorderVisibility(visible) {
  return {
    type: 'SET_BORDER_VISIBILITY',
    payload: visible
  };
};

export var setEditorLoading = function setEditorLoading(visible) {
  return {
    type: 'SET_EDITOR_LOADING',
    payload: visible
  };
};