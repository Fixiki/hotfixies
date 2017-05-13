import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  Editor,
  Syllabus,
  Widgets,
  NotFound,
} from './containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes */ }
      <Route path="syllabus" component={Syllabus}/>
      <Route path="syllabus/:modelId/view" component={Editor}/>
      <Route path="widgets" component={Widgets}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
};
