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
    currentCost: 0,
    calculator: {
      enteredTime: '',
      enteredTimeIsValid: false
    }
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
  case Actions.timerStarted.type:
    return {
      ...state,
      currentCost: 0
    };
  case Actions.setCalculatorTime().type:
    return {
      ...state,
      calculator: {
        enteredTime: action.value,
        enteredTimeIsValid: validateEnteredTime(action.value)
      }
    };
  case Actions.calculate.type:
    return {
      ...state,
      currentCost: validateEnteredTime(state.calculator.enteredTime)
        ? calculateCost(state)
        : 0
    };
  }
  return state;
};

function calculateCost(state) {
  if (!state.calculator.enteredTimeIsValid) {
    return state;
  }

  const hoursAndMinutes = extractTimeComponentsFromString(
    state.calculator.enteredTime
  );

  const costPerSecond = calculatePerSecondCost(state);
  const hoursCost = hoursAndMinutes.hours
    ? hoursAndMinutes.hours * secondsPerHour * costPerSecond
    : 0;
  const minutesCost = hoursAndMinutes.minutes
    ? hoursAndMinutes.minutes * secondsPerMinute * costPerSecond
    : 0;
  return hoursCost + minutesCost;
}

function extractTimeComponentsFromString(timeString) {
  const hours = findHoursComponent(timeString);
  const minutes = findMinutesComponent(timeString);
  return {
    hours: hours ? Number(hours) : 0,
    minutes: minutes ? Number(minutes) : 0
  };
}

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
    pauseTimer: false,
    resumeTimer: false
  },
  action
) => {
  switch (action.type) {
  case Actions.startTimer.type:
    return { ...state, startTimer: true };
  case Actions.stopTimer.type:
    return { ...state, stopTimer: true };
  case Actions.pauseTimer.type:
    return { ...state, pauseTimer: true };
  case Actions.resumeTimer.type:
    return { ...state, resumeTimer: true };
  case Actions.timerStarted.type:
    return {
      ...state,
      timerStarted: true,
      timerPaused: false,
      startTimer: false,
      resumeTimer: false
    };
  case Actions.timerStopped.type:
    return {
      ...state,
      timerStarted: false,
      timerPaused: false,
      stopTimer: false,
      resumeTimer: false
    };
  case Actions.timerPaused.type:
    return {
      ...state,
      timerStarted: false,
      timerPaused: true,
      pauseTimer: false,
      resumeTimer: false
    };
  case Actions.timerResumed.type:
    return {
      ...state,
      timerStarted: true,
      timerPaused: false,
      timerStopped: false,
      resumeTimer: false
    };
  default:
    return state;
  }
};

const validateEnteredTime = timeString => {
  if (!timeString) {
    return false;
  }

  const garunteeString = `${timeString}`;
  const hours = findHoursComponent(garunteeString);
  const minutes = findMinutesComponent(garunteeString);
  return rebuildStringToOriginalFormat(hours, minutes) === timeString;
};

const rebuildStringToOriginalFormat = (hours, minutes) =>
  `${hours ? `${hours}h` : ''}${hours && minutes ? ' ' : ''}${minutes ? `${minutes}m` : ''}`;
const findHoursComponent = timeString => {
  const matches = timeString.match(/(\d*\d)h/);
  return matches ? matches[1] : undefined;
};

const findMinutesComponent = timeString => {
  const matches = timeString.match(/(\d*\d)m/);
  return matches ? matches[1] : undefined;
};

const actionLogger = createLogger('Action Logger');
export const loggingReducer = (state = 'no state', action) => {
  actionLogger.debug(action);
  return state;
};

export default {
  time,
  meetingCost,
  timerRunning,
  loggingReducer
};
