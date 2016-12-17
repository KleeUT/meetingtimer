import React, {  PropTypes } from 'react';
import { connect } from 'react-redux';
import { setAveragePay, setNumberOfParticipants } from './actions/actions';

const ActionButtons = () => {
  return (
    <div>
      <button value="Button 1" className="btn btn-primary"/>
    </div>
  )
}


const CostEntry = ({averagePay, participants, onAveragePayChanged, onNumberOfParticipantsChanged }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="costInput">Average Yearly Wage:</label>
        <input id="costInput" type="number" className="form-control" value={averagePay} onChange={onAveragePayChanged} />
      </div>

      <div className="form-group">
        <label htmlFor="attendeeInput">Number of meeting participants:</label>
        <input id="attendeeInput" type="number" className="form-control" value={participants} onChange={onNumberOfParticipantsChanged} />
      </div>
      <ActionButtons />
    </div>
  );
};


CostEntry.propTypes = {
  averagePay: PropTypes.number,
  participants: PropTypes.number, 
  onAveragePayChanged: PropTypes.func,
  onNumberOfParticipantsChanged: PropTypes.func
}

var mapStateToProps = (state) => {
  return {
    averagePay: state.meetingCost.averagePay,
    participants: state.meetingCost.participants
  };
};

var mapDispatchToProps = (dispatch) => {
  return {
    onAveragePayChanged: (e) => {
      dispatch(setAveragePay(e.target.value));
    },
    onNumberOfParticipantsChanged: (e) => {
      dispatch(setNumberOfParticipants(e.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CostEntry);
