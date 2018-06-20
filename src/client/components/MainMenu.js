import React from 'react';
import MenuItem from './MenuItem';
import '../stylesheets/main-menu.css';

const renderMenu = (keys) => {
  return keys.map((key) => {
    return <MenuItem item={key} key={key}/>;
  });
};
const MainMenu = (props) => {
  return (
    <div className="menu">
      {renderMenu(props.menu)}
    </div>
  );
};

export default MainMenu;
