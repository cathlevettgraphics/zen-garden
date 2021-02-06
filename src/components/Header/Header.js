import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.headerContainer}>
        <div className={styles.mainHeader}>
          <span className={styles.mainLogo}>zen garden</span>
          <nav className={styles.navLinks}>
            <NavLink to="/" className={styles.link}>
              home
            </NavLink>
            <NavLink to="/zen/morezen" className={styles.link}>
              add zen
            </NavLink>
          </nav>
        </div>
        <div className={styles.strapContainer}>
          <p className={styles.strapline}>
            Add some green to your screen! Create and plan a lush and chilled
            green space – get some nature in your day!
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
