import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import languageStrings from "../../../translationFile";
import { UserContext } from "../../../UserContext";
import React from "react";
import { airplanesEndpoint } from "../../../endpoints";
function AirplaneDetailsPage(){
    const navigate = useNavigate();
    const {language, setLanguage} = React.useContext(UserContext)
    const text = languageStrings[language]['airplaneDetailsPage'];
    const airplaneId = useParams().id
    const [airplane, setAirplane] = useState(
        {
            image: "",
            type: "",
            registration: "",
            owner: "",
            pricePerHour: "",
            category: "",
            model: ""
        }
    );
    useEffect(()=>{
        fetch(airplanesEndpoint+"/"+airplaneId, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'})
        .then(response => response.json().then(data => {
            data.model = data.model.model;
            setAirplane(data)
        }))
    }, [])
    return(

        <div className="airplaneDetailsPage container">
            <div className="mt-3 row">
                <div className="col-md-4 p-2 text-center border rounded">
                    <img src={airplane.image} className="img-thumbnail"></img>
                    <h1>{airplane.model}</h1>
                    <h2>{airplane.registration}</h2>
                </div>
                <div className="col">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td>{text['model']}</td>
                                {/* <td>{airplane['model']['model']}</td> */}
                            </tr>
                            <tr>
                                <td>{text['type']}</td>
                                <td>{airplane.type}</td>
                            </tr>
                            <tr>
                                <td>{text['registration']}</td>
                                <td>{airplane.registration}</td>
                            </tr>
                            <tr>
                                <td>{text['owner']}</td>
                                <td>{airplane.owner}</td>
                            </tr>
                            <tr>
                                <td>{text['pricePerHour']}</td>
                                <td>{airplane.pricePerHour}</td>
                            </tr>
                            <tr>
                                <td>{text['category']}</td>
                                <td>{airplane.category}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default AirplaneDetailsPage;