import React, {Component} from 'react';
import {Button, Well} from 'react-bootstrap';
import Field from '../Field';
import Loading from '../Loading';
import '../../stylesheets/display-schema.css';

class Schema extends Component {
  constructor(props) {
    super(props);
    this.editSchema = this.editSchema.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.updateSchema = this.updateSchema.bind(this);
    this.state = {schema: '', active: false, loading: false, saving: false, confirmation: ''};
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
    if (this.state.active && typeof this.state.schema === 'object') {
      const fields = Object.keys(this.state.schema);
      if (fields.length === 0) {
        return <p> This schema is empty :( </p>
      } else {
        return fields.map((field) => {
          return <Field field={field} key={`${this.props.schema}${field}`} editSchema={this.editSchema} schema={JSON.stringify(this.state.schema[field])} />
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

  updateSchema() {
    this.setState({saving: true});
    const res = {
      filepath: this.props.schema,
      schema: this.state.schema,
    }
    console.log(res)
    fetch('/api/edit-schema', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(res)
    })
    .then(data => {
      console.log(data);
      this.setState({saving: false});
      if (data.ok) {
        this.setState({confirmation: ''});
      } else {
        this.setState({confirmation: 'Error, try again or contact an administrator'});
      }

    })
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
            {this.state.confirmation}
          </div>
          <div className='submit-button'>
            {this.state.saving ? <p>Saving...</p> : ''}
            {this.state.active ? <Button block={true} disabled={this.state.saving} onClick={this.updateSchema}> Save </Button> : ''}
          </div>
        </Well>
    )}
}

export default Schema;
