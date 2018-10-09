import PageTools from '../Component/PageTools';
import { updatePage } from '../Store/actions';
import { connect } from 'react-redux';

const mapStateToProps = ({present}) => ({
  page: present.page
});

const mapDispatchToProps = dispatch => ({
  onUpdatePage: page => dispatch(updatePage(page))
});

const PageToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTools);

export default PageToolsContainer;