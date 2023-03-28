import React, { Component } from 'react';
import InsightsRecommendation from './insightsRecommendation';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { RecommendationEngine } from './RecommendationEngine';


const CardContainer = (props) => {

    //Stolen from TableOfData class
    const [data, setData] = useState(null);
    const selectedCity1 = useSelector((state) => state.selections.selectedCity1);
    const selectedCity2 = useSelector((state) => state.selections.selectedCity2);

    const selectedAirport1 = useSelector((state) => state.selections.selectedAirport1);
    const selectedAirport2 = useSelector((state) => state.selections.selectedAirport2);

    const displayingAirportsInsights = useSelector((state) => state.insights.airportMode)
    const displayingCitiesInsights = useSelector((state) => state.insights.cityMode)

    let modedParams = null;
    let dataURL = null;
    
    if (displayingCitiesInsights) {
        dataURL = `https://data.transportation.gov/resource/4f3n-jbg2.json`
        modedParams = {         $where: '(citymarketid_1 = ' + selectedCity1 + ' AND citymarketid_2 = ' + selectedCity2 + ') OR (citymarketid_1 = ' + selectedCity2 + ' AND citymarketid_2 = ' + selectedCity1 + ')'}
    } else if (displayingAirportsInsights) {
        dataURL = `https://data.transportation.gov/resource/tfrh-tu9e.json`
        modedParams = {         $where: '(airport_1 = ' + selectedAirport1 + ' AND airport_2 = ' + selectedAirport2 + ') OR (airport_1 = ' + selectedAirport2 + ' AND airport_2 = ' + selectedAirport1 + ')'}
    }

    if (!props.airlineCodes) {
        console.warn("Airline codes not coming through")
    }

    useEffect(() => {
        async function fetchData() {

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
                const response = await axios.get(dataURL, { modedParams })
                setData(response.data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [dataURL, modedParams, selectedCity1, selectedCity2, selectedAirport1, selectedAirport2]);

    let routeData = data;

    let myEngine = new RecommendationEngine();

    //Select a credit card to recommend
    let cardScores = myEngine.getCardScoresWrapper(routeData, props.airlineCodes);
    let cardScoresArray = (Array.from(cardScores.entries()));

    let cardScoresClone = new Map(cardScores);
    let cardScoresCloneAgain = new Map(cardScores);
    var maxRCScard = ([...cardScoresClone.entries()].reduce((a, e) => e[1] > a[1] ? e : a));

    //delete top card from clone map in order to find 2nd highest card
    cardScoresClone.delete(maxRCScard[0])
    cardScoresCloneAgain.delete(maxRCScard[0])

    var secondHighestRCScard = ([...cardScoresClone.entries()].reduce((a, e) => e[1] > a[1] ? e : a));
    cardScoresCloneAgain.delete(secondHighestRCScard[0])

    var thirdHighestRCScard = ([...cardScoresCloneAgain.entries()].reduce((a, e) => e[1] > a[1] ? e : a));

    console.log("The top card was " + maxRCScard[0] + " with a score of " + maxRCScard[1] + " RCS.");
    console.log("The runner up card was " + secondHighestRCScard[0] + " with a score of " + secondHighestRCScard[1] + " RCS.");

    return (
        <>
            <SectionHeading title={"Latest Market Leaders"} />
            <SectionSubHeading title={"Newest data is from "+myEngine.mostRecentQuarterLabel}/>
            <div className="grid place-items-center gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <InsightsRecommendation logo={props.logos[myEngine.lowestFareCarrier]} image={props.splashArts[myEngine.lowestFareCarrier]} title={"Lowest Fares: " + myEngine.lowestFareCarrier} badgeTexts={[(parseFloat(myEngine.lowestFareCarrierMS) * 100).toPrecision(3) + "% Market Share", "$" + (parseFloat(myEngine.lowestFareCarrierFare)).toFixed(2) + " Average Fare"]}  />
            <InsightsRecommendation logo={props.logos[myEngine.largestCarrier]} image={props.splashArts[myEngine.largestCarrier]} title={"Largest Market Share: " + myEngine.largestCarrier} badgeTexts={[(parseFloat(myEngine.largestCarrierMS) * 100).toPrecision(3) + "% Market Share", "$" + (parseFloat(myEngine.largestCarrierFare)).toFixed(2) + " Average Fare"]}  />
            </div>
            <SectionHeading title={"Latest Card Recommendations"} />
            <div className="grid place-items-center gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <InsightsRecommendation logo={props.logos[maxRCScard[0]]} image={props.splashArts[maxRCScard[0]]} title={maxRCScard[0]} badgeTexts={[(parseFloat(maxRCScard[1])).toFixed() + " RCS"]} />
            <InsightsRecommendation logo={props.logos[secondHighestRCScard[0]]} image={props.splashArts[secondHighestRCScard[0]]} title={secondHighestRCScard[0]} badgeTexts={[(parseFloat(secondHighestRCScard[1])).toFixed() + " RCS"]}  />
            <InsightsRecommendation logo={props.logos[thirdHighestRCScard[0]]} image={props.splashArts[thirdHighestRCScard[0]]} title={thirdHighestRCScard[0]} badgeTexts={[(parseFloat(thirdHighestRCScard[1])).toFixed() + " RCS"]} />
            </div>
            <div class="divider"></div>
            <SectionHeading title={"Historical Data"} />
        </>
    );
}

function SectionHeading(props) {
    // return <h2 className='text-3xl font-bold'>Click {<span className="badge badge-lg badge-accent">Find Cards</span>} above to get started</h2>
    return <h2 className='text-3xl font-bold'>{props.title}</h2>
}

function SectionSubHeading(props) {
    // return <h2 className='text-3xl font-bold'>Click {<span className="badge badge-lg badge-accent">Find Cards</span>} above to get started</h2>
    return <h3 className='text-1xl'>{props.title}</h3>
}

export default CardContainer;
