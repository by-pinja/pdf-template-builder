import { updateElement } from '../Store/actions';
import { connect } from 'react-redux';
import ElementStyle from '../Component/ElementStyle';
import { getSelectedElementMeta } from '../Store/util';

const mapStateToProps = ({present}) => ({
  element: getSelectedElementMeta(present)
});

const mapDispatchToProps = dispatch => ({
  onUpdateElement: element => dispatch(updateElement(element))
});

const ElementStyleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementStyle);

export default ElementStyleContainer;