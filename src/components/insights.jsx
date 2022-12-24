import React, { Component } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { enableAirportMode, enableCityMode } from '../features/insightsSlice'


class Insights extends Component {
    constructor(props) {
        super(props);
    }

    handleAirportsClick() {
        this.props.setStateToAirportMode();
    }

    handleCitiesClick() {
        this.props.setStateToCityMode();
    }

    render() {
        return (
            <InsightContainer />
        )
    }
}

function InsightContainer(props) {
    // const displayingAirportsInsights = props.displayingAirportsInsights;
    // const displayingCitiesInsights = props.displayingCitiesInsights;

    const displayingAirportsInsights = useSelector((state) => state.insights.airportMode).toString()
    const displayingCitiesInsights = useSelector((state) => state.insights.cityMode).toString()
    const randomString = useSelector((state) => state.insights.randomString)
  
    return <h1>random String: {randomString} current dAI: {displayingAirportsInsights} and current DCI: {displayingCitiesInsights}</h1>
    // if (displayingAirportsInsights && !displayingCitiesInsights) {
    //     return <AirportHeading />;
    // } else if (!displayingAirportsInsights && displayingCitiesInsights) {
    //     return <CityHeading />;
    // } else {
    //     return <h1>Problems...</h1>
    // }
}

function AirportHeading(props) {
    return <h1>Airport Insights</h1>;
}

function CityHeading(props) {
    return <h1>City Insights</h1>;
}

export default Insights;