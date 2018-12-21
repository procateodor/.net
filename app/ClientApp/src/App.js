import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { DomainPage } from './components/DomainPage';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/DomainPage' component={DomainPage} />
      </div>
    );
  }
}
