export const setAverageYearlyPay = (averagePay) => {
  return {
    type: 'SET_AVERAGE_YEARLY_PAY',
    averagePay
  };
};

export const setNumberOfYearlyParticipants = (participants) => {
  return {
    type: 'SET_NUMBER_OF_YEARLY_PARTICIPANTS',
    participants
  };
};

export const setAverageHourlyPay = (averagePay) => {
  return {
    type: 'SET_AVERAGE_HOURLY_PAY',
    averagePay
  };
};

export const setNumberOfHourlyParticipants = (participants) => {
  return {
    type: 'SET_NUMBER_OF_HOURLY_PARTICIPANTS',
    participants
  };
};

export const stopTimer = {
  type: 'STOP_TIMER'
};

export const startTimer = {
  type: 'START_TIMER'
};

export const timerStarted = {
  type: 'TIMER_STARTED'
};

export const pauseTimer = {
  type: 'PAUSE_TIMER'
}

export const timerPaused = {
  type: 'TIMER_PAUSED'
}

export const timerStopped = {
  type: 'TIMER_STOPPED'
};

export const timerTick = {
  type: 'TIMER_TICK'
};
