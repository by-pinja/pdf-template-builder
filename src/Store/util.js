export function getSelectedElementMeta(state) {
  if (!state.selectedUuid) {
    return null;
  }

  const element = state.layout[getSelectedElementGroupId(state)].find(e => e.i === state.selectedUuid);

  if (!element) {
    return null;
  }

  return {...element.meta, i: state.selectedUuid};
}

export function getSelectedElementGroupId(state) {
  if (!state.selectedUuid) {
    return null;
  }

  let id = null;

  Object.keys(state.layout).every(groupId => {
    return state.layout[groupId].every(e => {
      if (e.i === state.selectedUuid) {
        id = groupId;
        return false;
      }

      return true;
    })
  });

  return id;
}

export function getParentElement(uuid, state) {
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