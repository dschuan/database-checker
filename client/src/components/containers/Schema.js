import React, {Component} from 'react';
import {Well} from 'react-bootstrap';
import Field from '../Field';
import Loading from '../Loading';
import '../../stylesheets/display-schema.css';

class Schema extends Component {
  constructor(props) {
    super(props);
    this.editSchema = this.editSchema.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {schema: '', active: false, loading: false};
  }
  editSchema = (result) => {
    const res = JSON.parse(result);
    let {schema} = this.state;
    const {field} = res;

    schema[field] = res.schema;
    this.setState({schema});
    console.log(schema);
  }
  clickHandler() {
    const active = this.state.active;
    this.setState({active: !active});
    this.setState({loading: true});
    const schema = this.props.schema.replace('/schemas', '');
    fetch(`api/get-schema/${schema}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({schema: data, loading:false});
    });

  }
  renderSchema() {
    console.log('rendering' + this.state.active + typeof this.state.schema);
    if (this.state.active && typeof this.state.schema === 'object') {
      const fields = Object.keys(this.state.schema);
      if (fields.length === 0) {
        return <p> This schema is empty :( </p>
      } else {
        return fields.map((field) => {
          console.log(this.state.schema[field])
          return <Field field={field} editSchema={this.editSchema} schema={JSON.stringify(this.state.schema[field])} />
        })
      }

    }

  }
  renderLoading() {
    if (this.state.loading) {
      return <Loading />
    }
  }

  decideClassName() {
    if (Object.keys(this.state.schema).length > 0 && this.state.active) {
      return 'schema-active';
    } else {
      return 'schema-default';
    }
  }
  render()
    {
      let title = this.props.schema.replace('./schemas/', '');
      title = title.replace(/_/g, ' ');
      return (
        <Well className={this.decideClassName()}>
          <div className='click-space' onClick={this.clickHandler}>
            <h3> {title}</h3>
            <hr />
          </div>
          <div className='field-list'>
            {this.renderSchema()}
            {this.renderLoading()}
          </div>
        </Well>
    )}
}

export default Schema;
