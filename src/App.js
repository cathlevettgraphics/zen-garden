import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import './../src/generics.css';
import 'normalize.css';

import { GardenProvider } from './contexts/ZenGardenContexts';

import Home from './pages/Home/Home';
import AddZen from './pages/AddZen/AddZen';
import UpdateZen from './pages/UpdateZen/UpdateZen';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <Router>
      <ToastProvider autoDismiss={true}>
        <GardenProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path={`/zen/morezen`} component={AddZen} />
            <Route path={`/zen/tweak-zen/:id`} component={UpdateZen} />
            <Route path="*" component={NotFound} />
          </Switch>
        </GardenProvider>
      </ToastProvider>
    </Router>
  );
}

export default App;
