import React, { Component } from "react";
import { useSelector } from 'react-redux'


class Insights extends Component {

    handleAirportsClick() {
        this.props.setStateToAirportMode();
    }

    handleCitiesClick() {
        this.props.setStateToCityMode();
    }

    render() {
        return (
            <div>
                <div>
                    <div className="hero from-primary to-accent text-primary-content min-h-min bg-gradient-to-br">
                        {/* <div className="hero-overlay bg-opacity-60"></div> */}
                        <div className="hero-content mx-auto max-w-md text-center md:max-w-full">
                            <div className="max-w-full space-y-4 py-8">

                                <InsightsHeading />
                                {/* Daisy UI Horizonal Divider: */}
                                <hr className="my-4" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

function InsightsHeading(props) {
    const displayingAirportsInsights = useSelector((state) => state.insights.airportMode)
    const displayingCitiesInsights = useSelector((state) => state.insights.cityMode)

    var returnableH1;

    if (displayingAirportsInsights) {
        returnableH1 = <AirportHeading />
    } else if (displayingCitiesInsights) {
        returnableH1 = <CityHeading />
    } else {
        returnableH1 = <NeutralHeading />
    }

    var returnableH2;

    if (displayingAirportsInsights) {
        returnableH2 = <h2 className='text-xl '>Let's see what we got...</h2>
    } else if (displayingCitiesInsights) {
        returnableH2 = <h2 className='text-xl '>Let's see what we got...</h2>
    } else {
        returnableH2 = <h2 className='text-xl '>We can recommend cards based on cities or airports... but not both</h2>
    }

    // put returnableH1 and returnableH2 in a div and return them:

    return <>
        {returnableH1}
        {returnableH2}
    </>
}

function NeutralHeading(props) {
    return <h2 className='text-3xl font-bold'>Click {<span className="badge badge-lg badge-accent">Find Cards</span>} above to get started</h2>
}

function AirportHeading(props) {
    return <h2 className='text-3xl font-bold'>Airport Insights</h2>;
}

function CityHeading(props) {
    return <h2 className='text-3xl font-bold'>City Insights</h2>;
}

export default Insights;