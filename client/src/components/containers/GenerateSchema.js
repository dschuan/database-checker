import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

class GenerateSchema extends Component{
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      loading: false,
      schemaGenerated: false,
    }
  }
  componentDidMount(){
    this.credentials = JSON.parse(this.credentials);
  }
  clickHandler() {
    this.setState({loading: true});
    console.log('click');
    fetch('/create-schema', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this.credentials,
    })
    .then(res => {
      console.log(res.body);
      this.setState({loading: false, schemaGenerated: true});
    })
  }
  renderConfirmation() {
    if (this.state.schemaGenerated) {
      return <p> Schema Generated! </p>
    }
  }
  renderLoading() {
    if (this.state.loading) {
      return <p> Loading... </p>
    }
  }
  render() {
    return(
      <div>
        <Button bsSize='large' onClick={this.clickHandler}>
        Generate Schema </Button>
        {this.renderConfirmation()}
        {this.renderLoading()}
      </div>
    )
  }
}

export default GenerateSchema
