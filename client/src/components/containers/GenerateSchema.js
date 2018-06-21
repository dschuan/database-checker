import React, {Component} from 'react';
import {Button} from 'react-bootstrap';

const ScanSchema = require('../../modules/schema-scan');

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
    ScanSchema(this.credentials, (err, res) => {
      if (res) {
        this.setState({loading: false, schemaGenerated: true});
      }
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
