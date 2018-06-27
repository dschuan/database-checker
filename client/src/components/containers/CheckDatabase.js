import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Loading from '../Loading';
import ResultsList from './ResultsList';

class CheckDatabase extends Component{
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      results:[],
      loading: false,
      checked: false,
      error: false
    }
  }
  componentDidMount() {
    //for history info
  }

  clickHandler() {
    this.setState({loading: true, checked: false, error: false});
    fetch('/api/check-database', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this.credentials,
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const results = data.keys;
      this.setState({results, loading: false, schemaGenerated: true});
    }).catch(err => {
      this.setState({error:true});
      console.log(err.stack);
    })
  }
  renderError() {
    if (this.state.error) {
      return <p>Error, contact admin for instructions </p>
    }
  }
  renderLoading() {
    if (this.state.loading) {
      return <Loading />
    }
  }
  renderResult() {
    if(this.state.results.length > 0) {
      return <ResultsList res={this.state.results} />
    }
  }
  render() {
    console.log(this.state.results)
    return (
      <div>
        <Button bsSize='large' disabled={this.state.loading}
        onClick={this.clickHandler}>Validate database</Button>
        {this.renderLoading()}
        {this.renderResult()}
        {this.renderError()}
      </div>
    )
  }
}

export default CheckDatabase;
