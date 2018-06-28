import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
class Field extends Component{
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);

    const schema = JSON.parse(this.props.schema);
    const {type, optional} = schema;
    this.state = {
      switched: optional,
      type: type
    }
  }
  toggleSwitch() {
    const curr = this.state.switched;
    this.setState({switched: !curr});
    let schema = JSON.parse(this.props.schema);
    schema.optional = !curr;
    const data = {
      field: this.props.field,
      schema
    };

    this.props.editSchema(JSON.stringify(data));
  }
  render() {
    const {field} = this.props;
    return (
      <div>
        <p> Type: {field} </p>
        <Toggle onChange={this.toggleSwitch} defaultChecked={this.state.switched} />
        <Button bsSize='large' bsStyle='default'> Submit </Button>
      </div>
    )}
}

export default Field;
