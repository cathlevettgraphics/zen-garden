import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <span>zen garden</span>
      <nav>
        <NavLink to="/">home</NavLink>
        <NavLink to="/zen/morezen">add zen</NavLink>
        <NavLink to="/zen/tweakzen">tweak zen</NavLink>
      </nav>
    </header>
  );
}

export default Header;
