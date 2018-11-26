export function getSelectedElementMeta(state) {
  if (state.multiSelect) {
    return getMultiSelectMeta(state);
  }

  if (!state.selectedUuid) {
    return null;
  }

  const element = getElement(state.selectedUuid, state);

  if (!element) {
    return null;
  }

  return {...element.meta, i: state.selectedUuid};
}

export function getSelectedElementGroupId(state, uuid = state.selectedUuid) {
  if (!uuid) {
    return null;
  }

  let id = null;

  Object.keys(state.layout).every(groupId => {
    return state.layout[groupId].every(e => {
      if (e.i === uuid) {
        id = groupId;
        return false;
      }

      return true;
    })
  });

  return id;
}

export function getElement(uuid, state) {
  if (!uuid) {
    return null;
  }

  let parent = null;

  Object.keys(state.layout).every(groupId => {
    return state.layout[groupId].every(e => {
      if (e.i === uuid) {
        parent = e;
        return false;
      }

      return true;
    })
  });

  return parent;
}

export function exportTemplate(state) {
  return () => {
    const { page, layout, options } = state;

    options.header.height = document.querySelector('#pdf-template-header .react-grid-layout')
      .style.getPropertyValue('height')
    ;

    options.footer.height = document.querySelector('#pdf-template-footer .react-grid-layout')
      .style.getPropertyValue('height')
    ;

    options.border = page.border + 'px';

    return { page, layout, options };
  }
}

function getMultiSelectMeta(state) {
  // get properties that are common to all elements
  const meta = state.multiSelect.reduce((prev, cur) => {
    const next = getElement(cur, state).meta;
    if (!prev) return next;

    const prevKeys = Object.keys(prev);
    const newObj = {};

    for (let key of prevKeys) {
      const prevVal = prev[key];
      const nextVal = next[key];

      if (prevVal === nextVal) {
        newObj[key] = prevVal;
      } else if (Array.isArray(prevVal) && Array.isArray(nextVal) && prevVal.length === nextVal.length) {
        let isEqual = true;
        for (let arrayKey in prevVal) {
          if (prevVal[arrayKey] !== nextVal[arrayKey]) {
            isEqual = false;
            break;
          }
        }
        if (isEqual) {
          newObj[key] = prevVal;
        }
      }
    }

    return newObj;
  }, null);

  meta.type = 'selection';
  meta.fontSize = meta.fontSize || '';
  meta.fontFamily = meta.fontFamily || '';
  meta.borderWidth = meta.borderWidth || '';

  return meta;
}