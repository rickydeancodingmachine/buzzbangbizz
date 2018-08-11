import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import BuzzBangBizz from './components/BuzzBangBizz';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename="/">
        <div className="App mt-4 mb-4">
          <Switch>
            <Route path="/" exact component={BuzzBangBizz} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
