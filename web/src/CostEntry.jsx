import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setAverageYearlyPay, setNumberOfYearlyParticipants, setAverageHourlyPay, setNumberOfHourlyParticipants } from './actions/actions';

const CostEntry = ({averagePay, participants, onAveragePayChanged, onNumberOfParticipantsChanged, timerRunning, title}) => {
  var style = {
    border: "2px solid",
    padding: "1em",
    "padding-top": "0",
    margin: "0.5em",
    "border-radius": "5px"
  }
  return (
    <div style={style}>
      <h2>{title}</h2>
      <div>
        <div className="form-group">
          <label htmlFor="attendeeInput">No. participants:</label>
          <input id="attendeeInput" type="number" className="form-control" value={participants} onChange={onNumberOfParticipantsChanged} disabled={timerRunning ? 'disabled' : ''} />
        </div>

        <div className="form-group">
          <label htmlFor="costInput">Average Wage:</label>
          <input id="costInput" type="number" className="form-control" value={averagePay} onChange={onAveragePayChanged} disabled={timerRunning ? 'disabled' : ''} />
        </div>
      </div>
    </div>
  );
};

CostEntry.propTypes = {
  averagePay: PropTypes.number,
  participants: PropTypes.number,
  onAveragePayChanged: PropTypes.func,
  onNumberOfParticipantsChanged: PropTypes.func,
  timerRunning: PropTypes.bool,
  title: PropTypes.String
}

const MeetingCostEntry = (
  {
    yearlyAveragePay,
    yearlyParticipants,
    onYearlyAveragePayChanged,
    onNumberOfYearlyParticipantsChanged,
    timerRunning}
) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-2 col-md-3" />
      <div className="col-xs-12 col-sm-4 col-md-3">
        <CostEntry title="Yearly" participants={yearlyParticipants} averagePay={yearlyAveragePay} onAveragePayChanged={onYearlyAveragePayChanged} onNumberOfParticipantsChanged={onNumberOfYearlyParticipantsChanged} />
      </div>
      <div className="col-xs-12 col-sm-4 col-md-3" >
        <CostEntry title="Hourly" />
      </div>
      <div className="col-xs-12 col-sm-2 col-md-3" />
    </div>
    );
}

MeetingCostEntry.propTypes = {
  yearlyAveragePay: PropTypes.number,
  hourlyAveragePay: PropTypes.number,
  yearlyParticipants: PropTypes.number,
  hourlyParticipants: PropTypes.number,
  onYearlyAveragePayChanged: PropTypes.func,
  onNumberOfYearlyParticipantsChanged: PropTypes.func,
  onAverageHourlyPayChanged: PropTypes.func,
  onNumberOfHourlyParticipantsChanged: PropTypes.func,
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
    onAverageYearlyPayChanged: (e) => {
      dispatch(setAverageYearlyPay(Number(e.target.value)));
    },
    onNumberOfYearlyParticipantsChanged: (e) => {
      dispatch(setNumberOfParticipants(Number(e.target.value)));
    },
    onAverageHourlyPayChanged: (e) => {
      dispatch(setAverageHourlyPay(Number(e.target.value)));
    },
    onNumberOfHourlyParticipantsChanged: (e) => {
      dispatch(setAverageHourlyPay(Number(e.target.value)));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCostEntry);
