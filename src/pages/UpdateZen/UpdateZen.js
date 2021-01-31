import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ZenForm from './../../components/ZenForm/ZenForm';

function UpdateZen() {
  return (
    <div className="page">
      <Header />
      <div>
        <h1>Update and refresh your zen here</h1>
        <p>Create your perfect green space</p>
      </div>
      <main>
        <ZenForm />
      </main>
      <Footer />
    </div>
  );
}

export default UpdateZen;
