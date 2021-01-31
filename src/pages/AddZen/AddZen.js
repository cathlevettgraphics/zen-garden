import Header from '../../components/Header/Header';
import ZenForm from './../../components/ZenForm/ZenForm';
import Footer from '../../components/Footer/Footer';

function AddZen() {
  return (
    <div className="page">
      <Header />
      <div>
        <h1>Add some fresh zen here</h1>
        <p>Create your perfect green space</p>
      </div>
      <main>
        <ZenForm />
      </main>
      <Footer />
    </div>
  );
}

export default AddZen;
