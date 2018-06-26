import React, {Component} from 'react';
import Schema from '../Schema';

import '../../stylesheets/display-schema.css';

class DisplaySchema extends Component{
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
    this.state = {schemas: []};
  }
  componentDidMount() {
    if (this.credentials) {
      this.credentials = JSON.parse(this.credentials);
    }
    fetch('/api/get-schema')
    .then(res => res.json())
    .then(schemas => {
      this.setState({schemas: schemas.data});
    });

  }
  renderSchemas() {
      if (this.state.schemas.length > 0){
        const schemas = this.state.schemas;
        return schemas.map((schema) => {
          console.log();
          const key = Object.keys(schema)[0];
          const title = key.toString();
          const field = schema[key];
          const content = typeof field === 'object' && Object.keys(field).length > 0 ?
            JSON.stringify(schema[key], null, 2) : 'None';
          return <div><Schema title={title} content={content} /></div>
      })
    } else {
      return 'Loading';
    }
  }
  render() {
    return (
      <div className='schema-list'>
        {this.renderSchemas()}
      </div>
    )
  }
}

export default DisplaySchema;
