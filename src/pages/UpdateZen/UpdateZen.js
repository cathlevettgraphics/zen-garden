import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ZenForm from './../../components/ZenForm/ZenForm';
import styles from './../../components/ZenForm/ZenForm.module.css';

function UpdateZen() {
  return (
    <div className="page">
      <Header />
      <div className={styles.sectionHeader}>
        <h1 className={styles.secondaryHeader}>
          Update and refresh your zen here
        </h1>
        <p className={styles.secondaryStrap}>Create your perfect green space</p>
      </div>

      <main>
        <ZenForm />
      </main>
      <Footer />
    </div>
  );
}

export default UpdateZen;
