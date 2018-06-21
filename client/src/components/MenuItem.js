import React from 'react';
import {Link} from 'react-router-dom';
import '../stylesheets/main-menu.css';

const convertMenuToRoute = (key) => {
  const res = key.replace(/\s+/g, '-').toLowerCase();
  return `/${res}`;
}
const MenuItem = (props) => {
  return (
    <div className='menu-item'>
      <Link to={convertMenuToRoute(props.item)}>
        {props.item}
      </Link>
    </div>
  );
};

export default MenuItem;
