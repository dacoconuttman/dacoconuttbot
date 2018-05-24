import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDevices, setDevice } from '../actions/actions';

class Devices extends Component {
  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getDevices());
  }

  handleClick(id) {
    const { dispatch } = this.props;
    dispatch(setDevice(id));
  }

  render() {
    const { devices } = this.props;
    const { list, loading, currentId } = devices;

    return (
      <div>
        <div className="device-list">
          Select a device
        {list.map(device => {
          console.log(device.id);
            return (
              <div className="device-card" key={device.id} onClick={(e) => this.handleClick(device.id)}>
                <div className="device-name">{device.name}</div>
                <div className="device-id">{device.id.substring(0, 8)}...</div>
              </div>
            )
          })}
        </div>
        <div>Current device: {list.filter(device => device.id = currentId)}</div>
      </div>
    );
  }
}

export default connect(state => state)(Devices);