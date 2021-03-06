import {
  timerTick,
  timerStopped,
  timerStarted,
  timerPaused,
  resumeTimer,
  timerResumed
} from '../actions/actions.js';

export default class StopWatch {
  constructor(store) {
    this.store = store;
    this.unsubscribe = undefined;
    this.interval = undefined;
    this.everySecond = 1000;
  }

  listen() {
    this.unsubscribe = this.store.subscribe(this._stateupdated.bind(this));
  }

  _start() {
    this.interval = setInterval(() => {
      this.store.dispatch(timerTick);
    }, this.everySecond);
    this.store.dispatch(timerStarted);
  }

  _stop() {
    clearInterval(this.interval);
    this.store.dispatch(timerStopped);
  }

  _pause() {
    clearInterval(this.interval);
    this.store.dispatch(timerPaused);
  }

  _resume() {
    this.interval = setInterval(() => {
      this.store.dispatch(timerTick);
    }, this.everySecond);
    this.store.dispatch(timerResumed);
  }

  _stateupdated() {
    if (this.store.getState().timerRunning.startTimer) {
      this._start();
    }

    if (this.store.getState().timerRunning.pauseTimer) {
      this._pause();
    }

    if (this.store.getState().timerRunning.stopTimer) {
      this._stop();
    }

    if (this.store.getState().timerRunning.resumeTimer) {
      this._resume();
    }
  }

  _publishTicAction() {
    this.store.dispatch(timerTick);
  }
}
