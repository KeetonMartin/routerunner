import { Button, Hero, Card, Link, Form, Input } from 'react-daisyui'
import LocationPicker from './combobox'
import HeroCard from './heroCard'

export default (props) => {
    return (
        <div className="hero min-h-[1rem] bg-base-200" style={{ backgroundImage: `url("https://i.imgur.com/9Elfmcj.png")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content text-primary-content">
                <div className="max-w-full space-y-4 py-8
">

                    <h1 className='text-5xl font-bold'>Welcome to RouteRunner</h1>
                    <p className="py-6">You tell us which city-pair you fly the most, we'll tell you which credit
                        card to get to optimize your points or miles.</p>

                    <div class="grid grid-cols-2">
                        <HeroCard cardTitle="Select Cities" buttonName="Find Cards" airportMode="off" pickerOneTitle="First Metro Area" pickerTwoTitle="Second Metro Area" />
                        <HeroCard cardTitle="Select Airports" buttonName="Find Cards" airportMode="on" pickerOneTitle="First Airport" pickerTwoTitle="Second Airport" />
                    </div>

                </div>
            </div>
        </div>
    )
}
