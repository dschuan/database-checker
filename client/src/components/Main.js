import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import HasCredentials from './HasCredentials';
import SchemaWizard from './pages/SchemaWizard';
import DisplaySchema from './containers/DisplaySchema';
import DatabaseChecker from './pages/DatabaseChecker';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <HasCredentials path='/schema-wizard' exact={false} component={SchemaWizard} />
      <HasCredentials path='/view-schema' exact={true} component={DisplaySchema} />
      <HasCredentials path='/check-database' exact={true} component={DatabaseChecker} />
    </Switch>

  )
}

export default Main;
