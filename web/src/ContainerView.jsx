import React from 'react';
// import React, {PropTypes, Component} from 'react';
import ActionButtons from './ActionButtons.jsx';

import CostEntry from './CostEntry.jsx';
import CostDisplay from './CostDisplay.jsx';

const ContainerView = () => {
  return (
    <div className='containerView'>
      <div className='container'>
        <div className="jumbotron heading">
          <h1 className="">
            Meeting Timer
        </h1>
        </div>
        <div className='row'>
          <div className="col-xs-12 col-sm-3 col-md-5" />
          <div className="col-xs-12 col-sm-6 col-md-2">
            <CostEntry />
          </div>
          <div className="col-xs-12 col-sm-3 col-md-5" />
        </div>
        <div className='row'>
          <div className="col-xs-12 col-sm-3 col-md-5" />
          <div className="col-xs-12 col-sm-6 col-md-2">
            <ActionButtons />
          </div>
          <div className="col-xs-12 col-sm-3 col-md-5" />
        </div>
        <div className="row">
          <CostDisplay />
        </div>
      </div>
    </div>
  );
};

ContainerView.contextTypes = {
  store: React.PropTypes.object
};

export default ContainerView;
