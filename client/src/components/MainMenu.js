import React from 'react';
import {Link} from 'react-router-dom';

import MenuItem from './MenuItem';
import '../stylesheets/main-menu.css';

const renderMenu = (keys) => {
  return keys.map((key) => {
    return <MenuItem item={key} key={key}/>;
  });
};
const renderReset = () => {
  if (sessionStorage.getItem('credentials')) {
    return (
      <div className='reset'>
        <Link to='/'> Reset </Link>
      </div>
    )
  }
}
const MainMenu = (props) => {
  return (
    <div className="menu">
      {renderMenu(props.menu)}
      {renderReset()}
    </div>
  );
};

export default MainMenu;
