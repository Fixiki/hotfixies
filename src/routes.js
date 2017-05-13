import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  Editor,
  Widgets,
  NotFound,
} from './containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="code" component={Editor}/>
      <Route path="widgets" component={Widgets}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
