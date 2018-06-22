import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

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
  componentDidMount(){

  }
  clickHandler() {
    this.setState({loading: true});
    console.log(this.credentials);
    fetch('/api/create-schema', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this.credentials,
    })
    .then(res => {
      console.log(res.text());
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
