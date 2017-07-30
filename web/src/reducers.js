import * as Actions from './actions/actions.js';
import { createLogger } from './util/WrapConsole';
export const time = (state = { totalSeconds: 0 }, action) => {
  switch (action.type) {
  case Actions.timerTick.type: {
    return {
      ...state,
      totalSeconds: state.totalSeconds + 1
    };
  }
  case Actions.stopTimer.type: {
    return {
      ...state,
      totalSeconds: 0
    };
  }

  default:
    return state;
  }
};

export const meetingCost = (
  state = {
    averageYearlyPay: 0,
    yearlyParticipants: 0,
    averageHourlyPay: 0,
    hourlyParticipants: 0,
    currentCost: 0
  },
  action
) => {
  switch (action.type) {
  case Actions.setAverageYearlyPay().type:
    return {
      ...state,
      averageYearlyPay: action.averagePay
    };
  case Actions.setNumberOfYearlyParticipants().type:
    return {
      ...state,
      yearlyParticipants: action.participants
    };
  case Actions.setAverageHourlyPay().type:
    return {
      ...state,
      averageHourlyPay: action.averagePay
    };
  case Actions.setNumberOfHourlyParticipants().type:
    return {
      ...state,
      hourlyParticipants: action.participants
    };
  case Actions.timerTick.type:
    return {
      ...state,
      currentCost: state.currentCost + calculatePerSecondCost(state)
    };
  case Actions.timerStopped.type:
    return {
      ...state,
      currentCost: 0
    };
  }
  return state;
};

const secondsPerMinute = 60;
const secondsPerHour = secondsPerMinute * 60;
const secondsPerDay = secondsPerHour * 8;
const secondsPerWeek = secondsPerDay * 5;
const secondsPerYear = secondsPerWeek * 48;

function calculatePerSecondCost(state) {
  let perSecondHourly = state.averageHourlyPay / secondsPerHour;
  let perSecondYearly = state.averageYearlyPay / secondsPerYear;

  return (
    perSecondHourly * state.hourlyParticipants +
    perSecondYearly * state.yearlyParticipants
  );
}

export const timerRunning = (
  state = {
    timerStarted: false,
    timerPaused: false,
    startTimer: false,
    stopTimer: false,
    pauseTimer: false
  },
  action
) => {
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
  default:
    return state;
  }
};

export const calculator = (state = { enteredTime: '' }, action) => {
  switch (action.type) {
  case Actions.setCalculatorTime().type:
    return {
      ...state,
      enteredTime: action.value,
      enteredTimeIsValid: validateEnteredTime(action.value)
    };
  case Actions.calculate.type:
    return {
      ...state,
      cost: validateEnteredTime(state.enteredTime) ? 1234 : 0
    };
  default:
    return state;
  }
};

const validateEnteredTime = timeString => {
  return timeString.match(/(\d*h)? ?(\d*m)?/); // must be in 123h 456m format
};

const actionLogger = createLogger('Action Logger');
export const loggingReducer = (state = 'no state', action) => {
  actionLogger.debug(action);
  return state;
};

let reducers = {
  time,
  meetingCost,
  timerRunning,
  loggingReducer,
  calculator
};

export default reducers;
