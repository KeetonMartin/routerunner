import React, { Component } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';

import { Theme } from 'react-daisyui'
import RouteRunnerHero from "./components/hero";
import Insights from "./components/insights";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      displayingAirportsInsights: false,
      displayingCitiesInsights: false 
    };
  }

  // Creating below function to set state 
  // of this (parent) component.
  setStateToAirportMode = () => {
    this.setState({ 
      displayingAirportsInsights: true,
      displayingCitiesInsights: false 
    });
  }

  setStateToCityMode = () => {
    this.setState({ 
      displayingAirportsInsights: false,
      displayingCitiesInsights: true 
    });
  }

  render() {
    return (
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Theme dataTheme='black'>
            <Navbar />
            <RouteRunnerHero
              setStateToAirportMode={this.setStateToAirportMode}
              setStateToCityMode={this.setStateToCityMode}
              displayingAirportsInsights={this.displayingAirportsInsights}
              displayingCitiesInsights={this.displayingCitiesInsights}
            />
            {/* <CityPicker /> */}
            <Insights />
          </Theme>

          {/* <main className="container mx-auto px-3 pb-12">Content</main> */}
        </div>
      </Router>
    );
  };
}

export default App;
