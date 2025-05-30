import AddFlightAuto from "../../../components/flights/addFlightAuto";
import AddFlightManual from "../../../components/flights/addFlightManual";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function AddFlightPage(){
    const [manual, setManual] = useState(false)
    const navigate = useNavigate();
    return(
        <div className="addFlight container">
            {manual}
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-primary px-5 m-2" onClick={()=>{manual?setManual(false):setManual(true)}}>{manual?"AUTO":"Manual"}</button>
                    <button className="btn btn-outline-primary btn-block" onClick={()=>{navigate("/logbook")}}>Wróć</button>
                </div>
                <div className="col-md-12">
                    {manual?<AddFlightManual></AddFlightManual>:<AddFlightAuto />}
                </div>
            </div>
        </div>
    )
}
export default AddFlightPage;