import { connect } from 'react-redux';
import React from 'react';
import { PropTypes } from 'prop-types';
import { calculate, setCalculatorTime } from './actions/actions';

const CalculatorEntry = ({
  calculatorTimeChange,
  calculate,
  fieldsValid,
  calculatorTime
}) => {
  return (
    <div className="row">
      <div className="form-group">
        <label htmlFor="calculatorInput">Total meeting time</label>
        <input
          id="calculatorInput"
          type="text"
          className="input form-control"
          placeholder="2h 30m"
          onChange={calculatorTimeChange}
          value={calculatorTime}
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-primary form-control"
          onClick={calculate}
          disabled={fieldsValid ? '' : 'disabled'}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

CalculatorEntry.propTypes = {
  calculate: PropTypes.func,
  calculatorTimeChange: PropTypes.func,
  calculatorTime: PropTypes.string,
  fieldsValid: PropTypes.bool
};

let mapDispatchToProps = dispatch => {
  return {
    calculatorTimeChange: e => {
      dispatch(setCalculatorTime(e.target.value));
    },
    calculate: () => {
      dispatch(calculate);
    }
  };
};

var hasValidInputFields = state => {
  var y = !!(state.meetingCost.averageYearlyPay &&
    state.meetingCost.yearlyParticipants);
  var h = !!(state.meetingCost.averageHourlyPay &&
    state.meetingCost.hourlyParticipants);
  var c = !!state.meetingCost.calculator.enteredTimeIsValid;
  return (y || h) && c;
};

let mapStateToProps = state => {
  return {
    calculatorTime: state.meetingCost.calculator.enteredTime,
    calculatorInputValid: state.meetingCost.calculator.enteredTimeIsValid,
    fieldsValid: hasValidInputFields(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorEntry);
