import PageTools from '../Component/PageTools';
import { updatePage } from '../Store/actions';
import { connect } from 'react-redux';

var mapStateToProps = function mapStateToProps(_ref) {
  var present = _ref.present;
  return {
    page: present.page
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onUpdatePage: function onUpdatePage(page) {
      return dispatch(updatePage(page));
    }
  };
};

var PageToolsContainer = connect(mapStateToProps, mapDispatchToProps)(PageTools);

export default PageToolsContainer;