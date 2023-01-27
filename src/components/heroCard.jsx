import { Card, Form } from 'react-daisyui'
import LocationPicker from './combobox'
import React from 'react'
import { useDispatch } from 'react-redux'
import { enableAirportMode, enableCityMode } from '../features/insightsSlice'

class QueryBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick.bind(this);
        this.setStateToAirportMode.bind(this);
        this.setStateToCityMode.bind(this);

    }

    setStateToAirportMode = () => {
        this.props.setStateToAirportMode();
    }

    setStateToCityMode = () => {
        this.props.setStateToCityMode();
    }

    submit() {
        console.log("Picked up submit event")
        // var data = Object.assign(
        //     {},
        //     this._stepOne.getData(),
        //     this._stepTwo.getData()
        // );
    }

    handleClick = () => {

        const dispatch = useDispatch()

        this.props.toggleLoader();
        if (this.props.cardTitle.equals('Select Airports')) {
            dispatch(enableAirportMode())
        } else if (this.props.cardTitle.equals('Select Cities')) {
            dispatch(enableCityMode())
        } else {
            dispatch(enableCityMode())
        }
    }

    render() {
        return (
            <Card className="rounded-xl w-96 bg-primary text-primary-content flex-auto justify-center items-center ">
                <Card.Body className='space-y-4'>
                    <Form className='space-y-4 px-8 py-5'>
                        <h1 className='card-title'>{this.props.cardTitle}</h1>

                        <LocationPicker airportMode={this.props.airportMode} which="1"/>
                        <LocationPicker airportMode={this.props.airportMode} which="2"/>


                    </Form>
                    {/* <div class="card-actions justify-center">
                        <CustomButton buttonName={this.props.buttonName} cardTitle={this.props.cardTitle} />
                    </div> */}

                </Card.Body>
            </Card>

        );
    }
};

function CustomButton(props) {
    const dispatch = useDispatch()

    if (props.cardTitle === "Select Airports") {
        return <button className="btn btn-accent" onClick={() => dispatch(enableAirportMode())}>{props.buttonName}</button>
    } else if (props.cardTitle === "Select Cities") {
        return <button className="btn btn-accent" onClick={() => dispatch(enableCityMode())}>{props.buttonName}</button>
    }
}


export default QueryBuilder
