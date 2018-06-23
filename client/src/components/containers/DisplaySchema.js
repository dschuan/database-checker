import React, {Component} from 'react';
import Schema from '../Schema';

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
    const schemas = this.state.schemas;
    return schemas.map((schema) => {
      const title = schema.keys()[0];
      const content = schema[title];
      return <div><Schema title={title} content={content} /></div>
    })
  }
  render() {
    return (
      <div>
        {this.renderSchemas()}
      </div>
    )
  }
}

export default DisplaySchema;
