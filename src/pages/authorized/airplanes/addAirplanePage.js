import { useNavigate } from "react-router-dom";
import { useState } from "react";
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

    const addAirplane = async () => {
        if(type === "" || registration === "" || owner === "" || price === "" || category === ""){
            alert("NO EMPTY FIELDS")
        }
        fetch(airplanesEndpoint, {method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include', body: JSON.stringify({
            model: type,
            registration: registration,
            owner: owner,
            pricePerHour: price,
            category: category,
        })})
    }

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
                                <select class="form-select" onChange={(e)=>setCategory(e.target.value.toUpperCase())}>
                                <option selected>-</option>
                                    <option value="SEP(L)">SEP(L)</option>
                                    <option value="MEP(L)">MEP(L)</option>
                                    <option value="SEP(S)">SEP(S)</option>
                                    <option value="MEP(S)">MEP(S)</option>
                                </select>
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