import { meetingCost } from '../src/reducers.js';
import * as actions from '../src/actions/actions';
import { expect } from 'chai';
describe('Meeting cost reducer: ', () => {
  it('should update yearly paid participants', () => {
    let output = meetingCost({}, actions.setNumberOfYearlyParticipants(25));
    expect(output.yearlyParticipants).to.equal(25);
  });

  it('should update average yearly wage', () => {
    let output = meetingCost({}, actions.setAverageYearlyPay(123456789));
    expect(output.averageYearlyPay).to.equal(123456789);
  });

  it('should update hourly paid participants', () => {
    let output = meetingCost({}, actions.setNumberOfHourlyParticipants(31));
    expect(output.hourlyParticipants).to.equal(31);
  });

  it('should update average hourly wage', () => {
    let output = meetingCost({}, actions.setAverageHourlyPay(1000));
    expect(output.averageHourlyPay).to.equal(1000);
  });

  describe('should update current cost on timer tick', () => {
    it('Just Hourly', () => {
      let events = [
        actions.setNumberOfHourlyParticipants(1),
        actions.setAverageHourlyPay(360)
      ];

      let previousState = givenEventsProcessed(events);

      let output = meetingCost(previousState, actions.timerTick);
      expect(output.currentCost).to.equal(0.1);
    });

    it('Just Yearly', () => {
      let events = [
        actions.setNumberOfYearlyParticipants(5),
        actions.setAverageYearlyPay(50000)
      ];

      let previousState = givenEventsProcessed(events);

      let output = meetingCost(previousState, actions.timerTick);
      expect(output.currentCost).to.equal(0.03616898148148148);
    });

    it('Yearly and Hourly', () => {
      let events = [
        actions.setNumberOfYearlyParticipants(5),
        actions.setAverageYearlyPay(50000),
        actions.setNumberOfHourlyParticipants(1),
        actions.setAverageHourlyPay(360)
      ];

      let previousState = givenEventsProcessed(events);

      let output = meetingCost(previousState, actions.timerTick);
      expect(output.currentCost).to.equal(0.13616898148148148);
    });
  });

  it('should set total cost to zero when stopped', () => {
    let events = [
      actions.setNumberOfYearlyParticipants(5),
      actions.setAverageYearlyPay(50000),
      actions.setNumberOfHourlyParticipants(1),
      actions.setAverageHourlyPay(360),
      actions.timerTick
    ];

    let previousState = givenEventsProcessed(events);

    let output = meetingCost(previousState, actions.timerStopped);
    expect(output.currentCost).to.equal(0);
  });
});

function givenEventsProcessed(events) {
  return events.reduce((p, c) => {
    return meetingCost(p, c);
  }, undefined);
}
