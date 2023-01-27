import React, { Component } from 'react';
import InsightsRecommendation from './insightsRecommendation';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';

const CardContainer = (props) => {

    //Stolen from TableOfData class
    const [data, setData] = useState(null);
    const selectedCity1 = useSelector((state) => state.selections.selectedCity1);
    const selectedCity2 = useSelector((state) => state.selections.selectedCity2);

    const selectedAirport1 = useSelector((state) => state.selections.selectedAirport1);
    const selectedAirport2 = useSelector((state) => state.selections.selectedAirport2);

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
                const response = await axios.get(`https://data.transportation.gov/resource/4f3n-jbg2.json`, { params })
                setData(response.data)
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [selectedCity1, selectedCity2]);

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
            <SectionHeading title={"Market Leaders"} />
            <div className="grid place-items-center gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <InsightsRecommendation logo={props.logos[myEngine.lowestFareCarrier]} image={props.splashArts[myEngine.lowestFareCarrier]} title={"Lowest Fares: " + myEngine.lowestFareCarrier} badgeTexts={[(parseFloat(myEngine.lowestFareCarrierMS) * 100).toPrecision(3) + "% Market Share", "$" + (parseFloat(myEngine.lowestFareCarrierFare)).toFixed(2) + " Average Fare"]}  />
            <InsightsRecommendation logo={props.logos[myEngine.largestCarrier]} image={props.splashArts[myEngine.largestCarrier]} title={"Largest Market Share: " + myEngine.largestCarrier} badgeTexts={[(parseFloat(myEngine.largestCarrierMS) * 100).toPrecision(3) + "% Market Share", "$" + (parseFloat(myEngine.largestCarrierFare)).toFixed(2) + " Average Fare"]}  />
            </div>
            <SectionHeading title={"Card Recommendations"} />
            <div className="grid place-items-center gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            <InsightsRecommendation logo={props.logos[maxRCScard[0]]} image={props.splashArts[maxRCScard[0]]} title={maxRCScard[0]} badgeTexts={[(parseFloat(maxRCScard[1])).toFixed() + " RCS"]} />
            <InsightsRecommendation logo={props.logos[secondHighestRCScard[0]]} image={props.splashArts[secondHighestRCScard[0]]} title={secondHighestRCScard[0]} badgeTexts={[(parseFloat(secondHighestRCScard[1])).toFixed() + " RCS"]}  />
            <InsightsRecommendation logo={props.logos[thirdHighestRCScard[0]]} image={props.splashArts[thirdHighestRCScard[0]]} title={thirdHighestRCScard[0]} badgeTexts={[(parseFloat(thirdHighestRCScard[1])).toFixed() + " RCS"]} />
            </div>
            <SectionHeading title={"Historical Data"} />
        </>
    );
}

function SectionHeading(props) {
    // return <h2 className='text-3xl font-bold'>Click {<span className="badge badge-lg badge-accent">Find Cards</span>} above to get started</h2>
    return <h2 className='text-3xl font-bold'>{props.title}</h2>
}

class RecommendationEngine {
    constructor() {
        this.scoreMap = new Map();
        this.largestCarrier = "";
        this.lowestFareCarrier = "" 
        this.largestCarrierMS = 0.0;
        this.largestCarrierFare = 0.0;
        this.lowestFareCarrierMS = 0.0;
        this.lowestFareCarrierFare = 0.0;
    }

    setEngineVars(largestCarrier, lowestFareCarrier, largestCarrierMS, largestCarrierFare, lowestFareCarrierMS, lowestFareCarrierFare) {
        this.largestCarrier = largestCarrier;
        this.lowestFareCarrier = lowestFareCarrier;
        this.largestCarrierMS = largestCarrierMS;
        this.largestCarrierFare = largestCarrierFare;
        this.lowestFareCarrierMS = lowestFareCarrierMS;
        this.lowestFareCarrierFare = lowestFareCarrierFare;
    }

    incCardScore(whichCard, amount) {
        if (amount == null) {
            return;
        }

        this.scoreMap.set(whichCard.name, this.scoreMap.get(whichCard.name) + amount);
    }

    decCardScore(whichCard, amount) {
        if (amount == null) {
            return;
        }

        this.scoreMap.set(whichCard.name, this.scoreMap.get(whichCard.name) - amount);
    }

    incCardScoreForGeneralPerks(whichCard) {
        if (whichCard.global_entry) {
            this.incCardScore(whichCard, 100);
        }
        if (whichCard.centurion_access) {
            this.incCardScore(whichCard, 150);
        }
        if (whichCard.capital_one_access) {
            this.incCardScore(whichCard, 50);
        }
        if (whichCard.priority_pass) {
            this.incCardScore(whichCard, 100);
        }

        //Sign up bonus
        // console.log("SUB:"+whichCard.SUB_value+ " whichcard: " + whichCard)
        this.incCardScore(whichCard, parseInt(whichCard.SUB_value));         //used to inc sign up bonus / 2, trying full but also account for annual fee

        //Annual fee penalty
        this.decCardScore(whichCard, parseInt(whichCard.annual_fee));
    }

    incCardScoreForAirlinePerks(whichCard, airline) {
        if (airline.free_bag) {
            this.incCardScore(whichCard, 100);
        }
        if (airline.buddy_ticket) {
            this.incCardScore(whichCard, 200);
        }
        if (airline.airline_lounge_access) {
            this.incCardScore(whichCard, 200);
        }
        if (airline.priority_boarding) {
            this.incCardScore(whichCard, 50);
        }
    }

    getCardScores(largestCarrier, lowestFareCarrier, largestCarrierMS, largestCarrierFare, lowestFareCarrierMS, lowestFareCarrierFare) {

        var cardDataJSON = ' [ { "name": "The Platinum Card from AMEX", "global_entry": true, "centurion_access": true, "capital_one_access": false, "priority_pass_access": true, "SUB_value": 1500, "annual_fee": 695, "compatible_airlines": [ { "airline_name": "Delta", "compatibility_score": 100, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "JetBlue", "compatibility_score": 80, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "American", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "United", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "Alaska", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false } ] }, { "name": "Alaska Airlines Visa Signature", "global_entry": false, "centurion_access": false, "capital_one_access": false, "priority_pass_access": false, "SUB_value": 600, "annual_fee": 75, "compatible_airlines": [ { "airline_name": "American", "compatibility_score": 100, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "Alaska", "compatibility_score": 100, "free_bag": true, "buddy_ticket": true, "airline_lounge_access": false, "priority_boarding": false } ] }, { "name": "United Explorer Card", "global_entry": true, "centurion_access": false, "capital_one_access": false, "priority_pass_access": false, "SUB_value": 600, "annual_fee": 95, "compatible_airlines": [ { "airline_name": "United", "compatibility_score": 100, "free_bag": true, "buddy_ticket": false, "airline_lounge_access": true, "priority_boarding": true } ] }, { "name": "Capital One Venture X", "global_entry": true, "centurion_access": false, "capital_one_access": true, "priority_pass_access": true, "SUB_value": 750, "annual_fee": 395, "compatible_airlines": [ { "airline_name": "Delta", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "JetBlue", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "American", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "United", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "Alaska", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false } ] }, { "name": "Chase Sapphire Reserve", "global_entry": true, "centurion_access": false, "capital_one_access": false, "priority_pass_access": true, "SUB_value": 900, "annual_fee": 550, "compatible_airlines": [ { "airline_name": "Delta", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "JetBlue", "compatibility_score": 100, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "American", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "United", "compatibility_score": 100, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "Alaska", "compatibility_score": 50, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false }, { "airline_name": "Southwest", "compatibility_score": 100, "free_bag": false, "buddy_ticket": false, "airline_lounge_access": false, "priority_boarding": false } ] } ] '
        var cardData = JSON.parse(cardDataJSON);

        cardData.forEach(card => {
            this.scoreMap.set(card.name, 0)
        });

        let scoreMapSerialized = JSON.stringify(Array.from(this.scoreMap.entries()));
        console.log("Considering cards:" + scoreMapSerialized);

        cardData.forEach(card => {
            let compatibleAirlines = card.compatible_airlines

            // Give points for lowest fare compatibility
            compatibleAirlines.forEach(airline => {
                if (airline.airline_name == lowestFareCarrier) {
                    this.incCardScore(card, (airline.compatibility_score / 100) * (1000 * (largestCarrierFare / lowestFareCarrierFare)));
                    // console.log("lf_ms: " + lowestFareCarrierMS)
                    this.incCardScore(card, (400 * (lowestFareCarrierMS)));

                    this.incCardScoreForAirlinePerks(card, airline);
                }
            });

            //give points for largest carrier compatibility
            compatibleAirlines.forEach(airline => {
                if (airline.airline_name == largestCarrier) {
                    this.incCardScore(card, (airline.compatibility_score / 100) * (1000 * (lowestFareCarrierFare / largestCarrierFare)));
                    // console.log("lg_ms: " + largestCarrierMS)
                    this.incCardScore(card, (200 * (largestCarrierMS)));

                    this.incCardScoreForAirlinePerks(card, airline);
                }
            });

            this.incCardScoreForGeneralPerks(card);
        });

        scoreMapSerialized = JSON.stringify(Array.from(this.scoreMap.entries()));
        console.log("Considering cards:" + scoreMapSerialized);

        return this.scoreMap;
    }

    getCardScoresWrapper(routesData, airlineCodes) {

        if (!routesData) {
            console.warn("No routes data has reached engine yet")
            return this.getCardScores();
        } else { console.log("Routes data acquired in engine") }

        //Extract the essential six datapoints here:

        //integrate old algorithm with the new:
        let targetCitiesData = routesData

        //find most recent year
        let mostRecentYear = 1999;
        for (var i = 0, len = targetCitiesData.length; i < len; ++i) {
            if (mostRecentYear < targetCitiesData[i]["year"]) {
                mostRecentYear = targetCitiesData[i]["year"];
            }
        }

        //find 4 most recent quarters

        //find 1 most recent quarter
        let mostRecentQuarter = 0;
        for (var i = 0, len = targetCitiesData.length; i < len; ++i) {
            if (mostRecentQuarter < targetCitiesData[i]["quarter"] && targetCitiesData[i]["year"] == mostRecentYear) {
                mostRecentQuarter = targetCitiesData[i]["quarter"]
            }
        }

        //Estalish lowest fare carrier most recent quarter
        let lowestFareCarrierRecentRow = (targetCitiesData.filter(element => element["year"] == mostRecentYear && element["quarter"] == mostRecentQuarter)[0]);
        let lowestFareCarrierCode = lowestFareCarrierRecentRow["carrier_low"];
        let lowestFareCarrier = airlineCodes[lowestFareCarrierCode]
        let lowestFareCarrierMS = lowestFareCarrierRecentRow["lf_ms"]
        let lowestFareCarrierFare = lowestFareCarrierRecentRow["fare_low"]
        console.log("LF Carrier: " + lowestFareCarrier)

        //Establish largest fare carrier most recent quarter
        let largestCarrierRecentRow = (targetCitiesData.filter(element => element["year"] == mostRecentYear && element["quarter"] == mostRecentQuarter)[0]);
        let largestCarrierCode = largestCarrierRecentRow["carrier_lg"];
        let largestCarrier = airlineCodes[largestCarrierCode]
        let largestCarrierMS = largestCarrierRecentRow["large_ms"]
        let largestCarrierFare = largestCarrierRecentRow["fare_lg"]
        console.log("largest Carrier: " + largestCarrier)


        //Let's make sure that we have the vars we need
        if (! (largestCarrier && lowestFareCarrier && largestCarrierMS && largestCarrierFare && lowestFareCarrierMS && lowestFareCarrierFare)) {
            console.warn("One of our essential engine vars is missing")
        }



        this.setEngineVars(largestCarrier, lowestFareCarrier, largestCarrierMS, largestCarrierFare, lowestFareCarrierMS, lowestFareCarrierFare);
        return this.getCardScores(largestCarrier, lowestFareCarrier, largestCarrierMS, largestCarrierFare, lowestFareCarrierMS, lowestFareCarrierFare);
    }


    // function scaleCardScoreByPercent(which, amount) {
    //     scoreMap.set(which, scoreMap.get(which)*cardData.get());
    // }

}


export default CardContainer;
