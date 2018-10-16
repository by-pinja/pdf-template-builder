import { updateElement } from '../Store/actions';
import { connect } from 'react-redux';
import ElementStyle from '../Component/ElementStyle';
import { getSelectedElementMeta } from '../Store/util';

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    element: getSelectedElementMeta(present)
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onUpdateElement: function onUpdateElement(element) {
      return dispatch(updateElement(element));
    }
  };
};

var ElementStyleContainer = connect(mapStateToProps, mapDispatchToProps)(ElementStyle);

export default ElementStyleContainer;