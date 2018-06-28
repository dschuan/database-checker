import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';
import Field from '../Field';

class Schema extends Component {
  constructor(props) {
    super(props);
    this.editSchema = this.editSchema.bind(this);
    if (this.props.content.length > 0) {
      this.state = {schema: JSON.parse(this.props.content)};
    } else {
      this.state = {schema: ''}
    }
  }
  editSchema = (result) => {
    const res = JSON.parse(result);
    let {schema} = this.state;
    const {field} = res;

    schema[field] = res.schema;
    this.setState({schema});
    console.log(schema);
  }
  renderSchema() {
    if (this.props.content.length === 0) {
      return <p>'This schema is empty :('</p>;
    } else {
      const schema = JSON.parse(this.props.content);
      const keys = Object.keys(schema);
      console.log(keys[0]);
      /* return keys.map((key) => {
        return (
          <Field editSchema={this.editSchema} field={key} schema={schema[key]}/>
        )
      })*/
      return (
        <Field editSchema={this.editSchema} field={keys[0]} schema={JSON.stringify(schema[keys[0]])} />
      )
    }

  }
  render()
    {
      let title = this.props.title.replace('./schemas/', '');
      title = title.replace(/_/g, ' ');
      return (
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>
              <h2>
                {title}
              </h2>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>{this.renderSchema()}</Panel.Body>
          </Panel.Collapse>
        </Panel>
    )}
}

export default Schema;
