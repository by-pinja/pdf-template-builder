export function getSelectedElementMeta(state) {
  if (!state.selectedUuid) {
    return null;
  }

  const element = state.layout.find(e => e.i === state.selectedUuid);

  return {...element.meta, i: state.selectedUuid};
}