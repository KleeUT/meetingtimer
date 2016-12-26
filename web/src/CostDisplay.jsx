import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

var CostDisplay = ({totalCost, totalSeconds, totalTime, timerRunning}) => {
  return (
    <div>
    <div className='costDisplay'>
      ${totalCost}
    </div>
    <div className={timerRunning? 'visible' : 'hidden' }>
      <div className='timeDisplay'>
          <label>Total Time:</label> {totalTime}
      </div>
    </div>
    <div className={timerRunning? 'hidden' : 'visible'}>
      
    </div>
    </div>

  );
};

CostDisplay.propTypes = {
  totalCost: PropTypes.string,
  totalSeconds: PropTypes.number,
  totalTime: PropTypes.string,
  timerRunning: PropTypes.bool
};

var mapStateToProps = (state) => {
  return {
    totalCost: "" + totalCostSoFar(state),
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
const secondsPerDay = secondsPerHour * 8;
const secondsPerWeek = secondsPerDay * 5;
const secondsPerYear = secondsPerWeek * 48;

function totalCostSoFar(state){
  return (calculateCostPerSecond(state.meetingCost.averagePay, state.meetingCost.participants) * state.time.totalSeconds).toFixed(2);
}

function calculateCostPerSecond(averageWage, participants) {
  return (averageWage/secondsPerYear) * participants;
}

function formatAsHoursMinutesSeconds(totalSeconds){
  let hours = Math.floor(totalSeconds/(secondsPerHour));
  let minutes = Math.floor((totalSeconds - hours * secondsPerHour)/secondsPerMinute)
  let seconds = totalSeconds % secondsPerMinute;
  return `${hours}:${minutes}:${seconds}`;
}

export default connect(mapStateToProps, mapDispatchToProps)(CostDisplay);
