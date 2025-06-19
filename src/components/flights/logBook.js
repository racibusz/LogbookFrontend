import { useEffect } from "react";
import { flightsEndpoint } from "../../endpoints";
import { useState } from "react";
import BootstrapModal from "../bootstrapModal";
import { flightsModifyEndpoint } from "../../endpoints";
import { useNavigate } from "react-router-dom";

function LogBook() {
  const [flights, setFlights] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [page, setPage] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalText, setModalText] = useState("");
  const [flightToDelete, setFlightToDelete] = useState(-1);
  const [flightDeletionTimeout, setFlightDeletionTimeout] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (flightDeletionTimeout != null) {
      setFlightDeletionTimeout(
        setTimeout(() => {
          setFlightToDelete(null);  
        }, 5000)
      );
    }
  }, [flightToDelete]);
  useEffect(() => {
    if (modalShow) {
      setModalShow(false);
    }
  }, [modalShow]);
  const [summaryThisPage, setSummaryThisPage] = useState(null);
  const [summaryBeforePage, setSummaryBeforePage] = useState(null);
  const [summaryTotal, setSummaryTotal] = useState(null);
  useEffect(() => {
    fetch(flightsEndpoint + page, { credentials: "include" })
      .then((response) => {
        response.json().then((data) => {
          if(data.flights!=undefined)
            setFlights(data.flights);
          setMaxPages(data.pageMax);
          setSummaryThisPage(data.summaryThisPage);
          setSummaryBeforePage(data.summaryBeforePage);
          setSummaryTotal(data.summaryTotal);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);
  const [editingFlight, setEditingFlight] = useState(null);
  return (
    <div className="logBookSummary">
      <BootstrapModal
        text={modalText}
        modalTitle={modalTitle}
        show={modalShow}
      ></BootstrapModal>
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr>
              <td>
                <button
                  className="btn btn-primary"
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                  disabled={page - 1 < 0 ? true : false}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  &lt;
                </button>
                <button
                  className="btn btn-primary"
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                  disabled={page + 1 > maxPages ? true : false}
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  &gt;
                </button>
              </td>
              <td>
                Strona:&nbsp;
                {page + 1}/{maxPages + 1}
              </td>
              <td colSpan={2}><button className="btn btn-outline-primary btn-block" onClick={()=>{navigate("/addFlight")}}>Dodaj lot</button></td>
            </tr>
            <tr>
              <th className="px-5" rowSpan={2}>
                Data
              </th>
              <th className="px-5" colSpan={2}>
                Departure
              </th>
              <th className="px-5" colSpan={2}>
                Arrival
              </th>
              <th className="px-5" colSpan={2}>
                Statek Powietrzny
              </th>
              <th className="px-5" colSpan={4}>
                Single Pilot Time
              </th>
              <th className="px-5" colSpan={2} rowSpan={2}>
                Multi pilot time
              </th>
              <th className="px-5" colSpan={2} rowSpan={2}>
                Total time of flight
              </th>
              <th className="px-5" rowSpan={2}>
                PIC name
              </th>
              <th className="px-5" colSpan={2}>
                Landings
              </th>
              <th className="px-5" colSpan={4}>
                FLight Conditions Time
              </th>
              <th className="px-5" colSpan={8}>
                Pilot function
              </th>
              <th className="px-5" rowSpan={2}>
                Remarks
              </th>
              <th rowSpan={2}>-</th>
            </tr>
            <tr>
              <th className="px-2">Place</th>
              <th className="px-2">Time</th>
              <th className="px-2">Place</th>
              <th className="px-2">Time</th>
              <th className="px-2">Make,Model</th>
              <th className="px-2">Registration</th>
              <th className="px-2" colSpan={2}>
                SE
              </th>
              <th className="px-2" colSpan={2}>
                ME
              </th>
              <th className="px-2">Day</th>
              <th className="px-2">Night</th>
              <th className="px-3" colSpan={2}>
                Night
              </th>
              <th className="px-3" colSpan={2}>
                IFR
              </th>
              <th className="px-3" colSpan={2}>
                Pic
              </th>
              <th className="px-3" colSpan={2}>
                Co-pilot
              </th>
              <th className="px-3" colSpan={2}>
                Dual
              </th>
              <th className="px-3" colSpan={2}>
                Instructor
              </th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => {
              return (
                <tr key={index}>
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.flightDate}</td>
                  ) : (
                    <td>
                      <input
                        type="date"
                        defaultValue={flight.flightDate}
                        onInput={(e) => (flight.flightDate = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.departureAerodrome}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        defaultValue={flight.departureAerodrome}
                        onInput={(e) => (flight.departureAerodrome = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.departureTime}</td>
                  ) : (
                    <td>
                      <input
                        type="time"
                        defaultValue={flight.departureTime}
                        onInput={(e) => (flight.departureTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.arrivalAerodrome}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        defaultValue={flight.arrivalAerodrome}
                        onInput={(e) => (flight.arrivalAerodrome = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.arrivalTime}</td>
                  ) : (
                    <td>
                      <input
                        type="time"
                        defaultValue={flight.arrivalTime}
                        onInput={(e) => (flight.arrivalTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.aircraftType}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        defaultValue={flight.aircraftType}
                        onInput={(e) => (flight.aircraftType = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.aircraftRegistration}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        defaultValue={flight.aircraftRegistration}
                        onInput={(e) => (flight.aircraftRegistration = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.SinglePilotSeTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.SinglePilotSeTime}
                        onInput={(e) => (flight.SinglePilotSeTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.SinglePilotSeTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.SinglePilotMeTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.SinglePilotMeTime}
                        onInput={(e) => (flight.SinglePilotMeTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.SinglePilotMeTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.multiPilotTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.multiPilotTime}
                        onInput={(e) => (flight.multiPilotTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.multiPilotTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.totalTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.totalTime}
                        onInput={(e) => (flight.totalTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.totalTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.picName}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        defaultValue={flight.picName}
                        onInput={(e) => (flight.picName = e.target.value)}
                      ></input>
                    </td>
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.landingsDay}</td>
                  ) : (
                    <td>
                      <input
                        type="number"
                        defaultValue={flight.landingsDay}
                        onInput={(e) => (flight.landingsDay = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.landingsNight}</td>
                  ) : (
                    <td>
                      <input
                        type="number"
                        defaultValue={flight.landingsNight}
                        onInput={(e) => (flight.landingsNight = e.target.value)}
                      ></input>
                    </td>
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.flightConditionNightTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.flightConditionNightTime}
                        onInput={(e) => (flight.flightConditionNightTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.flightConditionNightTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.flightConditionIfrTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.flightConditionIfrTime}
                        onInput={(e) => (flight.flightConditionIfrTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.flightConditionIfrTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.picTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.picTime}
                        onInput={(e) => (flight.picTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.picTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.copilotTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.copilotTime}
                        onInput={(e) => (flight.copilotTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.copilotTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.dualTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.dualTime}
                        onInput={(e) => (flight.dualTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.dualTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.instructorTime.split(":")[0]}</td>
                  ) : (
                    <td colSpan={2}>
                      <input
                        type="time"
                        defaultValue={flight.instructorTime}
                        onInput={(e) => (flight.instructorTime = e.target.value)}
                      ></input>
                    </td>
                  )}
                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.instructorTime.split(":")[1]}</td>
                  ) : (
                    ""
                  )}

                  {(editingFlight != null && editingFlight.id != flight.id) ||
                    editingFlight == null ? (
                    <td>{flight.remarks}</td>
                  ) : (
                    <td>
                      <input
                        type="text"
                        defaultValue={flight.remarks}
                        onInput={(e) => (flight.remarks = e.target.value)}
                      ></input>
                    </td>
                  )}

                  <td className="d-flex">
                    <button
                      className="btn btn-danger"
                      style={{
                        height: "100%",
                        width: "7rem",
                        borderTopRightRadius: "0",
                        borderBottomRightRadius: "0",
                      }}
                      onClick={() => {
                        // Metoda na usuniecie
                        if (flightToDelete == index) {
                          console.log("Usuń " + flight.id)
                          fetch(flightsEndpoint + flight.id, {
                            method: "DELETE",
                            credentials: "include",
                          })
                            .then((res) => {
                              setFlights(
                                flights.filter((f) => f.id !== flight.id)
                              );
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                          setModalShow(true);
                          setModalText("Usunięto lot");
                          setModalTitle("Komunikat");
                          setSummaryBeforePage(null);
                          setSummaryThisPage(null);
                          setSummaryTotal(null);
                          setFlightToDelete(-1);
                          return;
                        } else if (
                          editingFlight == null ||
                          (editingFlight != null &&
                            editingFlight.id != flight.id)
                        ) {
                          clearTimeout(flightDeletionTimeout);
                          setFlightDeletionTimeout(
                            setTimeout(() => {
                              setFlightToDelete(-1);
                            }, 5000)
                          );
                          setFlightToDelete(index);
                        } else if (
                          editingFlight.id == flight.id &&
                          editingFlight != null
                        ) {
                          setEditingFlight(null);
                        }
                      }}
                    >
                      {flightToDelete == index ? "POTWIERDŹ USUNIĘCIE" : ""}
                      {flightToDelete != index &&
                        editingFlight != null &&
                        editingFlight.id == flight.id
                        ? "Anuluj edycję"
                        : ""}
                      {flightToDelete != index &&
                        ((editingFlight != null &&
                          editingFlight.id != flight.id) ||
                          editingFlight == null) ? (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                          <br></br>
                          Usuń
                        </div>
                      ) : (
                        ""
                      )}
                    </button>
                    <button
                      className={
                        editingFlight != null && editingFlight.id == flight.id
                          ? "btn btn-success"
                          : "btn btn-primary"
                      }
                      style={{
                        height: "100%",
                        width: "6rem",
                        borderBottomLeftRadius: 0,
                        borderTopLeftRadius: 0,
                      }}
                      onClick={() => {
                        if (editingFlight == null || editingFlight.id != flight.id) {
                          setEditingFlight(flight);
                        }
                        setFlightToDelete(-1);
                        clearTimeout(flightDeletionTimeout);
                        if(editingFlight!=null && editingFlight.id==flight.id){
                          console.log(editingFlight);
                          fetch(flightsModifyEndpoint+editingFlight.id, {
                            method: "POST",
                            credentials: "include",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(editingFlight),
                          }).then((res) => {
                            if(res.ok){
                              setModalShow(true);
                              setModalText("Zapisano zmiany");
                              setModalTitle("Komunikat");
                              setEditingFlight(null);
                              setSummaryThisPage(null);
                              setSummaryBeforePage(null);
                              setSummaryTotal(null);
                            }
                          });
                        }
                      }}
                    >
                      {editingFlight == null ||
                        (editingFlight != null &&
                          editingFlight.id != flight.id) ? (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pen"
                            viewBox="0 0 16 16"
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                          </svg>
                          <br></br>Edytuj
                        </div>
                      ) : (
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-check2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                          </svg>
                          <br></br>Edytuj
                        </div>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
            {summaryThisPage != null ? (
            <tr>
              <td colSpan={7} className="text-center">Suma z tej strony</td>
              <td>{summaryThisPage.SinglePilotSeTime.split(":")[0]}</td>
              <td>{summaryThisPage.SinglePilotSeTime.split(":")[1]}</td>
              <td>{summaryThisPage.SinglePilotMeTime.split(":")[0]}</td>
              <td>{summaryThisPage.SinglePilotMeTime.split(":")[1]}</td>
              <td>{summaryThisPage.multiPilotTime.split(":")[0]}</td>
              <td>{summaryThisPage.multiPilotTime.split(":")[1]}</td>
              <td>{summaryThisPage.totalTime.split(":")[0]}</td>
              <td>{summaryThisPage.totalTime.split(":")[1]}</td>
              <td></td>
              <td>{summaryThisPage.landingsDay}</td>
              <td>{summaryThisPage.landingsNight}</td>
              <td>{summaryThisPage.flightConditionNightTime.split(":")[0]}</td>
              <td>{summaryThisPage.flightConditionNightTime.split(":")[1]}</td>
              <td>{summaryThisPage.flightConditionIfrTime.split(":")[0]}</td>
              <td>{summaryThisPage.flightConditionIfrTime.split(":")[1]}</td>
              <td>{summaryThisPage.picTime.split(":")[0]}</td>
              <td>{summaryThisPage.picTime.split(":")[1]}</td>
              <td>{summaryThisPage.copilotTime.split(":")[0]}</td>
              <td>{summaryThisPage.copilotTime.split(":")[1]}</td>
              <td>{summaryThisPage.dualTime.split(":")[0]}</td>
              <td>{summaryThisPage.dualTime.split(":")[1]}</td>
              <td>{summaryThisPage.instructorTime.split(":")[0]}</td>
              <td>{summaryThisPage.instructorTime.split(":")[1]}</td>
              <td colSpan={2}></td>
            </tr>
            ): <tr><td colSpan={30} className="text-center">Podsumowanie niedostępne</td></tr>}
            {summaryBeforePage != null ? (
            <tr>
              <td colSpan={7} className="text-center">Suma z poprzednich stron</td>
              <td>{summaryBeforePage.SinglePilotSeTime.split(":")[0]}</td>
              <td>{summaryBeforePage.SinglePilotSeTime.split(":")[1]}</td>
              <td>{summaryBeforePage.SinglePilotMeTime.split(":")[0]}</td>
              <td>{summaryBeforePage.SinglePilotMeTime.split(":")[1]}</td>
              <td>{summaryBeforePage.multiPilotTime.split(":")[0]}</td>
              <td>{summaryBeforePage.multiPilotTime.split(":")[1]}</td>
              <td>{summaryBeforePage.totalTime.split(":")[0]}</td>
              <td>{summaryBeforePage.totalTime.split(":")[1]}</td>
              <td></td>
              <td>{summaryBeforePage.landingsDay}</td>
              <td>{summaryBeforePage.landingsNight}</td>
              <td>{summaryBeforePage.flightConditionNightTime.split(":")[0]}</td>
              <td>{summaryBeforePage.flightConditionNightTime.split(":")[1]}</td>
              <td>{summaryBeforePage.flightConditionIfrTime.split(":")[0]}</td>
              <td>{summaryBeforePage.flightConditionIfrTime.split(":")[1]}</td>
              <td>{summaryBeforePage.picTime.split(":")[0]}</td>
              <td>{summaryBeforePage.picTime.split(":")[1]}</td>
              <td>{summaryBeforePage.copilotTime.split(":")[0]}</td>
              <td>{summaryBeforePage.copilotTime.split(":")[1]}</td>
              <td>{summaryBeforePage.dualTime.split(":")[0]}</td>
              <td>{summaryBeforePage.dualTime.split(":")[1]}</td>
              <td>{summaryBeforePage.instructorTime.split(":")[0]}</td>
              <td>{summaryBeforePage.instructorTime.split(":")[1]}</td>
              <td colSpan={2}></td>
            </tr>
            ): <tr></tr>}
            {summaryTotal != null ? (
            <tr>
              <td colSpan={7} className="text-center">Suma całkowita</td>
              <td>{summaryTotal.SinglePilotSeTime.split(":")[0]}</td>
              <td>{summaryTotal.SinglePilotSeTime.split(":")[1]}</td>
              <td>{summaryTotal.SinglePilotMeTime.split(":")[0]}</td>
              <td>{summaryTotal.SinglePilotMeTime.split(":")[1]}</td>
              <td>{summaryTotal.multiPilotTime.split(":")[0]}</td>
              <td>{summaryTotal.multiPilotTime.split(":")[1]}</td>
              <td>{summaryTotal.totalTime.split(":")[0]}</td>
              <td>{summaryTotal.totalTime.split(":")[1]}</td>
              <td></td>
              <td>{summaryTotal.landingsDay}</td>
              <td>{summaryTotal.landingsNight}</td>
              <td>{summaryTotal.flightConditionNightTime.split(":")[0]}</td>
              <td>{summaryTotal.flightConditionNightTime.split(":")[1]}</td>
              <td>{summaryTotal.flightConditionIfrTime.split(":")[0]}</td>
              <td>{summaryTotal.flightConditionIfrTime.split(":")[1]}</td>
              <td>{summaryTotal.picTime.split(":")[0]}</td>
              <td>{summaryTotal.picTime.split(":")[1]}</td>
              <td>{summaryTotal.copilotTime.split(":")[0]}</td>
              <td>{summaryTotal.copilotTime.split(":")[1]}</td>
              <td>{summaryTotal.dualTime.split(":")[0]}</td>
              <td>{summaryTotal.dualTime.split(":")[1]}</td>
              <td>{summaryTotal.instructorTime.split(":")[0]}</td>
              <td>{summaryTotal.instructorTime.split(":")[1]}</td>
              <td colSpan={2}></td>
            </tr>
            ): <tr></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default LogBook;
