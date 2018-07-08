import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import HasCredentials from './HasCredentials';
import SchemaWizard from './SchemaWizard';
import DisplaySchema from './containers/DisplaySchema';
import CheckDatabase from './containers/CheckDatabase';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <HasCredentials path='/schema-wizard' exact={false} component={SchemaWizard} />
      <HasCredentials path='/view-schema' exact={true} component={DisplaySchema} />
      <HasCredentials path='/check-database' exact={true} component={CheckDatabase} />
    </Switch>

  )
}

export default Main;
