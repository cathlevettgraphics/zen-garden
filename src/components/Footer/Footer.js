import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <span className={styles.mainLogo}>zen garden</span>
        <nav className={styles.navLinks}>
          <a
            href="https://cathlevett-graphics.netlify.app/"
            className={styles.cathLevettGraphics}
          >
            cath levett graphics
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
