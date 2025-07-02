import React, { useEffect, useState } from "react";
import HeaderNavigation from "../HeaderNavigation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constant/API_Settings";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RealayControls() {
  const navigate = useNavigate();
  const [machine_list, setmachine_list] = useState([]);
  const [relayStatus,setRelayStatus]=useState({
    P8:"OFF",
    P9:"OFF",
    P10:"OFF",
    P11:"OFF",
    P12:"OFF",
    P13:"OFF",
    P14:"OFF",
    P15:"OFF",
    P16:"OFF",
    P17:"OFF",
    P18:"OFF",
    P19:"OFF",

  })
  const [inputValues, setinputValues] = useState({
    P12:"OFF",
    P13:"OFF",
    P14:"OFF",
    P15:"OFF",
    P16:"OFF",
    P17:"OFF",
    P18:"OFF",
    P19:"OFF",
    P21:"OFF",
    P22:"OFF",
    P23:"OFF",
    P24:"OFF",
    
  });
  const [errors, seterrors] = useState({});
 

  useEffect(() => {
    ListMachine();
  }, []);
  useEffect(() => {
    ListData();
    ListRealyStatus();
  }, [inputValues.device_id]);

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

  async function ListData() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({ device_id: inputValues.device_id }),
    };
    await fetch(API_URL + "/edit_relay", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setinputValues({
            ...inputValues,
            P1:responseData.P1,
            P3:responseData.P3,
            P4:responseData.P4,
            P5:responseData.P5,
            P6:responseData.P6,
            P7:responseData.P7,
            P8:responseData.P8,
            P9:responseData.P9,
            P10:responseData.P10,
            P11:responseData.P11,
            P12:responseData.P12,
            P13:responseData.P13,
            P14:responseData.P14,
            P15:responseData.P15,
            P16:responseData.P16,
            P17:responseData.P17,
            P18:responseData.P18,
            P19:responseData.P19,
            P20:responseData.P20,
            P21:responseData.P21,
            P22:responseData.P22,
            P23:responseData.P23,
            P24:responseData.P24,
        })

        return responseData;
      })
      .catch((e) => {
        setinputValues({
          ...inputValues,
          P1:"",
          P3:"",
          P4:"",
          P5:"",
          P6:"",
          P7:"",
          P8:"",
          P9:"",
          P10:"",
          P11:"",
          P12:"OFF",
          P13:"OFF",
          P14:"OFF",
          P15:"OFF",
          P16:"OFF",
          P17:"OFF",
          P18:"OFF",
          P19:"OFF",
          P20:"",
          P21:"OFF",
          P22:"OFF",
          P23:"OFF",
          P24:"OFF",
      })
        console.log(e);
      });
  }

  async function ListRealyStatus() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({ device_id: inputValues.device_id }),
    };
    await fetch(API_URL + "/get_relay", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setRelayStatus({
          P8:responseData.P8,
          P9:responseData.P9,
          P10:responseData.P10,
          P11:responseData.P11,
          P12:responseData.P12,
          P13:responseData.P13,
          P14:responseData.P14,
          P15:responseData.P15,
          P16:responseData.P16,
          P17:responseData.P17,
          P18:responseData.P18,
          P19:responseData.P19,

        })
       

        return responseData;
      })
      .catch((e) => {
        setRelayStatus({
          P8:"OFF",
          P9:"OFF",
          P10:"OFF",
          P11:"OFF",
          P12:"OFF",
          P13:"OFF",
          P14:"OFF",
          P15:"OFF",
          P16:"OFF",
          P17:"OFF",
          P18:"OFF",
          P19:"OFF"

        })
       
        console.log(e);
      });
  }



  

  const handleInputs = (e) => {
    setinputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckInputs = (e) => {
    const status=e.target.checked==true?"ON":"OFF"
    setinputValues({
      ...inputValues,
      [e.target.name]: status,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateform()) {
        sendRelayData();
    }
  };

  async function sendRelayData() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify(inputValues),
    };

    await fetch(API_URL + "/create_relay_controls", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.response) {
          // setfielderrors({
          //   url: responseData.response.url,
          //   port: responseData.response.port,
          // });
        } else {
          swal(
            "",
            responseData.message,
            responseData.status ? "success" : "danger"
          );
        //   navigate("/macro");
        }
        return responseData;
      })
      .catch((e) => {});
  }

  function validateform() {
    var errors = [];
    var formValid = true;

    if (!inputValues.device_id) {
      errors["device_id"] =
        "Select device";
      formValid = false;
    } else errors["device_id"] = "";

    if (!inputValues.P1) {
      errors["P1"] = "Field required";
      formValid = false;
    } else errors["P1"] = "";


    if (!inputValues.P3) {
        errors["P3"] = "Field required";
        formValid = false;
      } else errors["P3"] = "";

      if (!inputValues.P4) {
        errors["P4"] = "Field required";
        formValid = false;
      } else errors["P4"] = "";

      if (!inputValues.P5) {
        errors["P5"] = "Field required";
        formValid = false;
      } else errors["P5"] = "";

      if (!inputValues.P6) {
        errors["P6"] = "Field required";
        formValid = false;
      } else errors["P6"] = "";

      if (!inputValues.P7) {
        errors["P7"] = "Field required";
        formValid = false;
      } else errors["P7"] = "";

      if (!inputValues.P8) {
        errors["P8"] = "Field required";
        formValid = false;
      } else errors["P8"] = "";

      if (!inputValues.P9) {
        errors["P9"] = "Field required";
        formValid = false;
      } else errors["P9"] = "";

      if (!inputValues.P10) {
        errors["P10"] = "Field required";
        formValid = false;
      } else errors["P10"] = "";

      if (!inputValues.P11) {
        errors["P11"] = "Field required";
        formValid = false;
      } else errors["P11"] = "";

      if (!inputValues.P20) {
        errors["P20"] = "Field required";
        formValid = false;
      } else errors["P20"] = "";

    

    seterrors(errors);
    return formValid;
  }

  function handleBackList() {
    navigate("/32io_test");
  }

  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <HeaderNavigation />
      <div className="page-wrapper ">
        <div className="container">
          <div className="d-md-flex">
            <div className="sidebar">
              <div className="side-wrap ">
                <h3 className="font-weight-bolder mt-2">Relay Controls</h3>
                <ul className=" navbar-nav ">
                  <li className="nav-item active">
                    <a href="#">
                      <i className="fas fa-user"></i>Relay Details
                    </a>
                  </li>
                </ul>
              </div>
              <div className=" my-3 col-8">
                <a
                  href=""
                  onClick={handleBackList}
                  className="btn btn-secondary "
                >
                  <i className="fas fa-long-arrow-alt-left mr-2 "></i>Back to
                  list
                </a>
              </div>
            </div>

            <div className="content-area  ">
              <div className="content-wrapper">
                <h3 className="font-weight-bolder mt-2">Relay Details</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Device Id</label>
                      <div className="dropbox">
                        <select
                          className="form-control"
                          name="device_id"
                          value={inputValues.device_id}
                          onChange={handleInputs}
                        >
                          <option value="">Select</option>
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
                      <div className="errorMsg">{errors.device_id}</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Mode</label>
                      <div className="dropbox">
                        <select
                          className="form-control"
                          name="P1"
                          value={inputValues.P1}
                          onChange={handleInputs}
                        >
                          <option value="">Select</option>
                          <option value="A">AUTO</option>
                          <option value="M">MANUAL</option>
                          <option value="H">HOLIDAY</option>
                          {/* {card_list.map((card) => {
                          return (
                            <option
                              key={card.card_id}
                              value={card.card_id}
                            >
                              {card.card_id}
                            </option>
                          );
                        })} */}
                        </select>
                        <i className="fas fa-angle-down droparrow"></i>
                      </div>
                      <div className="errorMsg">{errors.P1}</div>
                    </div>

                    <div className="form-group col-md-4">
                      <label>Time for 2hrs</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P3"
                        value={inputValues.P3}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.P3}</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Time for 45hrs</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P4"
                        value={inputValues.P4}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.P4}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Sludge collect timer</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P5"
                        value={inputValues.P5}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.P5}
                      </div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Cycle count</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P6"
                        value={inputValues.P6}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.P6}</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Sludge collect day count</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P7"
                        value={inputValues.P7}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.P7}</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Cycles/day MBBR</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P8"
                        value={inputValues.P8}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.P8}</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>MBBR FP/C time</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P9"
                        value={inputValues.P9}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.P9}</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Holiday mode hours off</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P10"
                        value={inputValues.P10}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.P10}</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Holiday mode no action</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P11"
                        value={inputValues.P11}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.P11}</div>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Special parameter text</label>
                      <input
                        type="text"
                        className="form-control"
                        name="P20"
                        value={inputValues.P20}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.P20}</div>
                    </div>
                  </div>
                  <div>
                    <table className="table table-bordered mt-2">
                      <thead>
                        <tr>
                          <th colSpan={4}>
                            <h2 className="text-center">
                             Pump Control Switch
                            </h2>
                          </th>
                        </tr>
                        <tr>
                          <th>
                        Relay Name
                          </th>
                          <th>
                        Relay Status
                          </th>
                          <th>
                           Actions
                          </th>
                          <th>
                           Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="main">Relay P01</td>
                          <td className="main">{relayStatus.P8}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P12"
                                value={inputValues.P12}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P12 == "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P12}
                          </td>
                        </tr>
                        <tr>
                          <td className="main">Relay P02</td>
                          <td className="main">{relayStatus.P9}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P13"
                                value={inputValues.P13}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P13 == "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P13}
                          </td>
                        </tr>
                         <tr>
                          <td className="main">Relay P03</td>
                          <td className="main">{relayStatus.P10}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P14"
                                value={inputValues.P14}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P14 == "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P14}
                          </td>
                        </tr>
                         <tr>
                          <td className="main">Relay P04</td>
                          <td className="main">{relayStatus.P11}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P15"
                                value={inputValues.P15}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P15== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P15}
                          </td>
                        </tr> <tr>
                          <td className="main">Relay P05</td>
                          <td className="main">{relayStatus.P12}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P16"
                                value={inputValues.P16}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P16== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P16}
                                       
                          </td>
                        </tr>
                         <tr>
                          <td className="main">Relay P06</td>
                          <td className="main">{relayStatus.P13}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P17"
                                value={inputValues.P17}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P17== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P17}
                          </td>
                        </tr>
                        <tr>
                          <td className="main">Relay AB/AS</td>
                          <td className="main">{relayStatus.P14}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P18"
                                value={inputValues.P18}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P18== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P18}
                          </td>
                        </tr>
                         <tr>
                          <td className="main">Relay FP/C</td>
                          <td className="main">{relayStatus.P15}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P19"
                                value={inputValues.P19}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P19== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P19}
                          </td>
                        </tr>
                        <tr>
                          <td className="main">MV01/02</td>
                          <td className="main">{relayStatus.P16}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P21"
                                value={inputValues.P21}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P21== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P21}
                          </td>
                        </tr>
                        <tr>
                          <td className="main">MV03</td>
                          <td className="main">{relayStatus.P17}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P22"
                                value={inputValues.P22}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P22== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P22}
                          </td>
                        </tr>
                        <tr>
                          <td className="main">MV04</td>
                          <td className="main">{relayStatus.P18}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P23"
                                value={inputValues.P23}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P23== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P23}
                          </td>
                        </tr>
                        <tr>
                          <td className="main">Alarm Status</td>
                          <td className="main">{relayStatus.P19}</td>
                          <td className="main">
                            <label className="switch">
                              <input
                                type="checkbox"
                                name="P24"
                                value={inputValues.P24}
                                onClick={handleCheckInputs}
                                  checked={
                                    inputValues.P24== "ON" ? true : false
                                  }
                              />
                              <span class="slider round"></span>
                            </label>
                          </td>
                          <td className="main" colspan="3">
                            {inputValues.P24}
                          </td>
                        </tr>
                        
                      </tbody>
                    </table>
                  </div>

                  <div className="row justify-content-center">
                    <div className=" text-center mt-2 col-md-2">
                      <button type="submit" className="btn btn-primary">
                        Update{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
