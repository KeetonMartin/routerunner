import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";
import { setSelectedCity1, setSelectedCity2, setSelectedAirport1, setSelectedAirport2 } from '../features/selectionsSlice'




const cities = [
  { id: 0, cityId: 32467, name: "Miami, FL (Metropolitan Area)" },
  { id: 1, cityId: 32575, name: "Los Angeles, CA (Metropolitan Area)" },
  { id: 2, cityId: 31703, name: "New York City, NY (Metropolitan Area)" },
  { id: 3, cityId: 30977, name: "Chicago, IL" },
  { id: 4, cityId: 30397, name: "Atlanta, GA (Metropolitan Area)" },
  { id: 5, cityId: 32211, name: "Las Vegas, NV" },
  { id: 6, cityId: 33570, name: "San Diego, CA" },
  { id: 7, cityId: 30194, name: "Dallas/Fort Worth, TX" },
  { id: 8, cityId: 30721, name: "Boston, MA (Metropolitan Area)" },
  { id: 9, cityId: 30325, name: "Denver, CO" },
  { id: 10, cityId: 32457, name: "San Francisco, CA (Metropolitan Area)" },
  { id: 11, cityId: 31454, name: "Orlando, FL" },
  { id: 12, cityId: 31453, name: "Houston, TX" },
  { id: 13, cityId: 31057, name: "Charlotte, NC" },
  { id: 14, cityId: 30466, name: "Phoenix, AZ" },
  { id: 15, cityId: 30693, name: "Nashville, TN" },
  { id: 16, cityId: 31714, name: "Fort Myers, FL" },
  { id: 17, cityId: 30423, name: "Austin, TX" },
  { id: 18, cityId: 34057, name: "Portland, OR" },
  { id: 19, cityId: 31295, name: "Detroit, MI" },
  { id: 20, cityId: 33195, name: "Tampa, FL (Metropolitan Area)" },
  { id: 21, cityId: 33495, name: "New Orleans, LA" },
  { id: 22, cityId: 33192, name: "Sacramento, CA" },
  { id: 23, cityId: 31650, name: "Minneapolis/St. Paul, MN" },
  { id: 24, cityId: 31136, name: "Jacksonville, FL" },
  { id: 25, cityId: 30994, name: "Charleston, SC" },
  { id: 26, cityId: 30559, name: "Seattle, WA" },
  { id: 27, cityId: 34614, name: "Salt Lake City, UT" },
  { id: 28, cityId: 30647, name: "Cleveland, OH (Metropolitan Area)" },
  { id: 29, cityId: 30529, name: "Hartford, CT" },
  { id: 30, cityId: 34100, name: "Philadelphia, PA" },
  { id: 31, cityId: 31066, name: "Columbus, OH" },
  { id: 32, cityId: 32337, name: "Indianapolis, IN" },
  { id: 33, cityId: 31123, name: "St. Louis, MO" },
  { id: 34, cityId: 33198, name: "Kansas City, MO" },
  { id: 35, cityId: 31135, name: "Myrtle Beach, SC" },
  { id: 36, cityId: 33105, name: "Cincinnati, OH" },
  { id: 37, cityId: 30792, name: "Buffalo, NY" },
  { id: 38, cityId: 30852, name: "Washington, DC (Metropolitan Area)" },
  { id: 39, cityId: 30713, name: "Boise, ID" },
  { id: 40, cityId: 33342, name: "Milwaukee, WI" },
  { id: 41, cityId: 33214, name: "San Antonio, TX" },
  { id: 42, cityId: 30140, name: "Albuquerque, NM" },
  { id: 43, cityId: 34262, name: "Palm Springs, CA" },
  { id: 44, cityId: 30198, name: "Pittsburgh, PA" },
  { id: 45, cityId: 34492, name: "Raleigh/Durham, NC" },
  { id: 46, cityId: 30257, name: "Albany, NY" },
  { id: 47, cityId: 34986, name: "Sarasota/Bradenton, FL" },
  { id: 48, cityId: 33316, name: "Omaha, NE" },
  { id: 49, cityId: 30615, name: "El Paso, TX" },
  { id: 50, cityId: 33044, name: "Louisville, KY" },
  { id: 51, cityId: 31603, name: "Eugene, OR" },
  { id: 52, cityId: 31995, name: "Greensboro/High Point, NC" },
  { id: 53, cityId: 33244, name: "Memphis, TN" },
  { id: 54, cityId: 34685, name: "Savannah, GA" },
  { id: 55, cityId: 30135, name: "Allentown/Bethlehem/Easton, PA" },
  { id: 56, cityId: 30158, name: "Atlantic City, NJ" },
  { id: 57, cityId: 31638, name: "Fresno, CA" },
  { id: 58, cityId: 34321, name: "Portland, ME" },
  { id: 59, cityId: 30189, name: "Colorado Springs, CO" },
  { id: 60, cityId: 31871, name: "Greenville/Spartanburg, SC" },
  { id: 61, cityId: 31423, name: "Des Moines, IA" },
  { id: 62, cityId: 33667, name: "Norfolk, VA (Metropolitan Area)" },
  { id: 63, cityId: 30599, name: "Birmingham, AL" },
  { id: 64, cityId: 31624, name: "Key West, FL" },
  { id: 65, cityId: 30666, name: "Bellingham, WA" },
  { id: 66, cityId: 34570, name: "Reno, NV" },
  { id: 67, cityId: 33851, name: "Oklahoma City, OK" },
  { id: 68, cityId: 30431, name: "Asheville, NC" },
  { id: 69, cityId: 31986, name: "Grand Rapids, MI" },
  { id: 70, cityId: 32244, name: "New Haven, CT" },
  { id: 71, cityId: 35412, name: "Knoxville, TN" },
  { id: 72, cityId: 31504, name: "Valparaiso, FL" },
  { id: 73, cityId: 30255, name: "Huntsville, AL" },
  { id: 74, cityId: 33485, name: "Madison, WI" },
  { id: 75, cityId: 34004, name: "Everett, WA" },
  { id: 76, cityId: 34489, name: "Bend/Redmond, OR" },
  { id: 77, cityId: 33728, name: "Pensacola, FL" },
  { id: 78, cityId: 35096, name: "Syracuse, NY" },
  { id: 79, cityId: 31834, name: "Fayetteville, AR" },
  { id: 80, cityId: 30436, name: "Tucson, AZ" },
  { id: 81, cityId: 30785, name: "Burlington, VT" },
  { id: 82, cityId: 34576, name: "Rochester, NY" },
  { id: 83, cityId: 30849, name: "Bozeman, MT" },
  { id: 84, cityId: 34524, name: "Richmond, VA" },
  { id: 85, cityId: 30279, name: "Amarillo, TX" },
  { id: 86, cityId: 32448, name: "Jackson/Vicksburg, MS" },
  { id: 87, cityId: 32898, name: "Latrobe, PA" },
  { id: 88, cityId: 32070, name: "Harrisburg, PA" },
  { id: 89, cityId: 31267, name: "Dayton, OH" },
  { id: 90, cityId: 32206, name: "Harlingen/San Benito, TX" },
  { id: 91, cityId: 31003, name: "Cedar Rapids/Iowa City, IA" },
  { id: 92, cityId: 31637, name: "Fargo, ND" },
  { id: 93, cityId: 30154, name: "Nantucket, MA" },
  { id: 94, cityId: 30868, name: "Columbia, SC" },
  { id: 95, cityId: 32600, name: "Little Rock, AR" },
  { id: 96, cityId: 34689, name: "Santa Barbara, CA" }
]

const airports = [
  { id: 1, name: 'SFO' },
  { id: 2, name: 'JFK' },
  { id: 3, name: 'LAX' },
  { id: 4, name: 'ORD' },
  { id: 5, name: 'DFW' },
  { id: 6, name: 'DEN' },
  { id: 7, name: 'ATL' },
  { id: 8, name: 'CLT' },
  { id: 9, name: 'IAH' },
]

function LocationPicker(props) {

  var locations = cities;
  if (props.airportMode === "on") {
    locations = airports;
  }

  const [selected, setSelected] = useState(locations[(props.which === "1") ? 4 : 3])
  const [query, setQuery] = useState('')

  const dispatch = useDispatch();


  // [selected, setSelected] = useState(locations[Math.floor(Math.random() * 5)])


  const filteredLocations =
    query === ''
      ? locations
      : locations.filter((location) =>
        location.name
          .toLowerCase()
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  useEffect(() => {
    // Dispatch an action with the selected value from the component's state

    if (props.airportMode === "on") {
      if (props.which === "1") {
        dispatch(setSelectedAirport1(selected.name));
      } else if (props.which === "2") {
        dispatch(setSelectedAirport2(selected.name));
      }
    } else if (props.airportMode === "off") {
      console.log("Not in airport mode");
      if (props.which === "1") {
        console.log("UPDATING CITY 1 TO BE ", selected.name);
        dispatch(setSelectedCity1(selected.cityId));
      } else if (props.which === "2") {
        console.log("UPDATING CITY 2 TO BE ", selected.name);
        dispatch(setSelectedCity2(selected.cityId));
      }
    } else {
      console.warn("Unknown state of airportMode");
    }
  });

  return (
    <div className="static top-16 w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-base-content focus:ring-0"
              displayValue={(location) => location.name}
              onChange={(event) => setQuery(event.target.value)}
              autocomplete="off"
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-base-content"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary-content py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredLocations.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-base-content">
                  Nothing found.
                </div>
              ) : (
                filteredLocations.map((location) => (
                  <Combobox.Option
                    key={location.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-neutral-focus text-neutral-content' : 'text-neutral-focus'
                      }`
                    }
                    value={location}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {location.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-neutral-content' : 'text-accent-content'
                              }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>

  )
}

export default connect()(LocationPicker);
