import { expect } from 'chai';
import { meetingCost as reducer } from '../src/reducers';
import * as Actions from '../src/actions/actions';
describe('Calculator Reducer: ', () => {
  it('Should store time irrespective of validity', () => {
    const state = reducer({}, Actions.setCalculatorTime('2h 30m'));
    expect(state.calculator.enteredTime).to.eq('2h 30m');
  });
  [
    { time: '2h 30m', shouldBeValid: true },
    { time: '30m', shouldBeValid: true },
    { time: '2h', shouldBeValid: true },
    { time: '2d', shouldBeValid: false },
    { time: '1m 1m', shouldBeValid: false },
    { time: '1h 1h', shouldBeValid: false },
    { time: 'h', shouldBeValid: false },
    { time: 'm', shouldBeValid: false },
    { time: 'fishies', shouldBeValid: false },
    { time: 2, shouldBeValid: false },
    { time: '2h 30m 3', shouldBeValid: false },
    { time: '3', shouldBeValid: false },
    { time: null, shouldBeValid: false },
    { time: undefined, shouldBeValid: false }
  ].forEach(({ time, shouldBeValid }) => {
    it(`Should identify ${time} as ${shouldBeValid ? 'valid' : 'invalid'}`, () => {
      const state = reducer({}, Actions.setCalculatorTime(time));
      expect(state.calculator.enteredTimeIsValid).to.eq(shouldBeValid);
    });
  });

  it('Should calclulate cost for yearly employees.', () => {
    const previousState = {
      averageYearlyPay: 100000,
      yearlyParticipants: 1,
      averageHourlyPay: 0,
      hourlyParticipants: 0,
      currentCost: 0,
      calculator: {
        enteredTime: '1h',
        enteredTimeIsValid: true
      }
    };

    const newState = reducer(previousState, Actions.calculate);
    expect(newState.currentCost).to.equal(52.083333333333336);
  });

  it('Should calclulate cost for hourly employees.', () => {
    const previousState = {
      averageYearlyPay: 0,
      yearlyParticipants: 0,
      averageHourlyPay: 100,
      hourlyParticipants: 1,
      currentCost: 0,
      calculator: {
        enteredTime: '1h',
        enteredTimeIsValid: true
      }
    };

    const newState = reducer(previousState, Actions.calculate);
    expect(newState.currentCost).to.equal(100);
  });

  it('Should calclulate cost for an hour.', () => {
    const previousState = {
      averageYearlyPay: 0,
      yearlyParticipants: 0,
      averageHourlyPay: 100,
      hourlyParticipants: 1,
      currentCost: 0,
      calculator: {
        enteredTime: '1h',
        enteredTimeIsValid: true
      }
    };

    const newState = reducer(previousState, Actions.calculate);
    expect(newState.currentCost).to.equal(100);
  });

  it('Should calclulate cost for 30 minutes.', () => {
    const previousState = {
      averageYearlyPay: 0,
      yearlyParticipants: 0,
      averageHourlyPay: 100,
      hourlyParticipants: 1,
      currentCost: 0,
      calculator: {
        enteredTime: '30m',
        enteredTimeIsValid: true
      }
    };

    const newState = reducer(previousState, Actions.calculate);
    expect(newState.currentCost).to.equal(50);
  });

  it('Should calclulate cost for an hour and 30 minutes.', () => {
    const previousState = {
      averageYearlyPay: 0,
      yearlyParticipants: 0,
      averageHourlyPay: 100,
      hourlyParticipants: 1,
      currentCost: 0,
      calculator: {
        enteredTime: '1h 30m',
        enteredTimeIsValid: true
      }
    };

    const newState = reducer(previousState, Actions.calculate);
    expect(newState.currentCost).to.equal(150);
  });
});
