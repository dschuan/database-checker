import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import '../stylesheets/home.css';

class Home extends Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      link: this.link.value,
      name: this.name.value,
      user: this.user.value,
      password: this.password.value
    }
    console.log(JSON.stringify(credentials));
    sessionStorage.setItem('credentials', JSON.stringify(credentials));

  }
  render() {
    return (
      <div className='home'>
        <form onSubmit={this.handleSubmit}>
          <FormGroup bsSize='large' controlId= 'database-link'>
            <ControlLabel> Key in the mongourl of your database:</ControlLabel>
            <FormControl inputRef={ref => {this.link = ref}}
             placeholder='mongodb://example'/>
          </FormGroup>

          <FormGroup bsSize='large' controlId= 'database-name'>
            <ControlLabel> Key in the name of your database (Default: meteor):</ControlLabel>
            <FormControl inputRef={ref => {this.name = ref}}
             placeholder='/meteor'/>
          </FormGroup>

          <FormGroup bsSize='large' controlId= 'username'>
            <ControlLabel> Key in your username:</ControlLabel>
            <FormControl inputRef={ref => {this.user = ref}}
             placeholder='user123'/>
          </FormGroup>

          <FormGroup bsSize='large' controlId= 'password'>
            <ControlLabel> Key in your password:</ControlLabel>
            <FormControl inputRef={ref => {this.password = ref}}
             type='password' placeholder='Password here'/>
          </FormGroup>

          <Button type='submit'> Submit </Button>
        </form>
      </div>
    )
  }
}

export default Home;
