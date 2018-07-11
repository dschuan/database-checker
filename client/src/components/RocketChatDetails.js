import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import '../stylesheets/home.css';

class RocketChatDetails extends Component{
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {submitted: false};
  }
  handleSubmit(e) {
    e.preventDefault();
    const rocketInfo = {
      url: this.url.value,
    }
    console.log(JSON.stringify(rocketInfo));
    sessionStorage.setItem('rocketinfo', JSON.stringify(rocketInfo));
    this.setState({submitted: true});
  }
  loadConfirmation() {
    if (this.state.submitted) {
      return <p> Url saved! </p>
    }
  }
  render() {
    return (
      <div className='home'>
        <form onSubmit={this.handleSubmit}>

          <FormGroup bsSize='large' controlId= 'username'>
            <ControlLabel> Key in your Rocket.Chat url:</ControlLabel>
            <FormControl inputRef={ref => {this.url = ref}}
             placeholder='https://example.com'/>
          </FormGroup>



          <Button type='submit'> Submit </Button>
        </form>
        {this.loadConfirmation()}
      </div>
    )
  }
}

export default RocketChatDetails;
