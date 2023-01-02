import React, { Component } from "react";
import { useSelector } from 'react-redux'

import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'
import { setSelectedAirport1 } from "../features/selectionsSlice";
import { useTable } from 'react-table';
import { Button, Progress } from 'react-daisyui'

class Insights extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    toggleLoader = () => {
        if (!this.state.loading) {
            this.setState({ loading: true });
        } else {
            this.setState({ loading: false });
        }
    };

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
                                <div className="loadingContainer flex items-center justify-center h-16">
                                    {this.state.loading ? (
                                        <Progress className="w-56" />
                                    ) : null}
                                </div>
                                <TableOfData toggleSwitch={this.toggleLoader} />

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

    const selectedCity1 = useSelector((state) => state.selections.selectedCity1);
    const selectedCity2 = useSelector((state) => state.selections.selectedCity2);

    const selectedAirport1 = useSelector((state) => state.selections.selectedAirport1);
    const selectedAirport2 = useSelector((state) => state.selections.selectedAirport2);


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
        returnableH2 = <h2 className='text-xl '>Let's see what we got for {selectedAirport1} to {selectedAirport2}</h2>
    } else if (displayingCitiesInsights) {
        returnableH2 = <h2 className='text-xl '>Let's see what we got for {selectedCity1} to {selectedCity2}</h2>
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

function TableOfData(props) {
    const [data, setData] = useState(null);

    const selectedCity1 = useSelector((state) => state.selections.selectedCity1);
    const selectedCity2 = useSelector((state) => state.selections.selectedCity2);

    let loggable = 'citymarketid_1 = ' + selectedCity1 + ' AND citymarketid_2 = ' + selectedCity2
    console.log(loggable);

    const selectedAirport1 = useSelector((state) => state.selections.selectedAirport1);
    const selectedAirport2 = useSelector((state) => state.selections.selectedAirport2);

    useEffect(() => {
        async function fetchData() {
            props.toggleSwitch()

            try {
                const params = {
                    $where: 'citymarketid_1 = ' + selectedCity1 + ' AND citymarketid_2 = ' + selectedCity2,
                    // $where: 'citymarketid_2 = '+ selectedCity2
                    // $where: 'city1='+selectedCity1,
                    // $where: 'city2='+selectedCity2,
                    // limit: 5000,
                    // order: "passengers DESC",
                    // app_token: "Qto9G2rlKlEYzT0U1Kb6RzJLj"
                }
                const response = await axios.get(`https://data.transportation.gov/resource/4f3n-jbg2.json`, { params })
                setData(response.data)
            } catch (e) {
                console.log(e);
            }

            await timeout(1000); //for 1 sec delay
            props.toggleSwitch()

        }
        fetchData();
    }, [selectedCity1, selectedCity2]);

    const columns = [
        {
            Header: 'Year',
            accessor: 'year',
        },
        {
            Header: 'Quarter',
            accessor: 'quarter',
        },
        {
            Header: 'City 1',
            accessor: 'city1',
        },
        {
            Header: 'City 2',
            accessor: 'city2',
        },
        {
            Header: 'Number of Miles',
            accessor: 'nsmiles',
        },
        {
            Header: 'Number of Passengers',
            accessor: 'passengers',
        },
        {
            Header: 'Fare',
            accessor: 'fare',
        },
    ];

    let outputString = data ? data[0]["city1"] + " to " + data[0]["city2"] : 'Loading...';

    return (
        <>
            <div>
                {outputString}
                <Table columns={columns} data={data} />
            </div>

            {/* <Table columns={columns} data={data} /> */}
        </>
    )
}

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

function TableHead(props) {
    let columns = props.columns
    const colNames = [];
    for (let i = 0; i < columns.length; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        colNames.push(<TableValue key={i} value={columns[i]}/>);
    }
    return <thead>{colNames}</thead>;
}

function TableValue(props) {
    let value = props.columns
}


function Table(props) {
    let columns = props.columns
    let data = props.data
    let loggableStatement = "data: " + JSON.stringify(data);
    console.log(loggableStatement);
    return (
        <><h1>Table</h1><div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                    <TableHead columns={columns}/>
                <tbody>
                    <tr>
                        <td>exampleName</td>
                        <td>exampleAge</td>
                        <td>exampleGender</td>
                    </tr>
                </tbody>
            </table>

        </div></>
    );
}

export default Insights;