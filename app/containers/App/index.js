import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderPage from '../../components/HeaderPage';
import Cart from '../Cart/Loadable';
import HomeProduct from '../HomeProduct/Loadable';

export default function App() {
  return (
    <div>
      <HeaderPage />
      <Switch>
        <Route exact path="/" component={HomeProduct} />
        <Route exact path="/Details" component={Cart} />
      </Switch>
      <Footer />
    </div>
  );
}
