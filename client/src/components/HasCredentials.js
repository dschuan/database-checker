import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';

class HasCredentials extends Component {
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
  }
  render() {
    if (this.credentials) {
      const credentials = this.credentials;
      return (
        <Route exact path={this.props.path}
        render={(props) => (
          React.createElement(this.props.component, {
            ...props, credentials
          })
        )} />
      )
    } else {
      return (
        <Redirect to='/' />
      )
    }
  }
}

export default HasCredentials;
