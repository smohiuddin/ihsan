import { useEffect } from 'react';
import { Switch, Route, Router as WouterRouter, useLocation } from 'wouter';
import Home from './pages/Home';
import Dinner from './pages/Dinner';

function Routes() {
  const [location] = useLocation();
  const normalized = location === '/' ? location : location.replace(/\/+$/, '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch location={normalized}>
      <Route path="/dinner" component={Dinner} />
      <Route component={Home} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <Routes />
    </WouterRouter>
  );
}
