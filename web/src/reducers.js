import {combineReducers} from 'redux';

const time = (state = { totalSeconds: 0}, action) => {
  switch(action.type) {
        case "TIMER_TICK":
        {
          return {
            ... state,
            totalSeconds: state.totalSeconds + 1
          }
        }

      default: return state;
  }
}

const meetingCost = (state = {averagePay:0,participants:0}, action) => {
  switch(action.type){
    case 'SET_AVERAGE_PAY':
      return {
        ... state, 
        averagePay : action.averagePay
      }
    case 'SET_NUMBER_OF_PARTICIPANTS':
      return {
        ... state,
        participants: action.participants
      }
  }
  return state;
}

const timerRunning = (state = {}, action) => {
  switch(action.type){
    case "START_TIMER":
      return { startTimer: true, stopTimer: false};
    case "STOP_TIMER":
      return { startTimer: false,  stopTimer: true};
    case "TIMER_STARTED":
      return { timerStarted: true, startTimer: false,  stopTimer: false}
    case "TIMER_STOPPED":
      return { timerStarted: false, startTimer: false,  stopTimer: false}
    default : return state;
  }
}

const loggingReducer = (state = "no state", action) => {
  console.log(action)
  return state;
}

let reducers = combineReducers({time, meetingCost, timerRunning, loggingReducer});

export default reducers;
