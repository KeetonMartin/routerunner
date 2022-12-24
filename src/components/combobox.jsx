import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const cities = [
  { id: 1, name: 'San Francisco' },
  { id: 2, name: 'New York City' },
  { id: 3, name: 'Chicago' },
  { id: 4, name: 'Los Angeles' },
  { id: 5, name: 'Seattle' },
  { id: 6, name: 'Boston' },
  { id: 7, name: 'Washington, D.C.' },
  { id: 8, name: 'Miami' },
  { id: 9, name: 'Denver' },
  { id: 10, name: 'Las Vegas' },
  { id: 11, name: 'San Diego' },
  { id: 12, name: 'Portland' },
  { id: 13, name: 'Austin' }
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

export default function LocationPicker(props) {

  var locations = cities;
  if (props.airportMode === "on") {
    locations = airports;
  }

  const [selected, setSelected] = useState(locations[Math.floor(Math.random() * locations.length)])
  const [query, setQuery] = useState('')

  const filteredLocations =
    query === ''
      ? locations
      : locations.filter((location) =>
        location.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  return (
    <div className="static top-16 w-72">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-base-content focus:ring-0"
              displayValue={(location) => location.name}
              onChange={(event) => setQuery(event.target.value)}
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
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-neutral-focus text-neutral-content' : 'text-neutral-focus'
                      }`
                    }
                    value={location}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {location.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-neutral-content' : 'text-accent-content'
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

