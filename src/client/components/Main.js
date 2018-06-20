import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import HasCredentials from './HasCredentials';
import GenerateSchema from './containers/GenerateSchema';

const Main = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <HasCredentials path='/generate-schema' component={GenerateSchema} />
      <HasCredentials path='/view-schema' component={Home} />
      <HasCredentials path='/check-database' component={Home} />
    </Switch>

  )
}

export default Main;
