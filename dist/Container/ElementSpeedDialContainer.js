import { addElement } from '../Store/actions';
import { connect } from 'react-redux';
import ElementSpeedDial from '../Component/ElementSpeedDial';

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    selectedUuid: present.selectedUuid
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onAddElement: function onAddElement(element, selectedUuid) {
      return dispatch(addElement(element, selectedUuid));
    }
  };
};

var ElementSpeedDialContainer = connect(mapStateToProps, mapDispatchToProps)(ElementSpeedDial);

export default ElementSpeedDialContainer;