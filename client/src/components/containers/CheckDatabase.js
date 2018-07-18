import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Loading from '../Loading';

class CheckDatabase extends Component{
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
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
    .then(res => {
      if (res.ok) {
        this.setState({loading: false, checked: true, error: false});
      }
    }).catch(err => {
      this.setState({loading:false, checked: false, error: err.message});
      console.log(err.message);
    })
  }
  renderError() {
    if (this.state.error) {
      return <p>Error: {this.state.error} </p>
    }
  }
  renderLoading() {
    if (this.state.loading) {
      return <Loading />
    }
  }
  renderChecked() {
    if(this.state.checked) {
      return <p> Data checked </p>
    }
  }
  render() {
    return (
      <div>
        <Button bsSize='large' disabled={this.state.loading}
        onClick={this.clickHandler}>Validate database</Button>
        {this.renderLoading()}
        {this.renderChecked()}
        {this.renderError()}
      </div>
    )
  }
}

export default CheckDatabase;
