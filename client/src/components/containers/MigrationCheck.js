import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

import Loading from '../Loading';
class MigrationCheck extends Component{
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      loading: false,
      isMigrated: null,
      error: false
    }
  }

  clickHandler() {
    console.log(this.credentials);
  }

  renderLoading() {
    if (this.state.loading) {
      return <Loading />
    }
  }
  render() {
    return(
      <div className='main'>
        <p> Check if database has been migrated to the latest version </p>
        <Button bsSize='large' bsStyle='primary' onClick={this.clickHandler}>
        Generate Schema </Button>
        {this.renderLoading()}
      </div>
    )
  }
}

export default MigrationCheck;
