import { connect } from 'react-redux';
import React from 'react';
import { PropTypes } from 'prop-types';
import { startTimer, stopTimer, pauseTimer, resumeTimer } from './actions/actions';

const ActionButtons = ({
  startTimer,
  stopTimer,
  timerRunning,
  timerPaused,
  fieldsValid,
  pauseTimer,
  resumeTimer
}) => {
  return (
    <div className="row">
      <div className={timerRunning ? 'hidden' : 'visible'}>
        <div className="form-group">
          <button
            className="btn btn-primary form-control"
            onClick={timerPaused ? resumeTimer : startTimer}
            disabled={fieldsValid ? '' : 'disabled'}
          >
            {timerPaused ? 'Resume' : 'Start'}
          </button>
        </div>
      </div>
      <div className={timerRunning ? 'visible' : 'hidden'}>
        <div className="form-group">
          <button className="btn btn-warning form-control" onClick={pauseTimer}>
            Pause
          </button>
        </div>
        <div className="form-group">
          <button className="btn btn-danger form-control" onClick={stopTimer}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

ActionButtons.propTypes = {
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
  pauseTimer: PropTypes.func,
  resumeTimer: PropTypes.func,
  timerRunning: PropTypes.bool,
  timerPaused: PropTypes.bool,
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
    },
    resumeTimer: () => {
      dispatch(resumeTimer);
    }
  };
};

let mapStateToProps = state => {
  return {
    timerRunning: state.timerRunning.timerStarted,
    timerPaused: state.timerRunning.timerPaused,
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
