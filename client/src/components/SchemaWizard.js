import React, {Component} from 'react';
import {Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Switch} from 'react-router-dom';

import HasCredentials from './HasCredentials';
import GenerateSchema from './containers/GenerateSchema';
import MigrationCheck from './containers/MigrationCheck';
import RocketChatDetails from './RocketChatDetails';
import '../stylesheets/schema-wizard.css';

class SchemaWizard extends Component {
  constructor(props) {
    super(props);
    this.state = { tabSelected: 0};
    this.handleSelect = this.handleSelect.bind(this);
  }
  handleSelect(e) {
    this.setState({tabSelected: e});
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.tabSelected} onSelect={this.handleSelect}>
          <LinkContainer to='/schema-wizard/generate-schema'>
            <NavItem eventKey="1">Generate Schema </NavItem>
          </LinkContainer>
          <LinkContainer to='/schema-wizard/migration-check'>
            <NavItem eventKey="2">Migration Check </NavItem>
          </LinkContainer>
        </Nav>
        <Switch>
          <HasCredentials path='/' exact={true} component={RocketChatDetails} />
          <HasCredentials path='/schema-wizard/generate-schema' component={GenerateSchema} />
          <HasCredentials path='/schema-wizard/migration-check' component={MigrationCheck} />
        </Switch>
      </div>
    )
  }
}
export default SchemaWizard;
