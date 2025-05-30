import { use, useEffect, useState } from "react";
import BootstrapModal from "../bootstrapModal";
import { useNavigate } from "react-router-dom";
import { flightsEndpoint } from "../../endpoints";

function AddFlightAuto() {
    const navigate = useNavigate();
    const [arrivalTime, setArrivalTime] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [departureAerodrome, setDepartureAerodrome] = useState("");
    const [arrivalAerodrome, setArrivalAerodrome] = useState("");
    const [aircraftRegistration, setAircraftRegistration] = useState("");
    const [aircraftType, setAircraftType] = useState("");
    const [pilotFunction, setPilotFunction] = useState("");
    const [landingsDay, setLandingsDay] = useState(0);
    const [landingsNight, setLandingsNight] = useState(0);
    const [remarks, setRemarks] = useState("");
    const [timeDiff, setTimeDiff] = useState("");

    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");    
    const [picName, setPicName] = useState("");
    const [flightDate, setFlightDate] = useState("");
    useEffect(()=>{if(modalShow){setModalShow(false)}}, [modalShow])
    useEffect(() => {
        console.log(departureTime, arrivalTime);
        if (arrivalTime === "" || departureTime === "") return;

        const arrivalTimeSplit = arrivalTime.split(":");
        const departureTimeSplit = departureTime.split(":");
        const timeStart = new Date();
        const timeStop = new Date();
        timeStart.setHours(departureTimeSplit[0]);
        timeStart.setMinutes(departureTimeSplit[1]);
        timeStop.setHours(arrivalTimeSplit[0]);
        timeStop.setMinutes(arrivalTimeSplit[1]);
        const miliseconds = timeStop - timeStart;
        const minutesTotal = miliseconds / 60 / 1000;
        const hours = Math.floor(minutesTotal / 60);
        const minutes = minutesTotal - 60 * hours;
        setTimeDiff(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`);
    }, [arrivalTime, departureTime]);

    const validateData = () => {
        if(flightDate == ""){
            setModalTitle("Błąd");
            setModalText("Wpisz datę lotu");
            setModalShow(true)
            return;
        }
        if(picName == ""){
            setModalTitle("Błąd");
            setModalText("Wpisz nazwisko PIC");
            setModalShow(true)
            return;
        }
        if(departureAerodrome == "" || arrivalAerodrome == ""){
            setModalTitle("Błąd");
            setModalText("Wpisz lotniska wylotu i przylotu");
            setModalShow(true)
            return;
        }
        if(departureTime == "" || arrivalTime == "" || timeDiff==""){
            setModalTitle("Błąd");
            setModalText("Uzupełnij godziny startu, lądowania i długość lotu");
            setModalShow(true)
            return;
        }
        if(aircraftType == "" || aircraftRegistration == ""){
            setModalTitle("Błąd");
            setModalText("Wpisz dane samolotu");
            setModalShow(true)
            return;
        }
        if(pilotFunction == ""){
            setModalTitle("Błąd");
            setModalText("Uzupełnij funkcję pilota");
            setModalShow(true)
            return;
        }
        if(landingsDay == "" && landingsNight == "" || landingsDay == 0 && landingsNight == 0){
            setModalTitle("Błąd");
            setModalText("Wpisz liczby lądowań");
            setModalShow(true)
            return;
        }
        addFlight();
    };
 const addFlight = async () => {
        const flight = {
            departureAerodrome: departureAerodrome,
            arrivalAerodrome: arrivalAerodrome,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            flightDate: flightDate,
            aircraftType: aircraftType,
            aircraftRegistration: aircraftRegistration,
            SinglePilotSeTime: timeDiff,
            totalTime: timeDiff,
            picName: picName,
            landingsDay: landingsDay || 0,
            landingsNight: landingsNight || 0,
            picTime: pilotFunction=='pic'?timeDiff:"",
            dualTime: pilotFunction=='dual'?timeDiff:"",
            remarks: remarks
        }
        // Wymagane: departureAerodrome, departureTime, arrivalAerodrome, arrivalTime, flightDate, aircraftType, aircraftRegistration
        if (!flight.departureAerodrome || !flight.departureTime || !flight.arrivalAerodrome || !flight.arrivalTime || !flight.flightDate || !flight.aircraftType || !flight.aircraftRegistration) {
            setModalShow(true);
            setModalText("Wszystkie pola są wymagane");
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
    return (
        <div className="container row">
            <BootstrapModal text={modalText} modalTitle={modalTitle} show={modalShow}></BootstrapModal>
            <div className="col-md-5 p-3 m-1 border rounded text-center">
                <table className="table table-striped caption-top">
                    <caption>
                        To jest <b>uproszczona</b> metoda dodawania lotów. Sprawdza się dobrze przy dodawaniu lotów VFR dziennych, na samolotach jednosilnikowych.
                    </caption>
                    <thead className="thead-dark">
                        <tr>
                            <td colSpan={2}>Odlot</td>
                            <td colSpan={2}>Przylot</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2">Lotnisko</td>
                            <td className="p-2">
                                <input
                                    className="form-control"
                                    name="departureAerodrome"
                                    type="text"
                                    value={departureAerodrome}
                                    onChange={(e) => setDepartureAerodrome(e.target.value.toUpperCase())}
                                />
                            </td>
                            <td className="p-2">Lotnisko</td>
                            <td className="p-2">
                                <input
                                    className="form-control"
                                    name="arrivalAerodrome"
                                    type="text"
                                    value={arrivalAerodrome}
                                    onChange={(e) => setArrivalAerodrome(e.target.value.toUpperCase())}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">Godzina (UTC)</td>
                            <td className="p-2">
                                <input
                                    className="form-control"
                                    name="departureTime"
                                    type="time"
                                    value={departureTime}
                                    onChange={(e) => setDepartureTime(e.target.value)}
                                />
                            </td>
                            <td className="p-2">Godzina (UTC)</td>
                            <td className="p-2">
                                <input
                                    className="form-control"
                                    name="arrivalTime"
                                    type="time"
                                    value={arrivalTime}
                                    onChange={(e) => setArrivalTime(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Data lotu</td>
                            <td colSpan={2}><input type="date" className="form-control" onChange={(e)=>setFlightDate(e.target.value)}></input></td>
                        </tr>
                        <tr>
                            <td className="p-2" colSpan={2}>Samolot</td>
                            <td className="p-2" colSpan={2}></td>
                        </tr>
                        <tr>
                            <td className="p-2">Rejestracja</td>
                            <td className="p-2">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="aircraftRegistration"
                                    value={aircraftRegistration}
                                    onChange={(e) => setAircraftRegistration(e.target.value.toUpperCase())}
                                />
                            </td>
                            <td className="p-2">Model</td>
                            <td className="p-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="aircraftType"
                                    value={aircraftType}
                                    onChange={(e) => setAircraftType(e.target.value.toUpperCase())}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <button className="btn btn-success mt-2 p-2 px-5" onClick={validateData}>
                                    Dodaj lot
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-md-3 p-3 m-1 border rounded">
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td className="p-2">Całkowity czas lotu</td>
                            <td className="p-2">
                                <input className="form-control" type="time" value={timeDiff} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">Nazwisko PIC</td>
                            <td className="p-2">
                                <input 
                                    type="text"
                                    name="picName"
                                    className="form-control"
                                    value={picName}
                                    onChange={(e)=>setPicName(e.target.value.toUpperCase())}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="p-2">Funkcja</td>
                            <td className="p-2">
                                <div className="form-check">
                                    <label htmlFor="picRadio" className="form-check-label">PIC</label>
                                    <input
                                        type="radio"
                                        name="pilotFunction"
                                        id="picRadio"
                                        className="form-check-input"
                                        value="pic"
                                        checked={pilotFunction === "pic"}
                                        onChange={(e) => setPilotFunction(e.target.value)}
                                    />
                                </div>
                                <div className="form-check">
                                    <label htmlFor="dualRadio" className="form-check-label">DUAL</label>
                                    <input
                                        type="radio"
                                        name="pilotFunction"
                                        id="dualRadio"
                                        className="form-check-input"
                                        value="dual"
                                        checked={pilotFunction === "dual"}
                                        onChange={(e) => setPilotFunction(e.target.value)}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Liczba lądowań</td>
                        </tr>
                        <tr>
                            <td>Dzień</td>
                            <td>Noc</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="landingsDay"
                                    value={landingsDay}
                                    onChange={(e) => setLandingsDay(Number(e.target.value))}
                                />
                            </td>
                            <td>
                                <input
                                    className="form-control"
                                    type="number"
                                    name="landingsNight"
                                    value={landingsNight}
                                    onChange={(e) => setLandingsNight(Number(e.target.value))}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>Remarks:</  td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input type="text" className="form-control" name="remarks" onChange={(e)=>setRemarks(e.target.value)}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>                 
            </div>
        </div>
    );
}

export default AddFlightAuto;
