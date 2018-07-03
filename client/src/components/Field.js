import React, {Component} from 'react';
import {Button, FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import '../stylesheets/display-schema.css';

class Field extends Component{
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.editInput = this.editInput.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.showEditorIcon = this.showEditorIcon.bind(this);
    this.hideEditorIcon = this.hideEditorIcon.bind(this);
    if (this.props.schema) {
      const schema = JSON.parse(this.props.schema);
      this.state = {
        schema: schema,
        showInputEdit: false,
        showEditButton: false
      }
    } else {
      this.state = {
        schema: {
          optional: false,
          type: '',
        },
        showInputEdit: false,
        showEditButton: false
      }
    }

  }
  toggleSwitch() {
    const curr = this.state.schema.optional;
    let {schema} = this.state;
    schema.optional = !curr;
    this.setState({schema});
    let data = {field: this.props.field};
    data['schema'] = schema;
    console.log(data);
    this.props.editSchema(JSON.stringify(data));

  }
  submitHandler(e) {
    e.preventDefault();
    let {schema} = this.state;
    schema.type = this.type.value;
    this.setState({schema:schema, showInputEdit: false});
    let data = {field: this.props.field};
    data['schema'] = schema;
    this.props.editSchema(JSON.stringify(data));

  }

  showEditorIcon() {
    this.setState({showEditButton: true});
  }

  hideEditorIcon() {
    this.setState({showEditButton: false});
  }

  editInput() {
    this.setState({showInputEdit: !this.state.showInputEdit});

  }
  renderTypeField() {
    return this.state.showInputEdit ? (
      <form onSubmit={this.submitHandler}>
        <FormGroup controlId="inputText"></FormGroup>
        <FormControl type="text" defaultValue={this.state.schema.type} inputRef={ref => this.type = ref}/>
      </form>
    ) : (
      <span> Type: {this.state.schema.type} </span>
    )
  }
  render() {
    return (
      <div className='Field' onMouseOver={this.showEditorIcon} onMouseLeave={this.hideEditorIcon}>
        <div className='Header'>
          <h5>Field: {this.props.field.toUpperCase()}</h5>
          {this.state.showEditButton ? <Button bsSize='large' onClick={this.editInput}><Glyphicon glyph='pencil'/></Button> : ''}
        </div>
        <div className='Type'>{this.renderTypeField()}</div>
        <div className='Optional'>
          <label htmlFor='optional'> Is optional: </label>
          <Toggle id='optional' onChange={this.toggleSwitch} defaultChecked={this.state.schema.optional} />
        </div>
      </div>
    )}
}

export default Field;
