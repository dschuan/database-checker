import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import '../stylesheets/display-schema.css';

class Field extends Component{
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    if (this.props.schema) {
      const schema = JSON.parse(this.props.schema);
      const {type, optional} = schema;
      this.state = {
        switched: optional,
        type: type
      }
    } else {
      this.state = {
        switched: false,
        type: ''
      }
    }

  }
  toggleSwitch() {
    const curr = this.state.switched;
    this.setState({switched: !curr});

  }
  clickHandler() {
    let data = {};
    data[this.props.field] = {
      optional: this.state.switched,
      type: this.state.type
    }
    this.props.editSchema(JSON.stringify(data));
  }
  render() {
    const {field} = this.props;
    return (
      <div className='Field'>
        <p> Type: {field} </p>
        <label htmlFor='optional'> Is optional: </label>
        <Toggle id='optional' onChange={this.toggleSwitch} defaultChecked={this.state.switched} />
        <Button bsSize='xsmall' onClick={this.clickHandler}> <Glyphicon glyph='floppy-save' /> </Button>
      </div>
    )}
}

export default Field;
