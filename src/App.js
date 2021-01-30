import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './../src/generics.css';
import 'normalize.css';

import Home from './pages/Home/Home';
import AddZen from './pages/AddZen/AddZen';
import UpdateZen from './pages/UpdateZen/UpdateZen';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path={`/zen/morezen`} component={AddZen} />
        <Route path={`/zen/tweak-zen/:id`} component={UpdateZen} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
