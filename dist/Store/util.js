export function getSelectedElementMeta(state) {
  if (!state.selectedUuid) {
    return null;
  }

  var element = state.layout[getSelectedElementGroupId(state)].find(function (e) {
    return e.i === state.selectedUuid;
  });

  if (!element) {
    return null;
  }

  return Object.assign({}, element.meta, { i: state.selectedUuid });
}

export function getSelectedElementGroupId(state) {
  var uuid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : state.selectedUuid;

  if (!uuid) {
    return null;
  }

  var id = null;

  Object.keys(state.layout).every(function (groupId) {
    return state.layout[groupId].every(function (e) {
      if (e.i === state.selectedUuid) {
        id = groupId;
        return false;
      }

      return true;
    });
  });

  return id;
}

export function getElement(uuid, state) {
  if (!uuid) {
    return null;
  }

  var parent = null;

  Object.keys(state.layout).every(function (groupId) {
    return state.layout[groupId].every(function (e) {
      if (e.i === uuid) {
        parent = e;
        return false;
      }

      return true;
    });
  });

  return parent;
}

export function exportTemplate(state) {
  return function () {
    var page = state.page,
        layout = state.layout,
        options = state.options;


    options.header.height = document.querySelector('#pdf-template-header .react-grid-layout').style.getPropertyValue('height');

    options.footer.height = document.querySelector('#pdf-template-footer .react-grid-layout').style.getPropertyValue('height');

    return { page: page, layout: layout, options: options };
  };
}