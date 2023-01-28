import React, { Component } from "react";
import { useSelector } from 'react-redux'
import { useTable } from 'react-table';

import axios from 'axios';
import { useState } from 'react'
import { useEffect } from 'react'
import { setSelectedAirport1 } from "../features/selectionsSlice";
import { Button, Progress } from 'react-daisyui'
import CardContainer from './cardContainer';

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
        let airlineCodes = {
            "3M": "Silver",
            "AA": "American",
            "AS": "Alaska",
            "B6": "JetBlue",
            "DL": "Delta",
            "F9": "Frontier",
            "G4": "Allegiant",
            "MX": "Mexicana",
            "NK": "Spirit",
            "SY": "Sun Country",
            "UA": "United",
            "WN": "Southwest",
            "XP": "Avelo",
            "VX": "Virgin America",
            "FL": "AirTran"
        }

        let logos = {
            "Silver": "",
            "American": "https://i.pinimg.com/originals/a2/61/08/a26108757d054158beb1157275db8649.jpg",
            "Alaska": "https://i.imgur.com/k5pNbUr.png",
            "JetBlue": "https://www.jetblue.com/magnoliapublic/dam/ui-assets/imagery/info-assets/logos-misc/JetBlue-og-image.jpg",
            "Delta": "https://img.favpng.com/19/9/1/delta-air-lines-image-computer-icons-logo-vector-graphics-png-favpng-s1SBMZREacvE4Fcibx79aKRCy.jpg",
            "Frontier": "https://logos-world.net/wp-content/uploads/2021/03/Frontier-Airlines-Emblem.png",
            "Allegiant": "https://1000logos.net/wp-content/uploads/2021/04/Allegiant-Air-logo.png",
            "Mexicana": "",
            "Spirit": "https://www.logo.wine/a/logo/Spirit_Airlines/Spirit_Airlines-Logo.wine.svg",
            "Sun Country": "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/wv5lkswskqzhkqro47dg",
            "United": "https://i.imgur.com/jiyBO1D.jpg",
            "Southwest": "https://logos-world.net/wp-content/uploads/2020/10/Southwest-Airlines-Emblem.png",
            "Avelo": "",
            "Amex": "https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/img-WEBLOGO1-01.jpg",
            "The Platinum Card from AMEX": "https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/img-WEBLOGO1-01.jpg",
            "Chase Sapphire Reserve": "https://1000logos.net/wp-content/uploads/2016/11/Shape-of-the-Chase-logo-500x311.jpg",
            "Capital One Venture X": "https://play-lh.googleusercontent.com/GhAZTgji_F_YJ_TmisXH7J0PgIOYNy4vLPULklCV3Ua6cV3epNZki5DxsAe-KZB7XA",
            "Alaska Airlines Visa Signature": "https://yt3.ggpht.com/ytc/AMLnZu-C-uN4bIkAAPybtvT92uFskxUC76aU_JFD05Rpxg=s900-c-k-c0x00ffffff-no-rj",
            "United Explorer Card": "https://i.imgur.com/jiyBO1D.jpg",
            "Virgin America": "https://download.logo.wine/logo/Virgin_America/Virgin_America-Logo.wine.png",
            "AirTran": "https://1000logos.net/wp-content/uploads/2020/03/AirTran-Airways-Logo.jpg",
            "Chase Sapphire Preferred": "https://1000logos.net/wp-content/uploads/2016/11/Shape-of-the-Chase-logo-500x311.jpg",
        }

        let splashArts = {
            "Silver": "",
            "American": "https://i.imgur.com/Mg3oc7M.png",
            "Alaska": "https://i.imgur.com/qEAgrOl.jpg",
            "JetBlue": "https://i.imgur.com/8i0bsBP.png",
            "Delta": "https://www.sec.gov/Archives/edgar/data/27904/000101968710004423/delta_8k-ex99011.jpg",
            "Frontier": "assets/frontierSplash.jpeg",
            "Allegiant": "https://1000logos.net/wp-content/uploads/2021/04/Allegiant-Air-logo.png",
            "Mexicana": "",
            "Spirit": "https://i.imgur.com/NS0Jwme.png",
            "Sun Country": "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/wv5lkswskqzhkqro47dg",
            "United": "https://i.imgur.com/hV3cZpS.jpg",
            "Southwest": "https://i.imgur.com/BLrrdgI.jpeg",
            "Avelo": "",
            "Chase Sapphire Reserve": "https://i.imgur.com/VHVqbUk.png",
            "Amex": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/Data/SVG/dls/worldservice-tile-brightblue.svg",
            "The Platinum Card from AMEX": "https://icm.aexp-static.com/Internet/Acquisition/US_en/AppContent/OneSite/Data/SVG/dls/worldservice-tile-brightblue.svg",
            "Capital One Venture X": "https://i.imgur.com/7DXlJOH.jpg",
            "Capital One Venture": "https://i.imgur.com/7DXlJOH.jpg",
            "United Explorer Card": "https://i.imgur.com/hV3cZpS.jpg",
            "Alaska Airlines Visa Signature": "https://i.imgur.com/qEAgrOl.jpg",
            "Sun Country": "https://i.imgur.com/twyG8g4.png",
            "Frontier": "https://i.imgur.com/CLGYz4w.png",
            "Chase Sapphire Preferred": "https://i.imgur.com/VHVqbUk.png"
        }

        return (
            <div>
                <div>
                    <div className="hero from-primary to-accent text-primary-content min-h-min bg-gradient-to-r">
                        <div className="hero-content mx-auto max-w-md text-center md:max-w-full">
                            <div className="max-w-full space-y-4 py-8">
                                <InsightsHeading />
                                <hr className="my-4" />
                                <div className="loadingContainer flex items-center justify-center h-16">
                                    {this.state.loading ? (
                                        <Progress className="w-56" />
                                    ) : null}
                                </div>
                                <CardContainer airlineCodes={airlineCodes} logos={logos} splashArts={splashArts}/>
                                <TableOfData toggleSwitch={this.toggleLoader} airlineCodes={airlineCodes} logos={logos}  />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
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
        // returnableH2 = <h2 className='text-xl '>We can recommend cards based on cities or airports... but not both</h2>
        returnableH2 = <h2 className='text-xl '>For now we can recommend cards based on cities... but not airports</h2>
    }

    // put returnableH1 and returnableH2 in a div and return them:

    return <>
        {returnableH1}
        {returnableH2}
    </>
}

function NeutralHeading(props) {
    // return <h2 className='text-3xl font-bold'>Click {<span className="badge badge-lg badge-accent">Find Cards</span>} above to get started</h2>
    return <h2 className='text-3xl font-bold'>Choose your cities above to get started</h2>
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
                    $where: '(citymarketid_1 = ' + selectedCity1 + ' AND citymarketid_2 = ' + selectedCity2 + ') OR (citymarketid_1 = ' + selectedCity2 + ' AND citymarketid_2 = ' + selectedCity1 + ')',
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

    let outputString = data && data[0] && data[0]["city1"] && data[0]["city2"] ? data[0]["city1"] + " to " + data[0]["city2"] : 'Loading...';
    console.log("our latest output string: ", outputString);

    // return (
    //     <>
    //         <div>
    //             <Table columns={columns} data={data} />
    //         </div>

    //         {/* <Table columns={columns} data={data} /> */}
    //     </>
    // )

    console.log("================================")
    // console.log("data: " + JSON.stringify(data));


    if (!data) {
        return null;
    }


    return (
        <div className="overflow-x-auto">
            <h2 className='text-xl py-4'>{outputString}</h2>


            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        {/* <th>City 1</th>
                        <th>City 2</th> */}
                        <th>Largest Carrier</th>
                        <th>Largest Carrier Fare</th>
                        <th>Lowest Fare Carrier</th>
                        <th>Lowest Fare Carrier Fare</th>
                        <th>Daily Passengers</th>
                        <th>Miles</th>
                        <th>Year</th>
                        <th>Quarter</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            {/* <td>{item.city1}</td>
                            <td>{item.city2}</td> */}
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={props.logos[props.airlineCodes[item.carrier_lg]]} alt={item.carrier_lg} />
                                        {/* <img src={require("../assets/unitedLogo.jpg")} alt={item.carrier_lg} /> */}
                                    </div>
                                </div>
                            </td>
                            <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(parseFloat(item.fare_lg).toFixed(0)))}</td>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={props.logos[props.airlineCodes[item.carrier_low]]} alt={item.carrier_low} />
                                        {/* <img src={require("../assets/unitedLogo.jpg")} alt={item.carrier_lg} /> */}
                                    </div>
                                </div>
                            </td>
                            {/* <td>{item.fare_low}</td> */}
                            <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(parseFloat(item.fare_low).toFixed(0)))}</td>
                            <td>{(parseFloat(item.passengers).toFixed(0))}</td>
                            <td>{item.nsmiles}</td>
                            <td>{item.year}</td>
                            <td>{item.quarter}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
}

export default Insights;