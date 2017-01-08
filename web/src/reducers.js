import { combineReducers } from 'redux';
import * as Actions from './actions/actions.js'

const time = (state = { totalSeconds: 0 }, action) => {
  switch (action.type) {
    case Actions.timerTick.type:
      {
        return {
          ...state,
          totalSeconds: state.totalSeconds + 1
        }
      }
    case Actions.stopTimer.type: {
      return {
        ...state,
        totalSeconds: 0
      }
    }

    default: return state;
  }
}

const meetingCost = (state = { averageYearlyPay: 0, yearlyParticipants: 0, averageHourlyPay:0, hourlyParticipants:0, currentCost:0 }, action) => {
  switch (action.type) {
    case Actions.setAverageYearlyPay:
      return {
        ...state,
        averageYearlyPay: action.averagePay
      }
    case Actions.setNumberOfYearlyParticipants.type:
      return {
        ...state,
        yearlyParticipants: action.participants
      }
    case Actions.setAverageHourlyPay.type:
      return{
        ...state,
        averageHourlyPay: action.averagePay
      }
    case Actions.setNumberOfHourlyParticipants.type:
      return {
        ...state,
        hourlyParticipants: action.participants
      }
  }
  return state;
}

const timerRunning = (state = {
  timerStarted: false,
  timerPaused: false,
  startTimer: false,
  stopTimer: false,
  pauseTimer: false
}, action) => {
  switch (action.type) {
    case Actions.startTimer.type:
      return { startTimer: true };
    case Actions.stopTimer.type:
      return { stopTimer: true };
    case Actions.pauseTimer.type:
      return { pauseTimer: true };
    case Actions.timerStarted.type:
      return { timerStarted: true, timerPaused: false, startTimer: false };
    case Actions.timerStopped.type:
      return { timerStarted: false, timerPaused: false, stopTimer: false };
    case Actions.timerPaused.type:
      return { timerStarted: false, timerPaused: true, pauseTimer: false }; 
    default: return state;
  }
}

const loggingReducer = (state = "no state", action) => {
  console.log(action)
  return state;
}

let reducers = combineReducers({ time, meetingCost, timerRunning, loggingReducer });

export default reducers;
