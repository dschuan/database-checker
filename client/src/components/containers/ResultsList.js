import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';

class ResultsList extends Component{
  renderList() {
    return this.props.res.map((key) => {
      const editedKey = key.replace(/_/g, ' ');
      return (
        <Panel>
          <Panel.Heading><h2>{key}</h2></Panel.Heading>
        </Panel>
      )
    })
  }
  render() {
    return (
      <div>
        {this.renderList()}
      </div>
    )
  }
}

export default ResultsList;
