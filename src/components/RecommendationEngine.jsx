import customCardData from "../customCardData.json";

export class RecommendationEngine {
  constructor() {
    this.scoreMap = new Map();
    this.largestCarrier = "";
    this.lowestFareCarrier = "";
    this.largestCarrierMS = 0.0;
    this.largestCarrierFare = 0.0;
    this.lowestFareCarrierMS = 0.0;
    this.lowestFareCarrierFare = 0.0;
    this.paramWeights = this.getParamWeights("default");
    this.mostRecentQuarterLabel = "";
  }

  getParamWeights(which) {
    if (which === "default") {
      return {
        weightOf: {
            annual_fee_penalty: 1.0,
            signup_bonus: 1.0,
            lowestFareCarrierMS: 400,
            largestCarrierMS: 200,
        },
        valueOf: {
          global_entry: 100,
          centurion_access: 150,
          capital_one_access: 50,
          priority_pass: 100,
          free_bag: 100,
          buddy_ticket: 200,
          airline_lounge_access: 200,
          priority_boarding: 50,
        },
      };
    } else {
        return null;
    }
  }

  setEngineVars(
    largestCarrier,
    lowestFareCarrier,
    largestCarrierMS,
    largestCarrierFare,
    lowestFareCarrierMS,
    lowestFareCarrierFare
  ) {
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

    this.scoreMap.set(
      whichCard.name,
      this.scoreMap.get(whichCard.name) + amount
    );
  }

  decCardScore(whichCard, amount) {
    if (amount == null) {
      return;
    }

    this.scoreMap.set(
      whichCard.name,
      this.scoreMap.get(whichCard.name) - amount
    );
  }

  incCardScoreForGeneralPerks(whichCard) {
    if (whichCard.global_entry) {
      this.incCardScore(whichCard, this.paramWeights.valueOf.global_entry);
    }
    if (whichCard.centurion_access) {
      this.incCardScore(whichCard, this.paramWeights.valueOf.centurion_access);
    }
    if (whichCard.capital_one_access) {
      this.incCardScore(whichCard, this.paramWeights.valueOf.capital_one_access);
    }
    if (whichCard.priority_pass) {
      this.incCardScore(whichCard, this.paramWeights.valueOf.priority_pass);
    }

    //Sign up bonus
    // console.log("SUB:"+whichCard.SUB_value+ " whichcard: " + whichCard)
    this.incCardScore(whichCard, parseInt(whichCard.SUB_value)*this.paramWeights.weightOf.signup_bonus); //used to inc sign up bonus / 2, trying full but also account for annual fee

    //Annual fee penalty
    this.decCardScore(whichCard, parseInt(whichCard.annual_fee)*this.paramWeights.weightOf.annual_fee_penalty);
  }

  incCardScoreForAirlinePerks(whichCard, airline) {
    if (airline.free_bag) {
      this.incCardScore(whichCard, this.paramWeights.valueOf.free_bag);
    }
    if (airline.buddy_ticket) {
      this.incCardScore(whichCard, this.paramWeights.valueOf.buddy_ticket);
    }
    if (airline.airline_lounge_access) {
      this.incCardScore(whichCard, this.paramWeights.valueOf.airline_lounge_access);
    }
    if (airline.priority_boarding) {
      this.incCardScore(whichCard, this.paramWeights.valueOf.priority_boarding);
    }
  }

  getCardScores(
    largestCarrier,
    lowestFareCarrier,
    largestCarrierMS,
    largestCarrierFare,
    lowestFareCarrierMS,
    lowestFareCarrierFare
  ) {
    // var cardData = JSON.parse(cardDataJSON);
    var cardData = customCardData;

    cardData.forEach((card) => {
      this.scoreMap.set(card.name, 0);
    });

    let scoreMapSerialized = JSON.stringify(
      Array.from(this.scoreMap.entries())
    );
    console.log("Considering cards:" + scoreMapSerialized);

    cardData.forEach((card) => {
      let compatibleAirlines = card.compatible_airlines;

      // Give points for lowest fare compatibility
      compatibleAirlines.forEach((airline) => {
        if (airline.airline_name === lowestFareCarrier) {
          this.incCardScore(
            card,
            (airline.compatibility_score / 100) *
              (1000 * (largestCarrierFare / lowestFareCarrierFare))
          );
          // console.log("lf_ms: " + lowestFareCarrierMS)
          this.incCardScore(card, this.paramWeights.weightOf.lowestFareCarrierMS * lowestFareCarrierMS);

          this.incCardScoreForAirlinePerks(card, airline);
        }
      });

      //give points for largest carrier compatibility
      compatibleAirlines.forEach((airline) => {
        if (airline.airline_name === largestCarrier) {
          this.incCardScore(
            card,
            (airline.compatibility_score / 100) *
              (1000 * (lowestFareCarrierFare / largestCarrierFare))
          );
          // console.log("lg_ms: " + largestCarrierMS)
          this.incCardScore(card, this.paramWeights.weightOf.largestCarrierMS * largestCarrierMS);

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
      console.warn("No routes data has reached engine yet");
      return this.getCardScores();
    } else {
      console.log("Routes data acquired in engine");
    }

    //Extract the essential six datapoints here:
    //integrate old algorithm with the new:
    let targetCitiesData = routesData;

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
      if (
        mostRecentQuarter < targetCitiesData[i]["quarter"] &&
        targetCitiesData[i]["year"] == mostRecentYear
      ) {
        mostRecentQuarter = targetCitiesData[i]["quarter"];
      }
    }

    //update label for most recent quarter
    this.mostRecentQuarterLabel = "Q"+mostRecentQuarter+" of "+mostRecentYear;

    //Estalish lowest fare carrier most recent quarter
    let lowestFareCarrierRecentRow = targetCitiesData.filter(
      (element) =>
        element["year"] == mostRecentYear &&
        element["quarter"] == mostRecentQuarter
    )[0];
    let lowestFareCarrierCode = lowestFareCarrierRecentRow["carrier_low"];
    let lowestFareCarrier = airlineCodes[lowestFareCarrierCode];
    let lowestFareCarrierMS = lowestFareCarrierRecentRow["lf_ms"];
    let lowestFareCarrierFare = lowestFareCarrierRecentRow["fare_low"];
    console.log("LF Carrier: " + lowestFareCarrier);

    //Establish largest fare carrier most recent quarter
    let largestCarrierRecentRow = targetCitiesData.filter(
      (element) =>
        element["year"] == mostRecentYear &&
        element["quarter"] == mostRecentQuarter
    )[0];
    let largestCarrierCode = largestCarrierRecentRow["carrier_lg"];
    let largestCarrier = airlineCodes[largestCarrierCode];
    let largestCarrierMS = largestCarrierRecentRow["large_ms"];
    let largestCarrierFare = largestCarrierRecentRow["fare_lg"];
    console.log("largest Carrier: " + largestCarrier);

    //Let's make sure that we have the vars we need
    if (
      !(
        largestCarrier &&
        lowestFareCarrier &&
        largestCarrierMS &&
        largestCarrierFare &&
        lowestFareCarrierMS &&
        lowestFareCarrierFare
      )
    ) {
      console.warn("One of our essential engine vars is missing");
    }

    this.setEngineVars(
      largestCarrier,
      lowestFareCarrier,
      largestCarrierMS,
      largestCarrierFare,
      lowestFareCarrierMS,
      lowestFareCarrierFare
    );
    return this.getCardScores(
      largestCarrier,
      lowestFareCarrier,
      largestCarrierMS,
      largestCarrierFare,
      lowestFareCarrierMS,
      lowestFareCarrierFare
    );
  }
}
