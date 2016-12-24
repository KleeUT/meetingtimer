import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

var CostDisplay = ({totalCost, totalSeconds, totalTime}) => {
  return (
    <div>
    <div className='timeDisplay'>
      ${totalCost}
    </div>
    <div>
    <label>Total Time:</label> {totalTime}
    </div>
    </div>

  );
};

CostDisplay.propTypes = {
  totalCost: PropTypes.number,
  totalSeconds: PropTypes.number,
  totalTime: PropTypes.string
};

var mapStateToProps = (state) => {
  return {
    totalCost: calculateCostPerSecond(state.meetingCost.averagePay, state.meetingCost.participants) * state.time.totalSeconds,
    totalSeconds: state.time.totalSeconds,
    totalTime: formatAsHoursMinutesSeconds(state.time.totalSeconds)
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
function calculateCostPerSecond(averageWage, participants) {
  let totalCost = (averageWage/secondsPerYear) * participants;
  return Math.round(totalCost * 100)/100;
}

function formatAsHoursMinutesSeconds(totalSeconds){
  let hours = Math.floor(totalSeconds/(secondsPerHour));
  let minutes = Math.floor((totalSeconds - hours * secondsPerHour)/secondsPerMinute)
  let seconds = totalSeconds % secondsPerMinute;
  return `${hours}:${minutes}:${seconds}`;
}

export default connect(mapStateToProps, mapDispatchToProps)(CostDisplay);
