import { connect } from 'react-redux';
import React from 'react';
import { PropTypes } from 'prop-types';
import { calculate, setCalculatorTime } from './actions/actions';

const CalculatorEntry = ({ calculatorTimeChange, calculate, fieldsValid }) => {
  return (
    <div className="row">
      <div className="form-group">
        <label htmlFor="calculatorInput" value="Total meeting time" />
        <input
          id="calculatorInput"
          type="text"
          className="input form-control"
          placeholder="hh:mm"
          onChange={calculatorTimeChange}
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
    doCalculation: () => {
      dispatch(calculate);
    }
  };
};

var hasValidInputFields = state => {
  var y = !!(state.meetingCost.averageYearlyPay &&
    state.meetingCost.yearlyParticipants);
  var h = !!(state.meetingCost.averageHourlyPay &&
    state.meetingCost.hourlyParticipants);
  var c = !!state.calculatorEntry.time;
  return y || h || c;
};

let mapStateToProps = state => {
  return {
    calculatorTime: 'hours and minutes', //state.calculatorEntry.value,
    calculatorInputValid: true, // state.calculatorEntry.isValid
    fieldsValid: hasValidInputFields(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorEntry);
