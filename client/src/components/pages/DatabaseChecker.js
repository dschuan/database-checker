import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Switch} from 'react-router-dom';

import HasCredentials from '../HasCredentials';
import CheckDatabase from '../containers/CheckDatabase';

import '../../stylesheets/schema-wizard.css';

class SchemaWizard extends Component {
  constructor(props) {
    super(props);
    this.state = { tabSelected: -1};
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    this.setState({tabSelected: e});
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.tabSelected} onSelect={this.handleSelect}>
          <LinkContainer to='/check-database'>
            <NavItem eventKey="1">Home </NavItem>
          </LinkContainer>
          <LinkContainer to='/check-database/display-results'>
            <NavItem eventKey="2">Generate Schema </NavItem>
          </LinkContainer>

        </Nav>
        <Switch>
          <HasCredentials path='/check-database' exact={true} component={CheckDatabase} />

        </Switch>
      </div>
    )
  }
}
export default SchemaWizard;
