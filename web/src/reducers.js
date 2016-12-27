import { combineReducers } from 'redux';

const time = (state = { totalSeconds: 0 }, action) => {
  switch (action.type) {
    case "TIMER_TICK":
      {
        return {
          ...state,
          totalSeconds: state.totalSeconds + 1
        }
      }
    case "STOP_TIMER": {
      return {
        ...state,
        totalSeconds: 0
      }
    }

    default: return state;
  }
}

const meetingCost = (state = { averagePay: 0, participants: 0 }, action) => {
  switch (action.type) {
    case 'SET_AVERAGE_PAY':
      return {
        ...state,
        averagePay: action.averagePay
      }
    case 'SET_NUMBER_OF_PARTICIPANTS':
      return {
        ...state,
        participants: action.participants
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
    case "START_TIMER":
      return { startTimer: true };
    case "STOP_TIMER":
      return { stopTimer: true };
    case "PAUSE_TIMER":
      return { pauseTimer: true };
    case "TIMER_STARTED":
      return { timerStarted: true, timerPaused: false, startTimer: false };
    case "TIMER_STOPPED":
      return { timerStarted: false, timerPaused: false, stopTimer: false };
    case "TIMER_PAUSED":
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
