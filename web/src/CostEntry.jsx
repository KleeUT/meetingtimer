import React, {  PropTypes } from 'react';
import { connect } from 'react-redux';
import { setAveragePay, setNumberOfParticipants } from './actions/actions';

const CostEntry = ({averagePay, participants, onAveragePayChanged, onNumberOfParticipantsChanged, timerRunning }) => {
  return (
    <div className={timerRunning? 'hidden' : 'visible'}>
      <div className="form-group">
        <label htmlFor="costInput">Average Yearly Wage:</label>
        <input id="costInput" type="number" className="form-control" value={averagePay} onChange={onAveragePayChanged} />
      </div>

      <div className="form-group">
        <label htmlFor="attendeeInput">Number of meeting participants:</label>
        <input id="attendeeInput" type="number" className="form-control" value={participants} onChange={onNumberOfParticipantsChanged} />
      </div>
    </div>
  );
};


CostEntry.propTypes = {
  averagePay: PropTypes.number,
  participants: PropTypes.number, 
  onAveragePayChanged: PropTypes.func,
  onNumberOfParticipantsChanged: PropTypes.func,
  timerRunning: PropTypes.bool
}

var mapStateToProps = (state) => {
  return {
    averagePay: state.meetingCost.averagePay,
    participants: state.meetingCost.participants,
    timerRunning: state.timerRunning.timerStarted
  };
};

var mapDispatchToProps = (dispatch) => {
  return {
    onAveragePayChanged: (e) => {
      dispatch(setAveragePay(Number(e.target.value)));
    },
    onNumberOfParticipantsChanged: (e) => {
      dispatch(setNumberOfParticipants(Number(e.target.value)));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CostEntry);
