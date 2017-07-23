import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { startTimer, stopTimer, pauseTimer } from './actions/actions';

const CalculatorEntry = ({ calculatorTimeChange, doCalculation }) => {
  return (
    <div className="row">
      <div className="form-group">
        <label for="calculatorInput" value="Total meeting time" />
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
          onClick={doCalculation}
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

CalculatorEntry.propTypes = {
  calculate: PropTypes.func,
  setCalculatorTime: PropTypes.func,
  calculatorTime: PropTypes.string
};

let mapDispatchToProps = dispatch => {
  return {
    calculatorTimeChange: (e) => {
      console.log(e);
    },
    doCalculation: () => {
      console.log('do the calcultion now');
    }
  };
};

let mapStateToProps = state => {
  return {
    calculatorTime: 'hours and minutes', //state.calculatorEntry.value,
    calculatorInputValid: true // state.calculatorEntry.isValid
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorEntry);
