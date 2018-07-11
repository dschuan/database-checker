import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import Loading from '../Loading';
class MigrationCheck extends Component{
  constructor(props) {
    super(props);
    this.rocketInfo = sessionStorage.getItem('rocketinfo');
    this.credentials = sessionStorage.getItem('credentials');
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      loading: false,
      isMigrated: null,
      error: false
    }
  }

  clickHandler() {
    console.log(this.rocketInfo);
    this.setState({loading: true});
    fetch('/api/check-migration', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({credentials: this.credentials, rocketInfo: this.rocketInfo}),
    })
    .then(res => res.text())
    .then(data => {
      if (data === 'true') {
        this.setState({loading: false, error: false, isMigrated: data});
      } else {
        this.setState({loading: false, error:true})
      }
    }).catch(err => {
      this.setState({loading: false, isMigrated: null, error: true});
    })
  }

  renderLoading() {
    if (this.state.loading) {
      return <Loading />
    }
  }
  renderError() {
    if (this.state.error) {
      return <p> Error, contact an administrator </p>
    }
  }
  renderConfirmation() {
    if (this.state.isMigrated && this.state.isMigrated ==='true') {
      return <p> Database is up to date with target version </p>
    } else if (this.state.isMigrated && this.state.isMigrated === 'false'){
      return <p> Database is not up to date. </p>
    }
  }
  render() {
    return(
      <div className='main'>
        <p> Check if database has been migrated to the latest version </p>
        <Button bsSize='large' bsStyle='primary' onClick={this.clickHandler}>
        Run Check </Button>
        {this.renderLoading()}
        {this.renderError()}
        {this.renderConfirmation()}
      </div>
    )
  }
}

export default MigrationCheck;
