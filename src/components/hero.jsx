import React, { Component } from "react";
import QueryBuilder from './heroCard'

class RouteRunnerHero extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.handleAirportsClick.bind(this);
        this.handleCitiesClick.bind(this);

    }

    toggleLoader = () => {
        if (!this.state.loading) {
            this.setState({ loading: true });
        } else {
            this.setState({ loading: false });
        }
    };

    handleAirportsClick = () => {
        // this.toggleLoader();
        this.props.setStateToAirportMode();
    }

    handleCitiesClick = () => {
        // this.toggleLoader();
        this.props.setStateToCityMode();
    }


    render() {
        return (
            <div>
                <div className="hero min-h-[1rem] bg-base-200" style={{ backgroundImage: `url("https://i.imgur.com/9Elfmcj.png")` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-primary-content">
                        <div className="max-w-full space-y-4 py-8">

                            <h1 className='text-5xl font-bold'>Welcome to RouteRunner</h1>
                            <p className="py-6">You tell us which city-pair you fly the most, we'll tell you which credit
                                card to get to optimize your points or miles.</p>

                            <div class="grid grid-cols-3 place-items-center">
                                <QueryBuilder
                                    cardTitle="Select Cities"
                                    buttonName="Find Cards"
                                    airportMode="off"
                                    pickerOneTitle="First Metro Area"
                                    pickerTwoTitle="Second Metro Area"
                                    toggleLoader={this.toggleLoader}
                                    setStateToAirportMode={this.handleAirportsClick}
                                    setStateToCityMode={this.handleCitiesClick}
                                />
                                <div className="divider divider-horizontal">OR</div>

                                <QueryBuilder
                                    cardTitle="Select Airports"
                                    buttonName="Find Cards"
                                    airportMode="on"
                                    pickerOneTitle="First Airport"
                                    pickerTwoTitle="Second Airport"
                                    toggleLoader={this.toggleLoader}
                                    setStateToAirportMode={this.setStateToAirportMode}
                                    setStateToCityMode={this.setStateToCityMode}
                                />
                            </div>

                        </div>

                    </div>
                </div>


                {/* <div className="loadingContainer flex items-center justify-center h-32">
                    {this.state.loading ? (
                        <Progress className="w-56" />
                    ) : null}

                    <Button
                        onClick={() => this.toggleLoader()}
                        variant={"primary"}
                        size="lg"
                    >
                        {this.state.loading ? "Hide Loader" : "Show Loader"}
                    </Button>
                </div> */}


            </div>


        )
    }
}

export default RouteRunnerHero;