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
        })})
        navigate("/airplanes")

    }
    useEffect(()=>{
        if(type === "") return;
        fetch(airplanesEndpoint+"/type/"+type, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'})
        .then(response => response.json().then(data => {
            console.log(data)
            setModels(data)
            // mamy pobrane modele samolotów, umożliwić wybór
        }))
    }, [type])
    useEffect(()=>{
        if(model === "") return;
        setCategory(models.find((m) => m.id == model).category);
    }, [model])
    return(
        <div className="addAirplanePage container">
            <div className="mt-3">
                <h1>{text['addAirplane']}</h1>
                <p>{text['addAirplaneParagraph']}</p>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>{text['type']}</td>
                            <td><input type="text" value={type} onChange={(e) => setType(e.target.value.toUpperCase())} className="form-control"></input></td>
                        </tr>
                        <tr>
                            <td>{text['model']}</td>
                            <td>
                                <select class="form-select" onChange={(e)=>setModel(e.target.value)}>
                                    <option selected>{text['chooseModel']}</option>
                                    {models.map((model) => (
                                        <option key={model.id} value={model.id}>{model.model}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>{text['registration']}</td>
                            <td><input type="text" value={registration} onChange={(e) => setRegistration(e.target.value.toUpperCase())} className="form-control"></input></td>
                        </tr>
                        <tr>
                            <td>{text['owner']}</td>
                            <td><input type="text" value={owner} onChange={(e) => setOwner(e.target.value.toUpperCase())} className="form-control"></input></td>
                        </tr>
                        <tr>
                            <td>{text['price']}</td>
                            <td><input type="text" value={price} onChange={(e) => setPrice(e.target.value.toUpperCase())} className="form-control"></input></td>
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