import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => {
  return {
    timer_state: state.timer_state,
    current_period: state.current_period
  };
};

const HeaderComponent = connect(mapStateToProps, null, null)(Header);

export default HeaderComponent;
