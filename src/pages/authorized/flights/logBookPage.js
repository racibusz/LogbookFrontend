
import LogBook from "../../../components/flights/logBook";
function LogBookPage(){
    return(
        <div className="logBook container-fluid m-4">
            <div className="row">
                <div className="col-md-12">
                    <LogBook></LogBook>
                </div>
            </div>
        </div>
    )
}
export default LogBookPage;