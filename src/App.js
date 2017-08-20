import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Segmentations from './Segmentations/Segmentations'
import Contacts from './Contacts/Contacts'

const App = () => (
  <Router>
    <Switch>
      <Route path="/contacts" component={Contacts} />
      <Route path="/segmentations" component={Segmentations} />
      <Route path="*" component={Contacts} />
    </Switch>
  </Router>
)

export default App;
