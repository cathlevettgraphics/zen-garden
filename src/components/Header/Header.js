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
      <h1>Zen garden</h1>
      <p>
        Add some green to your screen! Create and plan a chilled green space –
        get some nature in your day!
      </p>
    </header>
  );
}

export default Header;
