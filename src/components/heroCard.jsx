import { Button, Hero, Card, Link, Form, Input } from 'react-daisyui'
import LocationPicker from './combobox'

export default function HeroCard(props) {
    return (
        <Card className="rounded-xl w-96 bg-primary text-primary-content flex-auto justify-center items-center ">
            <Card.Body className='space-y-4'>
                <Form className='space-y-4 px-8 py-5'>
                    <h1 className='card-title'>{props.cardTitle}</h1>
                    {/* <Form.Label title={props.pickerOneTitle} /> */}
                    <LocationPicker airportMode={props.airportMode} />
                    {/* <Form.Label title={props.pickerTwoTitle} /> */}
                    <LocationPicker airportMode={props.airportMode} />
                    <div class="card-actions justify-center">
                        <button className="btn btn-accent">{props.buttonName}</button>
                    </div>

                </Form>
            </Card.Body>
        </Card>
    )
}
