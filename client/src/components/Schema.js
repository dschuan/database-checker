import React from 'react';
import {Panel} from 'react-bootstrap';

const Schema = (props) => {
  let title = props.title.replace('./schemas/', '');
  title = title.replace(/_/g, ' ');
  return (
    <Panel>
      <Panel.Heading> <h2>{title}</h2> </Panel.Heading>
      <Panel.Body><pre> <code>{props.content}</code> </pre></Panel.Body>
    </Panel>
  )
}

export default Schema;
