import Header from '../../components/Header/Header';
import ZenForm from './../../components/ZenForm/ZenForm';
import Footer from '../../components/Footer/Footer';
import styles from './../../components/ZenForm/ZenForm.module.css';

function AddZen() {
  return (
    <div className="page">
      <Header />
      <div className={styles.sectionHeader}>
        <h1 className={styles.secondaryHeader}>Add some fresh zen here</h1>
        <p className={styles.secondaryStrap}>Create your perfect green space</p>
      </div>
      <main>
        <ZenForm />
      </main>
      <Footer />
    </div>
  );
}

export default AddZen;
