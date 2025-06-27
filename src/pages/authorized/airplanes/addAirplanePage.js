import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import languageStrings from "../../../translationFile";
import { UserContext } from "../../../UserContext";
import React from "react";
import { airplanesEndpoint } from "../../../endpoints";
function AddAirplanePage(){
    const navigate = useNavigate();
    const {language, setLanguage} = React.useContext(UserContext)
    const text = languageStrings[language]['airplanesPage'];
    const [type, setType] = useState("");
    const [registration, setRegistration] = useState("");
    const [owner, setOwner] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [models, setModels] = useState([]);
    const [model, setModel] = useState("");
    const [modelName, setModelName] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const addAirplane = async () => {
        if(type === "" || registration === "" || owner === "" || price === "" || category === ""){
            alert("NO EMPTY FIELDS")
        }
        fetch(airplanesEndpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include', body: JSON.stringify({
            model: model,
            type:type,
            registration: registration,
            owner: owner,
            pricePerHour: price,
            category: category,
            image: imageUrl
        })})
        navigate("/airplanes")

    }
    useEffect(()=>{
        if(type === "") return;
        fetch(airplanesEndpoint+"/type/"+type, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'})
        .then(response => response.json().then(data => {
            setModels(data)
            setDropdownVisible(true);
        }))
    }, [type])
    useEffect(()=>{
        if(model === "") return;
        setCategory(models.find((m) => m.id == model).category);
        setModelName(models.find((m) => m.id == model).model);
        setType(models.find((m) => m.id == model).type);
    }, [model])
    useEffect(()=>{
        if(modelName === "") setModels([]);
        if(modelName.length<3) return;
        fetch(airplanesEndpoint+"/typenames/"+modelName, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then((response)=>{response.json().then((data)=>{
            if(data.length == 0) return;
            setModels(data);
        })})
    }, [modelName])
    return(
        <div className="addAirplanePage container">
            <div className="mt-3">
                <h1>{text['addAirplane']}</h1>
                <p>{text['addAirplaneParagraph']}</p>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>{text['type']}</td>
                            <td><input type="text" value={type} placeholder={text['chooseType']} onChange={(e) => setType(e.target.value.toUpperCase())} className="form-control"></input></td>
                        </tr>
                        <tr>
                            <td>{text['model']}</td>
                            <td>
                            <div className="dropdown" style={{ position: 'relative' }}>
                                <input
                                type="text"
                                className="form-control"
                                value={modelName}
                                onFocus={() => setDropdownVisible(true)}
                                onInput={(e) => {
                                    const value = e.target.value.toUpperCase();
                                    setModelName(value);
                                    setDropdownVisible(true);
                                }}
                                onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
                                placeholder={text['chooseModel']}
                                id="aircraftInput"
                                autoComplete="off"
                                />
                                <ul className={`dropdown-menu w-100 ${dropdownVisible ? 'show' : ''}`} id="aircraftList">
                                {models
                                    .filter(model => model.model.toUpperCase().includes(modelName))
                                    .map(model => (
                                    <li key={model.id}>
                                        <a
                                        href="#"
                                        className="dropdown-item"
                                        onMouseDown={(e) => {
                                            e.preventDefault(); // zapobiega blur zanim kliknie
                                            setModel(model.id);
                                            setModelName(model.model.toUpperCase());
                                            setDropdownVisible(false);
                                        }}
                                        >
                                        {model.model}
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                            </td>

                        </tr>
                        <tr>
                            <td>{text['registration']}</td>
                            <td><input type="text" value={registration} placeholder={text['chooseRegistration']} onChange={(e) => setRegistration(e.target.value.toUpperCase())} className="form-control"></input></td>
                        </tr>
                        <tr>
                            <td>{text['owner']}</td>
                            <td><input type="text" value={owner} placeholder={text['chooseOwner']} onChange={(e) => setOwner(e.target.value.toUpperCase())} className="form-control"></input></td>
                        </tr>
                        <tr>
                            <td>{text['price']}</td>
                            <td><input type="text" value={price} placeholder={text['choosePrice']} onChange={(e) => setPrice(e.target.value.toUpperCase())} className="form-control"></input></td>
                        </tr>
                        <tr>
                            <td>{text['imageUrl']}</td>
                            <td><input type="text" value={imageUrl} placeholder={text['chooseImageUrl']} onChange={(e) => setImageUrl(e.target.value.toLowerCase())} className="form-control"></input></td>
                        </tr>
                        <tr>
                            <td>{text['category']}</td>
                            <td>
                                {/* <select class="form-select" onChange={(e)=>setCategory(e.target.value.toUpperCase())}>
                                <option selected>-</option>
                                    <option value="SEP(L)">SEP(L)</option>
                                    <option value="MEP(L)">MEP(L)</option>
                                    <option value="SEP(S)">SEP(S)</option>
                                    <option value="MEP(S)">MEP(S)</option>
                                </select> */}
                                {category}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button className="btn btn-success" onClick={()=>{addAirplane()}}>
                                    {text['addAirplane']}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}
export default AddAirplanePage;