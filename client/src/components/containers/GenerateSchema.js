import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import Loading from '../Loading.js';
import '../../stylesheets/generate-schema.css';

class GenerateSchema extends Component{
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      loading: false,
      schemaGenerated: false,
      error: false
    }
  }

  clickHandler() {
    this.setState({loading: true, schemaGenerated: false, error: false});
    console.log(this.credentials);
    fetch('/api/create-schema', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this.credentials,
    })
    .then(data => {
      console.log(data);
      this.setState({loading: false, schemaGenerated: true});
    })
  }
  renderConfirmation() {
    if (this.state.schemaGenerated) {
      return <p> Schema Generated! </p>
    } else if (this.state.error) {
      return <div><p> Error </p> <Link to='/'>Enter your credentials again </Link></div>
    }
  }
  renderLoading() {
    if (this.state.loading) {
      return <Loading />
    }
  }
  render() {
    return(
      <div className='main'>
        <Button bsSize='large' bsStyle='primary' onClick={this.clickHandler}>
        Generate Schema </Button>
        {this.renderConfirmation()}
        {this.renderLoading()}
      </div>
    )
  }
}

export default GenerateSchema
