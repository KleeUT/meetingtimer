import React, { PropTypes } from 'react';
import ActionButtons from './ActionButtons.jsx';
import CalculatorEntry from './CalculatorEntry.jsx';
import CostEntry from './CostEntry.jsx';
import CostDisplay from './CostDisplay.jsx';
import { Route } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

const ContainerView = ({
  showTimerInput,
  showCalculatorInput,
  shouldShowCalculatorInput,
  shouldShowTimerButtons
}) => {
  return (
    <div className="containerView">
      <div className="container">
        <div className="jumbotron heading">
          <h1 className="">
            Meeting Timer
          </h1>
        </div>

        <CostEntry />
        <div className="row">
          <div className="col-xs-12 col-sm-3 col-md-4" />

          <div className="col-xs-12 col-sm-6 col-md-4">
            <ul className="nav nav-tabs">
              <li className={shouldShowTimerButtons ? 'active' : ''}>
                <a onClick={showTimerInput}>Timer</a>
              </li>
              <li className={shouldShowCalculatorInput ? 'active' : ''}>
                <a onClick={showCalculatorInput}>Calculator</a>
              </li>
            </ul>
            <Route path="/" exact component={ActionButtons} />
            <Route path="/calculator" component={CalculatorEntry} />
          </div>
          <div className="col-xs-12 col-sm-3 col-md-4" />
        </div>
      </div>
      <div className="row">
        <CostDisplay />
      </div>
    </div>
  );
};

ContainerView.contextTypes = {
  store: React.PropTypes.object
};

ContainerView.propTypes = {
  showTimerInput: PropTypes.func,
  showCalculatorInput: PropTypes.func,
  shouldShowCalculatorInput: PropTypes.bool,
  shouldShowTimerButtons: PropTypes.bool
};

const mapDispatchToProps = dispatch => {
  return {
    showTimerInput: () => {
      dispatch(push('/'));
    },
    showCalculatorInput: () => {
      dispatch(push('/calculator'));
    }
  };
};

const mapStateToProps = state => {
  return {
    shouldShowCalculatorInput: state.router.location.pathname == '/calculator',
    shouldShowTimerButtons: state.router.location.pathname == '/'
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerView);
