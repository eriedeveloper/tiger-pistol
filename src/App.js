import React from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperHeroTabs from './features/SuperHeroTabs'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  state = {
    heroes: []
  };

  componentDidMount() {
    axios.get('super-heroes.json')
      .then(res => this.setState({ heroes: res.data }));
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SuperHeroTabs heroes={this.state.heroes} />} />
          <Route path="/:active_tab" element={<SuperHeroTabs heroes={this.state.heroes} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
