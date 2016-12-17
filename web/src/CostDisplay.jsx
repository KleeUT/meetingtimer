import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

var CostDisplay = ({totalCost}) => {
  return (
    <div className='timeDisplay'>
      ${totalCost}
    </div>
  );
};

CostDisplay.propTypes = {
  totalCost: PropTypes.string
};

var mapStateToProps = (state) => {
  return {
    seconds: calculateCostPerSecond(state.meetingCost.averagePay, state.meetingCost.participants) * state.time.totalSeconds
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
  return (averageWage/secondsPerYear) * participants;
}

export default connect(mapStateToProps, mapDispatchToProps)(CostDisplay);
