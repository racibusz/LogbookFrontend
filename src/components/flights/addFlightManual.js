import {flightsEndpoint} from '../../endpoints.js';
import {useNavigate} from 'react-router-dom';
import BootstrapModal from '../bootstrapModal.js';
import React from 'react';
function AddFlightManual(){
    const navigate = useNavigate();
    const [communicate, setCommunicate] = React.useState("");
    const [modalTitle, setModalTitle] = React.useState("");
    const [showModal, setShowModal] = React.useState(false);
    const addFlight = async () => {
        const flight = {
            departureAerodrome: document.querySelector('input[name="departureAerodrome"]').value,
            arrivalAerodrome: document.querySelector('input[name="arrivalAerodrome"]').value,
            departureTime: document.querySelector('input[name="departureTime"]').value,
            arrivalTime: document.querySelector('input[name="arrivalTime"]').value,
            flightDate: document.querySelector('input[name="flightDate"]').value,
            aircraftType: document.querySelector('input[name="aircraftType"]').value,
            aircraftRegistration: document.querySelector('input[name="aircraftRegistration"]').value,
            SinglePilotSeTime: document.querySelector('input[name="SinglePilotSeTime"]').value,
            SinglePilotMeTime: document.querySelector('input[name="SinglePilotMeTime"]').value,
            multiPilotTime: document.querySelector('input[name="multiPilotTime"]').value,
            totalTime: document.querySelector('input[name="totalTime"]').value,
            picName: document.querySelector('input[name="picName"]').value,
            landingsDay: document.querySelector('input[name="landingsDay"]').value || 0,
            landingsNight: document.querySelector('input[name="landingsNight"]').value || 0,
            flightConditionNightTime: document.querySelector('input[name="flightConditionNightTime"]').value,
            flightConditionIfrTime: document.querySelector('input[name="flightConditionIfrTime"]').value,
            picTime: document.querySelector('input[name="picTime"]').value,
            copilotTime: document.querySelector('input[name="copilotTime"]').value,
            dualTime: document.querySelector('input[name="dualTime"]').value,
            instructorTime: document.querySelector('input[name="instructorTime"]').value,
            remarks: document.querySelector('input[name="remarks"]').value
        }
        // Wymagane: departureAerodrome, departureTime, arrivalAerodrome, arrivalTime, flightDate, aircraftType, aircraftRegistration
        if (!flight.departureAerodrome || !flight.departureTime || !flight.arrivalAerodrome || !flight.arrivalTime || !flight.flightDate || !flight.aircraftType || !flight.aircraftRegistration) {
            setShowModal(true);
            setCommunicate("Wszystkie pola są wymagane");
            setModalTitle("Błąd");
            return;
        }
        const response = await fetch(flightsEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(flight)
        });
        if (response.ok) {
            navigate('/flights');
        } else {
            console.log('Error: ', response.status);
        }
    }
    return(
        <div className="table-responsive">
            <BootstrapModal show={showModal} text={communicate} modalTitle={modalTitle} />
            <table className="table table-bordered text-center">
                <thead>
                    <tr>
                        <th className="px-5" rowSpan={2}>Data</th>
                        <th className="px-5" colSpan={2}>Departure</th>
                        <th className="px-5" colSpan={2}>Arrival</th>
                        <th className="px-5" colSpan={2}>Statek Powietrzny</th>
                        <th className="px-5" colSpan={2}>Single Pilot Time</th>
                        <th className="px-5" rowSpan={2}>Multi pilot time</th>
                        <th className="px-5" rowSpan={2}>Total time of flight</th>
                        <th className="px-5" rowSpan={2}>PIC name</th>
                        <th className="px-5" colSpan={2}>Landings</th>
                        <th className="px-5" colSpan={2}>FLight Conditions Time</th>
                        <th className="px-5" colSpan={4}>Pilot function</th>
                        <th className="px-5" rowSpan={2}>Remarks</th>
                    </tr>
                    <tr>
                        <th className="px-2" >Time</th>
                        <th className="px-2" >Place</th>
                        <th className="px-2" >Place</th>
                        <th className="px-2" >Time</th>
                        <th className="px-2" >Make,Model</th>
                        <th className="px-2" >Registration</th>
                        <th className="px-2" >SE</th>
                        <th className="px-2" >ME</th>
                        <th className="px-2" >Day</th>
                        <th className="px-2" >Night</th>
                        <th className="px-3" >Night</th>
                        <th className="px-3" >IFR</th>
                        <th className="px-3" >Pic</th>
                        <th className="px-3" >Co-pilot</th>
                        <th className="px-3" >Dual</th>
                        <th className="px-3" >Instructor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input className="form-control" name="flightDate" type="date" onInput={(e) => e.target.value = e.target.value.toUpperCase()}/></td>
                        <td><input className="form-control" name="departureTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="departureAerodrome" type="text" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="arrivalAerodrome" type="text" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="arrivalTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="aircraftType" type="text" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="aircraftRegistration" type="text" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="SinglePilotSeTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="SinglePilotMeTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="multiPilotTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="totalTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="picName" type="text" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="landingsDay" type="number" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="landingsNight" type="number" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="flightConditionNightTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="flightConditionIfrTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="picTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="copilotTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="dualTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="instructorTime" type="time" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                        <td><input className="form-control" name="remarks" type="text" onInput={(e) => e.target.value = e.target.value.toUpperCase()} /></td>
                    </tr>
                </tbody>
            </table>
            <div className="d-flex justify-content-center p-3">
                <button className="btn btn-success btn-lg btn-block" onClick={addFlight}>Dodaj</button>
            </div>
        </div>
    )
}
export default AddFlightManual;