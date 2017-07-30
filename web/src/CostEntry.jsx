import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  setAverageYearlyPay,
  setNumberOfYearlyParticipants,
  setAverageHourlyPay,
  setNumberOfHourlyParticipants
} from './actions/actions';

const CostEntry = ({
  averagePay,
  participants,
  onAveragePayChanged,
  onNumberOfParticipantsChanged,
  timerRunning,
  title
}) => {
  var style = {
    border: '2px solid',
    padding: '1em',
    'padding-top': '0',
    margin: '0.5em',
    'border-radius': '5px'
  };
  return (
    <div style={style}>
      <h2>{title}</h2>
      <div>
        <div className="form-group">
          <label htmlFor="attendeeInput">No. participants:</label>
          <input
            id="attendeeInput"
            type="number"
            className="form-control"
            value={participants}
            onChange={onNumberOfParticipantsChanged}
            disabled={timerRunning ? 'disabled' : ''}
          />
        </div>

        <div className="form-group">
          <label htmlFor="costInput">Average Wage:</label>
          <input
            id="costInput"
            type="number"
            className="form-control"
            value={averagePay}
            onChange={onAveragePayChanged}
            disabled={timerRunning ? 'disabled' : ''}
          />
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
};

const MeetingCostEntry = ({
  yearlyAveragePay,
  hourlyAveragePay,
  yearlyParticipants,
  hourlyParticipants,
  onYearlyAveragePayChanged,
  onHourlyAveragePayChanged,
  onNumberOfYearlyParticipantsChanged,
  onNumberOfHourlyParticipantsChanged
}) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-2 col-md-3" />
      <div className="col-xs-12 col-sm-4 col-md-3">
        <CostEntry
          title="Yearly"
          participants={yearlyParticipants}
          averagePay={yearlyAveragePay}
          onAveragePayChanged={onYearlyAveragePayChanged}
          onNumberOfParticipantsChanged={onNumberOfYearlyParticipantsChanged}
        />
      </div>
      <div className="col-xs-12 col-sm-4 col-md-3">
        <CostEntry
          title="Hourly"
          participants={hourlyParticipants}
          averagePay={hourlyAveragePay}
          onAveragePayChanged={onHourlyAveragePayChanged}
          onNumberOfParticipantsChanged={onNumberOfHourlyParticipantsChanged}
        />
      </div>
      <div className="col-xs-12 col-sm-2 col-md-3" />
    </div>
  );
};

MeetingCostEntry.propTypes = {
  yearlyAveragePay: PropTypes.number,
  hourlyAveragePay: PropTypes.number,
  yearlyParticipants: PropTypes.number,
  hourlyParticipants: PropTypes.number,
  onYearlyAveragePayChanged: PropTypes.func,
  onNumberOfYearlyParticipantsChanged: PropTypes.func,
  onHourlyAveragePayChanged: PropTypes.func,
  onNumberOfHourlyParticipantsChanged: PropTypes.func,
};

var mapStateToProps = state => {
  return {
    yearlyAveragePay: state.meetingCost.averageYearlyPay,
    hourlyAveragePay: state.meetingCost.averageHourlyPay,
    yearlyParticipants: state.meetingCost.yearlyParticipants,
    hourlyParticipants: state.meetingCost.hourlyParticipants,
    timerRunning: state.timerRunning.timerStarted
  };
};

var mapDispatchToProps = dispatch => {
  return {
    onYearlyAveragePayChanged: e => {
      dispatch(setAverageYearlyPay(Number(e.target.value)));
    },
    onNumberOfYearlyParticipantsChanged: e => {
      dispatch(setNumberOfYearlyParticipants(Number(e.target.value)));
    },
    onHourlyAveragePayChanged: e => {
      dispatch(setAverageHourlyPay(Number(e.target.value)));
    },
    onNumberOfHourlyParticipantsChanged: e => {
      dispatch(setNumberOfHourlyParticipants(Number(e.target.value)));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCostEntry);
