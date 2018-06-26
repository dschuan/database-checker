import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Loading from '../Loading';

class CheckDatabase extends Component{
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      results:'',
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
    .then(data => {
      console.log(data);
      const results = JSON.stringify(data, null, 2);
      this.setState({results, loading: false, schemaGenerated: true});
    }).catch(err => {
      this.setState({error:true});
      console.log(err.stack);
    })
  }
  renderLoading() {
    if (this.state.loading) {
      return <Loading />
    }
  }
  render() {
    console.log(this.state.results)
    return (
      <div>
        <Button bsSize='large' onClick={this.clickHandler}>Validate database</Button>
        {this.renderLoading()}
      </div>
    )
  }
}

export default CheckDatabase;
