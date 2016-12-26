import {connect} from 'react-redux'
import React, {PropTypes} from 'react';
import {startTimer, stopTimer} from './actions/actions'
const ActionButtons = ({startTimer, stopTimer, timerRunning, fieldsValid}) => {
    return (
        <div className="row">
            <div className={timerRunning? 'hidden' : 'visible'}>
                <button className="btn btn-primary form-control" onClick={startTimer} disabled={fieldsValid ? '' : 'disabled'}>Start</button>
            </div>
            <div className={timerRunning? 'visible' : 'hidden'}>
                <button className="btn btn-warning form-control" onClick={stopTimer}>Stop</button>        
            </div>
        </div>
    )
}

ActionButtons.propTypes = {
    startTimer:PropTypes.func,
    stopTimer:PropTypes.func,
    timerRunning: PropTypes.bool,
    fieldsValid: PropTypes.bool
}

let mapDispatchToProps = (dispatch) => {
    return {
        startTimer: () => {
            dispatch(startTimer)
        },
        stopTimer: () => {
            dispatch(stopTimer)
        }
    }
}

let mapStateToProps = (state) =>{
    return {
        timerRunning: state.timerRunning.timerStarted,
        fieldsValid: !!(state.meetingCost.averagePay && state.meetingCost.participants)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);