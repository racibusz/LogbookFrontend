import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import languageStrings from "../../../translationFile";
import { UserContext } from "../../../UserContext";
import React from "react";
import { airplanesEndpoint } from "../../../endpoints";
import { Link } from "react-router-dom";
function AirplanesPage(){
    const navigate = useNavigate();
    const {language, setLanguage} = React.useContext(UserContext)
    const [airplanes, setAirplanes] = useState([])

    useEffect(()=>{
        fetch(airplanesEndpoint, {credentials: 'include'}).then((res)=>{
            res.json().then((data)=>{
                setAirplanes(data)
            })
        })
    }, [])
    
    const text = languageStrings[language]['airplanesPage'];
    return(
        <div className="airplanesPage container">
            <div className="mt-3">
                <div className="row">
                    <div className="col-md-4 p-2 d-flex flex-column align-items-center">
                        <h2>{text['myPlanes']}</h2>
                        <p>{text['myPlanesParagraph']}</p>
                    </div>
                </div>
                <div className="row m-2">
                    {airplanes.length>0?airplanes.map((airplane, index)=>{
                        return(
                            <div className="col-md-3 position-relative " onClick={()=>{navigate('/airplanes/'+airplane.id)}}key={index} style={{backgroundImage: `url(${airplane.image})`, backgroundSize: 'cover', height: '200px', position: 'relative'}}>
                            <div
                                className="overlay p-2 d-flex justify-content-center align-items-center text-white"
                                style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: '#333333',
                                zIndex: 2,
                                transition: 'opacity 0.3s ease',
                                opacity: .8,
                                cursor: 'pointer',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity= '.8'}
                                >
                                    <div className="text-center">
                                        <h1>{airplane.model.model}</h1>
                                        <h2>{airplane.registration}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    }):""}

                        <div className="col-md-3 d-flex flex-column align-items-center justify-content-center position-relative bg-light" style={{ height: '200px' }}
                        onClick={() => navigate('/addAirplane')}>
                        <div
                            className="overlay d-flex justify-content-center align-items-center"
                            style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: '#333333',
                            zIndex: 2,
                            transition: 'opacity 0.3s ease',
                            cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '0'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity= '1'}

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-plus text-white" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </div>
                        <h2>{text['add']}</h2>
                        <p className="text-muted">{text['clickToAdd']}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AirplanesPage;