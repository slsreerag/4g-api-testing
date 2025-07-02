import React, { useEffect, useState } from "react";
import HeaderNavigation from "../HeaderNavigation";
import { API_URL } from "../../constant/API_Settings";
import Moment from "moment";
import lon from "../img/lighton.png";
import loff from "../img/lightoff.png";

export default function ManualControlTesting() {
  const [values, setvalues] = useState([]);
  const [report, setreport] = useState([]);
  const [data, setdata] = useState([]);
  const [check, setcheck] = useState([]);
  const [machine_list, setmachine_list] = useState([]);
  const [inputValues, setinputValues] = useState({
    device_id: "",
  });

  useEffect(() => {
    ListMachine();
  }, []);

  useEffect(() => {
    ListReport();
  }, [inputValues.device_id]);

  useEffect(() => {
    const timerId = setInterval(() => {
      ListReport();
    }, 5000);
    return () => {
      clearInterval(timerId);
    };
  }, [inputValues.device_id]);

  // useEffect(() => {
  //   // if(inputValues.device_id!==""){
  //     const timerId = setInterval(() => {
  //       ListReport();
  //     }, 10000);
  //     return () => {
  //       clearInterval(timerId);
  //     };
  //   // }
  // }, []);

  async function ListMachine() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_devices_list", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setmachine_list(responseData);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function ListReport() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({
        device_id: inputValues.device_id,
      }),
    };
    await fetch(API_URL + "/get_32io_reports", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setreport(responseData);

        return responseData;
      })
      .catch((e) => {
        setreport([]);
        console.log(e);
      });
  }

  const handleInputs = (e) => {
    setinputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <HeaderNavigation />
      <div className="page-wrapper">
        <div className="container">
          <div className="no-result text-center">
            <div className="">
              <div className="content-wrapper w-100">
                <ul className="nav">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/relay_controls"
                    >
                      Relay Controls
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/history"
                    >
                      Report History
                    </a>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-md-12 mt-md-2">
                    <div className="graph-wraper">
                      {/* <div className="row mb-2 ml-2">
                         
                            <div className="form-group col-md-6">
                              <div className="dropbox">

                                <select className="form-control" name="gov_id"  >
                                  <option value="">Select Device ID</option>

                                  {gov_list.map((customer) => {
                                    return (
                                      <option key={customer.get_user.id} value={customer.get_user.id}>{customer.name}</option>
                                    );
                                  })}

                                </select>
                                <i className="fas fa-angle-down droparrow"></i>
                              </div>

                            </div>

                          </div> */}

                      <div className="table-widget data-table table-responsive">
                        <div className="table">
                          <h2 className="font-weight-bolder mt-2 text-dark">
                            {" "}
                            48IO Test WebApp
                          </h2>
                          <div className="row mb-2 ml-2">
                            <div className="form-group col-md-4">
                              <div className="dropbox">
                                <select
                                  className="form-control"
                                  name="device_id"
                                  value={inputValues.device_id}
                                  onChange={handleInputs}
                                >
                                  <option value="">Select Device ID</option>

                                  {machine_list.map((machine) => {
                                    return (
                                      <option
                                        key={machine.device_id}
                                        value={machine.device_id}
                                      >
                                        {machine.device_id}
                                      </option>
                                    );
                                  })}
                                </select>
                                <i className="fas fa-angle-down droparrow"></i>
                              </div>
                            </div>
                          </div>

                          {/* <table className="table table-bordered data-table" > */}

                          <>
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <td>
                                    <strong>
                                      Device Name :{report.device_id}
                                    </strong>
                                  </td>
                                  <td>
                                    <strong>Mode: {report.P7}</strong>
                                  </td>
                                  <td>
                                    <strong>
                                      Last Reported :
                                      {report.created_at
                                        ? Moment(report.created_at).format(
                                            "DD-MM-YYYY, h:mm:ss A"
                                          )
                                        : ""}
                                    </strong>
                                  </td>
                                </tr>
                                <tr>
                                  <th>Phases</th>
                                  <th>Voltage</th>
                                  <th>Presence</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="main">
                                    <strong>PHASE - 1 R</strong>
                                  </td>
                                  <td className="main">{report.P1}</td>
                                  {report.P4 == 0 && (
                                    <td className="main">
                                      {" "}
                                      <img src={loff} height="55px" />
                                    </td>
                                  )}
                                  {report.P4 != 0 && (
                                    <td className="main">
                                      {" "}
                                      <img src={lon} height="55px" />
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <td className="main">
                                    <strong>PHASE - 2 Y</strong>{" "}
                                  </td>
                                  <td className="main">{report.P2}</td>
                                  {report.P5 == 0 && (
                                    <td className="main">
                                      {" "}
                                      <img src={loff} height="55px" />
                                    </td>
                                  )}
                                  {report.P5 != 0 && (
                                    <td className="main">
                                      {" "}
                                      <img src={lon} height="55px" />
                                    </td>
                                  )}
                                </tr>
                                <tr>
                                  <td className="main">
                                    <strong>PHASE - 3 B</strong>
                                  </td>
                                  <td className="main">{report.P3}</td>
                                  {report.P6 == 0 && (
                                    <td className="main">
                                      {" "}
                                      <img src={loff} height="55px" />
                                    </td>
                                  )}
                                  {report.P6 != 0 && (
                                    <td className="main">
                                      {" "}
                                      <img src={lon} height="55px" />
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </>
                        </div>
                      </div>

                      <div className="table-widget data-table table-responsive">
                        <div className="table">
                          <h2 className="font-weight-bolder mt-2 text-dark">
                            {" "}
                            Relay Status
                          </h2>

                          {/* <table className="table table-bordered data-table" > */}

                          <table className="table table-bordered data-table">
                            <thead>
                              <tr>
                                {/* <th scope="col">
                                  <h3>Parameter </h3>
                                </th>
                                <th scope="col">
                                  <h3> Value</h3>
                                </th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {/* {list_report.map((elem, index) => {
                                return (
                                  <> */}
                              <tr>
                                <td className="main">Relay P01 Status</td>
                                <td className="main">{report.P8}</td>
                                <td className="main">Relay P02 Status</td>
                                <td className="main">{report.P9}</td>
                              </tr>
                              <tr>
                                <td className="main">Relay P03 Status</td>
                                <td className="main">{report.P10}</td>
                                <td className="main">Relay P04 Status</td>
                                <td className="main">{report.P11}</td>
                              </tr>
                              <tr>
                                <td className="main">Relay P05 Status</td>
                                <td className="main">{report.P12}</td>
                                <td className="main">Relay P06 Status</td>
                                <td className="main">{report.P13}</td>
                              </tr>
                              <tr>
                                <td className="main">Relay AB/AS Status</td>
                                <td className="main">{report.P14}</td>
                                <td className="main">Relay FP/C Status</td>
                                <td className="main">{report.P15}</td>
                              </tr>
                              <tr>
                                <td className="main">Valve MV01/02 Status</td>
                                <td className="main">{report.P16}</td>
                                <td className="main">Valve MV03 Status</td>
                                <td className="main">{report.P17}</td>
                              </tr>
                              <tr>
                                <td className="main">Valve MV04 Status</td>
                                <td className="main">{report.P18}</td>
                                <td className="main">Alarm Status</td>
                                <td className="main">{report.P19}</td>
                              </tr>
                              <tr>
                                <td className="main" colSpan={4}></td>
                              </tr>
                              <tr>
                                <td className="main">Timer for 2hrs</td>
                                <td className="main">{report.P20}</td>
                                <td className="main">Timer for 45hrs</td>
                                <td className="main">{report.P21}</td>
                              </tr>
                              <tr>
                                <td className="main">Sludge collect timer</td>
                                <td className="main">{report.P22}</td>
                                <td className="main">Cycle count</td>
                                <td className="main">{report.P23}</td>
                              </tr>
                              <tr>
                                <td className="main">
                                  Sludge collect day count
                                </td>
                                <td className="main">{report.P24}</td>
                                <td className="main">Cycle/day MBBR</td>
                                <td className="main">{report.P25}</td>
                              </tr>
                              <tr>
                                <td className="main">MBBR FP/C Time</td>
                                <td className="main">{report.P26}</td>
                                <td className="main">
                                  Holiday mode hours off time
                                </td>
                                <td className="main">{report.P27}</td>
                              </tr>
                              <tr>
                                <td className="main">
                                  Holiday mode hours no action time
                                </td>
                                <td className="main">{report.P28}</td>
                                <td className="main">Level sensor L1 status</td>
                                <td className="main">{report.P29}</td>
                              </tr>
                              <tr>
                                <td className="main">Level sensor L2 status</td>
                                <td className="main">{report.P30}</td>
                                <td className="main">Level sensor L3 status</td>
                                <td className="main">{report.P31}</td>
                              </tr>
                              <tr>
                                <td className="main">Level sensor L4 status</td>
                                <td className="main">{report.P32}</td>
                                <td className="main">Level sensor L5 status</td>
                                <td className="main">{report.P33}</td>
                              </tr>
                              <tr>
                                <td className="main">Level sensor L6 status</td>
                                <td className="main">{report.P34}</td>
                                <td className="main">Level sensor L7 status</td>
                                <td className="main">{report.P35}</td>
                              </tr>
                              <tr>
                                <td className="main">Level sensor L8 status</td>
                                <td className="main">{report.P36}</td>
                                <td className="main">Level sensor L9 status</td>
                                <td className="main">{report.P37}</td>
                              </tr>
                              <tr>
                                <td className="main">
                                  Level sensor L10 status
                                </td>
                                <td className="main">{report.P38}</td>
                                <td className="main">
                                  Level sensor L11 status
                                </td>
                                <td className="main">{report.P39}</td>
                              </tr>
                              <tr>
                                <td className="main">
                                  Level sensor L12 status
                                </td>
                                <td className="main">{report.P40}</td>
                                <td className="main">Energy meter</td>
                                <td className="main">{report.P41}</td>
                              </tr>
                              <tr>
                                <td className="main">
                                  Electromagnetic flow meter RDTF
                                </td>
                                <td className="main">{report.P42}</td>
                                <td className="main">
                                  Electromagnetic flow meter FFF
                                </td>
                                <td className="main">{report.P43}</td>
                              </tr>
                              <tr>
                                <td className="main">Sensor 1</td>
                                <td className="main">{report.P44}</td>
                                <td className="main">Sensor 2</td>
                                <td className="main">{report.P45}</td>
                              </tr>
                              <tr>
                                <td className="main">Network Status</td>
                                <td className="main">{report.P46}</td>
                                <td className="main">Date,Time</td>
                                <td className="main">{report.P47}</td>
                              </tr>
                              <tr>
                                <td className="main">Special parameter text</td>
                                <td className="main">{report.P48}</td>
                              </tr>
                              {/* </>
                                );
                              })} */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">

                {pages.total_pages > 1 && pages.pagination_items}

              </ul>
            </nav> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
