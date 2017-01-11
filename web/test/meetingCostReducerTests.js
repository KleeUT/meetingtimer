import {meetingCost} from "../src/reducers.js";
import * as actions from "../src/actions/actions";  
import {expect} from 'chai';
describe("meeting cost reducer", () => {
    it("should update yearly paid participants", () =>{
        var output = meetingCost({},actions.setNumberOfYearlyParticipants(25));
        expect(output.yearlyParticipants).to.equal(25);
    });

    it("should update average yearly wage", () =>{
        var output = meetingCost({},actions.setAverageYearlyPay(123456789));
        expect(output.averageYearlyPay).to.equal(123456789);
    });

    it("should update hourly paid participants", () =>{
        var output = meetingCost({},actions.setNumberOfHourlyParticipants(31));
        expect(output.hourlyParticipants).to.equal(31);
    });

    it("should update average hourly wage", () =>{
        var output = meetingCost({},actions.setAverageHourlyPay(1000));
        expect(output.averageHourlyPay).to.equal(1000);
    })
});