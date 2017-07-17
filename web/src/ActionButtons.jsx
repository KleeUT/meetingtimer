import { connect } from 'react-redux';
import { PropTypes } from 'react';
import { startTimer, stopTimer, pauseTimer } from './actions/actions';
const ActionButtons = ({
  startTimer,
  stopTimer,
  timerRunning,
  fieldsValid,
  pauseTimer
}) => {
  return (
    <div className="row">
      <div className={timerRunning ? 'hidden' : 'visible'}>
        <button
          className="btn btn-primary form-control"
          onClick={startTimer}
          disabled={fieldsValid ? '' : 'disabled'}
        >
          Start
        </button>
      </div>
      <div className={timerRunning ? 'visible' : 'hidden'}>
        <div className="form-group">
          <button className="btn btn-warning form-control" onClick={pauseTimer}>
            Pause
          </button>
        </div>
        <div className="form-group">
          <button className="btn btn-danger form-control" onClick={stopTimer}>
            Stop/Reset
          </button>
        </div>
      </div>
    </div>
  );
};

ActionButtons.propTypes = {
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  timerRunning: PropTypes.bool,
  fieldsValid: PropTypes.bool
};

let mapDispatchToProps = dispatch => {
  return {
    startTimer: () => {
      dispatch(startTimer);
    },
    stopTimer: () => {
      dispatch(stopTimer);
    },
    pauseTimer: () => {
      dispatch(pauseTimer);
    }
  };
};

let mapStateToProps = state => {
  return {
    timerRunning: state.timerRunning.timerStarted,
    fieldsValid: hasValidFields(state)
  };
};

var hasValidFields = state => {
  var y = !!(state.meetingCost.averageYearlyPay &&
    state.meetingCost.yearlyParticipants);
  var h = !!(state.meetingCost.averageHourlyPay &&
    state.meetingCost.hourlyParticipants);
  return y || h;
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);

//   yearlyAveragePay: PropTypes.number,
//   hourlyAveragePay: PropTypes.number,
//   yearlyParticipants: PropTypes.number,
//   hourlyParticipants: PropTypes.number,
