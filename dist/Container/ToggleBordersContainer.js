import ToggleBordersButton from '../Component/ToggleBordersButton';
import { connect } from 'react-redux';
import { setBorderVisibility } from '../Store/actions';

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    bordersVisible: present.bordersVisible
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onChangeBorderVisibility: function onChangeBorderVisibility(visible) {
      return dispatch(setBorderVisibility(visible));
    }
  };
};

var ToggleBordersContainer = connect(mapStateToProps, mapDispatchToProps)(ToggleBordersButton);

export default ToggleBordersContainer;