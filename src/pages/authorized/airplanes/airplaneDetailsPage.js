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
            data.category = data.model.category;
            data.model = data.model.model;
            setAirplane(data)
        }))
    }, [])
    return(

        <div className="airplaneDetailsPage container">
            <div className="mt-3 row">
                <div className="col-md-4 p-2 border rounded">
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-outline-secondary px-4" onClick={()=>{navigate(-1)}}>&lt; {text['back']}</button>
                        <div className="d-flex flex-column align-items-center">
                            <h1 className="text-center">{airplane.model}</h1>
                            <h2 className="text-center">{airplane.registration}</h2>
                        </div>
                    </div>
                    <div className="text-center">
                        <img src={airplane.image} className="img-thumbnail border-0"></img>
                    </div>
                </div>
                <div className="col">
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td>{text['model']}</td>
                                <td>{airplane.model}</td>
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