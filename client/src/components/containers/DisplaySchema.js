import React, {Component} from 'react';
import Schema from './Schema';
import Loading from '../Loading';
import '../../stylesheets/display-schema.css';

class DisplaySchema extends Component{
  constructor(props) {
    super(props);
    this.credentials = sessionStorage.getItem('credentials');
    this.state = {schemas: [], error:''};
  }
  componentDidMount() {
    if (this.credentials) {
      this.credentials = JSON.parse(this.credentials);
    }
    fetch('/api/get-schema-list')
    .then(res => res.json())
    .then(schemas => {
      this.setState({schemas: schemas.data});
    }).catch(err => {
      this.setState({error: err.stack});
    });

  }
  renderError() {
    return(
      <div>
        <h1>Error</h1>
        <p> {this.state.error} </p>
      </div>
    )
  }
  renderSchemas() {
      if (this.state.schemas.length > 0){
        const schemas = this.state.schemas;
        return schemas.map((schema) => {
          return <div><Schema schema={schema} /></div>
      })
    } else {
      return <Loading />;
    }
  }
  render() {
    return (
      <div className='schema-list'>
        {this.state.error.length === 0 ? this.renderSchemas() : this.renderError()}
        {this.renderCurrent}
      </div>
    )
  }
}

export default DisplaySchema;
