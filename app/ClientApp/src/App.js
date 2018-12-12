import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

export default class App extends Component {
  displayName = App.name

  constructor(props) {
    super(props);

    this.state = { ...props, ok: true };
  }

  handle = () => {
    this.setState({
      title: 'asdasdasdas'
    });

    console.log(this.state);
  }

  render() {
    return (
      <Layout>
        <button>asdasdasd</button>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
      </Layout>
    );
  }
}
