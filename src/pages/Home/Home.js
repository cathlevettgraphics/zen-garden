import Header from './../../components/Header/Header';
import ZenList from './../../components/ZenList/ZenList';
import Footer from './../../components/Footer/Footer';

function Home() {
  return (
    <div className="page">
      <Header />
      <main>
        <ZenList />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
