import {timerTick, timerStopped, timerStarted} from '../actions/actions.js';

export default class StopWatch {
  constructor(store){
    this.store = store;
    this.unsubscribe = undefined;
    this.interval = undefined;
    this.everySecond = 1000;
  }

  listen(){
    this.unsubscribe = store.subscribe(this._stateupdated.bind(this));
  }

  _start(){
    this.interval = setInterval(() => {
      this.store.dispatch(timerTick);
    }, this.everySecond0);
    this.store.dispatch(timerStarted);
  }

  _stop(){
    clearInterval(this.interval);
    this.store.dispatch(timerStopped);
  }

  _stateupdated(){
    if(this.store.getState().timerRunning.startTimer){
      this._start();
    }

    if (this.store.getState().timerRunning.stopTimer){
      this._stop();
    }
  }

  _publishTicAction(){
    this.store.dispatch(timerTick);
  }
}
