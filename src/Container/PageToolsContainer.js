import PageTools from '../Component/PageTools';
import { addElement } from '../actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
  onAddElement: () => dispatch(addElement())
});

const PageToolsContainer = connect(
  null,
  mapDispatchToProps
)(PageTools);

export default PageToolsContainer;