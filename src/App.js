import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import Footer from './components/footer'
import withTheme from './theme/withTheme'
import { IndexPage } from './components/layout/IndexPage'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/:chainName" component={IndexPage} />
          <Redirect to="/westend" />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default withTheme(App);
