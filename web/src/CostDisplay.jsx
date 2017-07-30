import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

var CostDisplay = ({ totalCost, totalTime, timerRunning }) => {
  let style = {
    background: 'rgba(255,255,255,0.7)'
  };
  return (
    <div style={style}>
      <div className="costDisplay">
        ${totalCost}
      </div>
      <div className={timerRunning ? 'visible' : 'hidden'}>
        <div className="timeDisplay">
          <label>Total Time:</label> {totalTime}
        </div>
      </div>
      <div className={timerRunning ? 'hidden' : 'visible'} />
    </div>
  );
};

CostDisplay.propTypes = {
  totalCost: PropTypes.string,
  totalSeconds: PropTypes.number,
  totalTime: PropTypes.string,
  timerRunning: PropTypes.bool
};

var mapStateToProps = state => {
  return {
    totalCost: state.meetingCost.currentCost.toFixed(2),
    totalSeconds: state.time.totalSeconds,
    totalTime: formatAsHoursMinutesSeconds(state.time.totalSeconds),
    timerRunning: state.timerRunning.timerStarted
  };
};

var mapDispatchToProps = () => {
  return {};
};

const secondsPerMinute = 60;
const secondsPerHour = secondsPerMinute * 60;

function formatAsHoursMinutesSeconds(totalSeconds) {
  let hours = Math.floor(totalSeconds / secondsPerHour);
  let minutes = Math.floor(
    (totalSeconds - hours * secondsPerHour) / secondsPerMinute
  );
  let seconds = totalSeconds % secondsPerMinute;
  return `${hours}:${minutes}:${seconds}`;
}

export default connect(mapStateToProps, mapDispatchToProps)(CostDisplay);
