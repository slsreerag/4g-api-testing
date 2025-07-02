import React, { useEffect, useState } from "react";
import HeaderNavigation from "../../HeaderNavigation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constant/API_Settings";
import swal from "sweetalert";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateSystemSetting() {
  const navigate = useNavigate();
  const [inputValues, setinputValues] = useState({
    tds_dosing_enable:0,
    ph_dosing_enable:0,
    gp_dosing_enable:0,
  });
  const [errors, seterrors] = useState({});
  const [backend_errors, setbackend_errors] = useState({});
  const [machine_list, setmachine_list] = useState([]);

  useEffect(() => {
    ListMachine();
  }, []);

  async function ListMachine() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_used_machine_system", requestOptions)
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

  const handleInputs = (e) => {
    if (
      e.target.name == "tds_dosing_enable" ||
      e.target.name == "ph_dosing_enable" ||
      e.target.name == "gp_dosing_enable"
    ) {
      var onoffValue = "";
      if (e.target.checked == true) {
        onoffValue = "1";
      } else {
        onoffValue = "0";
      }
      setinputValues({
        ...inputValues,
        [e.target.name]: onoffValue,
      });
    } else {
      setinputValues({
        ...inputValues,
        [e.target.name]: e.target.value,
      });
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateform()) {
      sendData();
    }
  };

  async function sendData() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({
        machine_id: inputValues.machine_id,
        intake_timeout:inputValues.intake_timeout,
        draining_timeout:inputValues.draining_timeout,
        serial_port_data_timeout:inputValues.serial_port_data_timeout,
        no_flow_interupt_time:inputValues.no_flow_interupt_time,
        tds_minimum_threshold:inputValues.tds_minimum_threshold,
        sample_solution_mixing_time:inputValues.sample_solution_mixing_time,
        minimum_dosing_motor_on_time_a:inputValues.minimum_dosing_motor_ontime_a,
        minimum_dosing_motor_on_time_b:inputValues.minimum_dosing_motor_ontime_b,
        minimum_dosing_motor_on_time_acid:inputValues.minimum_dosing_motor_ontime_acid,
        minimum_dosing_motor_on_time_alkali:inputValues.minimum_dosing_motor_ontime_alkali,
        minimum_dosing_motor_on_time_gp:inputValues.minimum_dosing_motor_ontime_gp,
        minimum_dosing_quantity:inputValues.minimum_dosing_quantity,
        mixer_capacity:inputValues.mixer_capacity,
        // flooding_duration:inputValues.flooding_duration,
        draining_duration:inputValues.draining_duration,
        system_shutdown_waiting_time:inputValues.system_shutdown_waiting_time,
        tds_dosing_enable:inputValues.tds_dosing_enable,
        ph_dosing_enable:inputValues.ph_dosing_enable,
        gp_dosing_enable:inputValues.gp_dosing_enable,
        
      }),
    };

    await fetch(API_URL + "/create_system_setting", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.response) {
          // setfielderrors({
          //   url: responseData.response.url,
          //   port: responseData.response.port,
          // });

          setbackend_errors({
            plant_name: responseData.response.plant_name[0],
          });
        } else {
          swal(
            "",
            responseData.message,
            responseData.status ? "success" : "danger"
          );
          navigate("/system_setting");
        }
        return responseData;
      })
      .catch((e) => {});
  }

  function validateform() {
    var errors = [];
    var formValid = true;

    if (!inputValues.machine_id) {
      errors["machine_id"] = "Select machine id";
      formValid = false;
    } else errors["machine_id"] = "";

    if (!inputValues.intake_timeout) {
      errors["intake_timeout"] = "Intake timeout required";
      formValid = false;
    }else if (inputValues.intake_timeout) {
      if (isNaN(inputValues.intake_timeout) == true) {
        errors["intake_timeout"] = "Intake timeout should be a number";
        formValid = false;
      } else {
        if (inputValues.intake_timeout < 0) {
          errors["intake_timeout"] =
            "Intake timeout can't be negtaive values";
          formValid = false;
        } else errors["intake_timeout"] = "";
      }
    }
    if (!inputValues.draining_timeout) {
      errors["draining_timeout"] = "Draining timeout required";
      formValid = false;
    } else if (inputValues.draining_timeout) {
      if (isNaN(inputValues.draining_timeout) == true) {
        errors["draining_timeout"] = "Draining timeout should be a number";
        formValid = false;
      } else {
        if (inputValues.draining_timeout < 0) {
          errors["draining_timeout"] =
            "Draining timeout can't be negtaive values";
          formValid = false;
        } else errors["draining_timeout"] = "";
      }
    }

    if (!inputValues.serial_port_data_timeout) {
      errors["serial_port_data_timeout"] = "Serial port data timeout required";
      formValid = false;
    } else if (inputValues.serial_port_data_timeout) {
      if (isNaN(inputValues.serial_port_data_timeout) == true) {
        errors["serial_port_data_timeout"] = "Serial port data timeout should be a number";
        formValid = false;
      } else {
        if (inputValues.serial_port_data_timeout < 0) {
          errors["serial_port_data_timeout"] =
            "Serial port data timeout can't be negtaive values";
          formValid = false;
        } else errors["serial_port_data_timeout"] = "";
      }
    }

    if (!inputValues.no_flow_interupt_time) {
      errors["no_flow_interupt_time"] = "No flow interupt time required";
      formValid = false;
    } else if (inputValues.no_flow_interupt_time) {
      if (isNaN(inputValues.no_flow_interupt_time) == true) {
        errors["no_flow_interupt_time"] = "No flow interupt time should be a number";
        formValid = false;
      } else {
        if (inputValues.no_flow_interupt_time < 0) {
          errors["no_flow_interupt_time"] =
            "No flow interupt time can't be negtaive values";
          formValid = false;
        } else errors["no_flow_interupt_time"] = "";
      }
    }

    if (!inputValues.tds_minimum_threshold) {
      errors["tds_minimum_threshold"] = "Tds minimum threshold required";
      formValid = false;
    } else errors["tds_minimum_threshold"] = "";

    if (!inputValues.sample_solution_mixing_time) {
      errors["sample_solution_mixing_time"] = "Sample solution mixing time required";
      formValid = false;
    } else if (inputValues.sample_solution_mixing_time) {
      if (isNaN(inputValues.sample_solution_mixing_time) == true) {
        errors["sample_solution_mixing_time"] = "Sample solution mixing time should be a number";
        formValid = false;
      } else {
        if (inputValues.sample_solution_mixing_time < 0) {
          errors["sample_solution_mixing_time"] =
            "Sample solution mixing time can't be negtaive values";
          formValid = false;
        } else errors["sample_solution_mixing_time"] = "";
      }
    }

    if (!inputValues.minimum_dosing_motor_ontime_a) {
      errors["minimum_dosing_motor_ontime_a"] = "Minimum dosing motor ontime A required";
      formValid = false;
    } else if (inputValues.minimum_dosing_motor_ontime_a) {
      if (isNaN(inputValues.minimum_dosing_motor_ontime_a) == true) {
        errors["minimum_dosing_motor_ontime_a"] = "Minimum dosing motor ontime A should be a number";
        formValid = false;
      } else {
        if (inputValues.minimum_dosing_motor_ontime_a < 0) {
          errors["minimum_dosing_motor_ontime_a"] =
            "Minimum dosing motor ontime A can't be negtaive values";
          formValid = false;
        } else errors["minimum_dosing_motor_ontime_a"] = "";
      }
    }

    if (!inputValues.minimum_dosing_motor_ontime_b) {
      errors["minimum_dosing_motor_ontime_b"] = "Minimum dosing motor ontime b required";
      formValid = false;
    } else if (inputValues.minimum_dosing_motor_ontime_b) {
      if (isNaN(inputValues.minimum_dosing_motor_ontime_b) == true) {
        errors["minimum_dosing_motor_ontime_b"] = "Minimum dosing motor ontime B should be a number";
        formValid = false;
      } else {
        if (inputValues.minimum_dosing_motor_ontime_b < 0) {
          errors["minimum_dosing_motor_ontime_b"] =
            "Minimum dosing motor ontime B can't be negtaive values";
          formValid = false;
        } else errors["minimum_dosing_motor_ontime_b"] = "";
      }
    }


    if (!inputValues.minimum_dosing_motor_ontime_alkali) {
      errors["minimum_dosing_motor_ontime_alkali"] = "Minimum dosing motor ontime alkali required";
      formValid = false;
    } else if (inputValues.minimum_dosing_motor_ontime_alkali) {
      if (isNaN(inputValues.minimum_dosing_motor_ontime_alkali) == true) {
        errors["minimum_dosing_motor_ontime_alkali"] = "Minimum dosing motor ontime alkali should be a number";
        formValid = false;
      } else {
        if (inputValues.minimum_dosing_motor_ontime_alkali < 0) {
          errors["minimum_dosing_motor_ontime_alkali"] =
            "Minimum dosing motor ontime alkali can't be negtaive values";
          formValid = false;
        } else errors["minimum_dosing_motor_ontime_alkali"] = "";
      }
    }

    if (!inputValues.minimum_dosing_motor_ontime_acid) {
      errors["minimum_dosing_motor_ontime_acid"] = "Minimum dosing motor ontime acid required";
      formValid = false;
    } else if (inputValues.minimum_dosing_motor_ontime_acid) {
      if (isNaN(inputValues.minimum_dosing_motor_ontime_acid) == true) {
        errors["minimum_dosing_motor_ontime_acid"] = "Minimum dosing motor ontime acid should be a number";
        formValid = false;
      } else {
        if (inputValues.minimum_dosing_motor_ontime_acid < 0) {
          errors["minimum_dosing_motor_ontime_acid"] =
            "Minimum dosing motor ontime acid can't be negtaive values";
          formValid = false;
        } else errors["minimum_dosing_motor_ontime_acid"] = "";
      }
    }


    if (!inputValues.minimum_dosing_motor_ontime_gp) {
      errors["minimum_dosing_motor_ontime_gp"] = "Minimum dosing motor ontime gp required";
      formValid = false;
    }  else if (inputValues.minimum_dosing_motor_ontime_gp) {
      if (isNaN(inputValues.minimum_dosing_motor_ontime_gp) == true) {
        errors["minimum_dosing_motor_ontime_gp"] = "Minimum dosing motor ontime gp should be a number";
        formValid = false;
      } else {
        if (inputValues.minimum_dosing_motor_ontime_gp < 0) {
          errors["minimum_dosing_motor_ontime_gp"] =
            "Minimum dosing motor ontime gp can't be negtaive values";
          formValid = false;
        } else errors["minimum_dosing_motor_ontime_gp"] = "";
      }
    }


    if (!inputValues.minimum_dosing_quantity) {
      errors["minimum_dosing_quantity"] = "Minimum dosing quantity required";
      formValid = false;
    } else errors["minimum_dosing_quantity"] = "";
    if (!inputValues.mixer_capacity) {
      errors["mixer_capacity"] = "Mixer capacity required";
      formValid = false;
    } else errors["mixer_capacity"] = "";
    if (!inputValues.draining_duration) {
      errors["draining_duration"] = "Draining duration required";
      formValid = false;
    } else if (inputValues.draining_duration) {
      if (isNaN(inputValues.draining_duration) == true) {
        errors["draining_duration"] = "Draining duration should be a number";
        formValid = false;
      } else {
        if (inputValues.draining_duration < 0) {
          errors["draining_duration"] =
            "Draining duration can't be negtaive values";
          formValid = false;
        } else errors["draining_duration"] = "";
      }
    }


    if (!inputValues.system_shutdown_waiting_time) {
      errors["system_shutdown_waiting_time"] = "System shutdown waiting time required";
      formValid = false;
    } else errors["system_shutdown_waiting_time"] = "";


    seterrors(errors);
    return formValid;
  }

  function handleBackList() {
    navigate("/system_setting");
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
                <h3 className="font-weight-bolder mt-2">
                  Create System Setting
                </h3>
                <ul className=" navbar-nav ">
                  <li className="nav-item active">
                    <a href="#">
                      <i className="fas fa-user"></i>System Setting
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
                <h3 className="font-weight-bolder mt-2">System Setting</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Machine Id</label>
                      <div className="dropbox">
                        <select
                          className="form-control"
                          name="machine_id"
                          value={inputValues.machine_id}
                          onChange={handleInputs}
                        >
                          <option value="">Select</option>
                          {machine_list.map((machine) => {
                          return (
                            <option
                              key={machine.machine_id}
                              value={machine.machine_id}
                            >
                              {machine.machine_id}
                            </option>
                          );
                        })}
                        </select>
                        <i className="fas fa-angle-down droparrow"></i>
                      </div>
                      <div className="errorMsg">{errors.machine_id}</div>
                    </div>

                    <div className="form-group col-md-6">
                      <label>Intake timeout (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="intake_timeout"
                        value={inputValues.intake_timeout}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.intake_timeout}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Draining timeout (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="draining_timeout"
                        value={inputValues.draining_timeout}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.draining_timeout}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Serial port data timeout (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="serial_port_data_timeout"
                        value={inputValues.serial_port_data_timeout}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.serial_port_data_timeout}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>No flow interupt time (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="no_flow_interupt_time"
                        value={
                          inputValues.no_flow_interupt_time
                        }
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.no_flow_interupt_time}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>TDS minimum threshold</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tds_minimum_threshold"
                        value={inputValues.tds_minimum_threshold}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.tds_minimum_threshold}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Sample solution mixing time (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="sample_solution_mixing_time"
                        value={inputValues.sample_solution_mixing_time}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.sample_solution_mixing_time}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Minimum dosing motor on time A (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="minimum_dosing_motor_ontime_a"
                        value={inputValues.minimum_dosing_motor_ontime_a}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.minimum_dosing_motor_ontime_a}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Minimum dosing motor on time B (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="minimum_dosing_motor_ontime_b"
                        value={inputValues.minimum_dosing_motor_ontime_b}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.minimum_dosing_motor_ontime_b}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Minimum dosing motor on time Alkali (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="minimum_dosing_motor_ontime_alkali"
                        value={inputValues.minimum_dosing_motor_ontime_alkali}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.minimum_dosing_motor_ontime_alkali}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Minimum dosing motor on time Acid (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="minimum_dosing_motor_ontime_acid"
                        value={inputValues.minimum_dosing_motor_ontime_acid}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.minimum_dosing_motor_ontime_acid}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Minimum dosing motor on time GP (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="minimum_dosing_motor_ontime_gp"
                        value={inputValues.minimum_dosing_motor_ontime_gp}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.minimum_dosing_motor_ontime_gp}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Minimum dosing quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        name="minimum_dosing_quantity"
                        value={inputValues.minimum_dosing_quantity}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.minimum_dosing_quantity}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Mixer capacity</label>
                      <input
                        type="text"
                        className="form-control"
                        name="mixer_capacity"
                        value={inputValues.mixer_capacity}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.mixer_capacity}</div>
                    </div>
                    {/* <div className="form-group col-md-6">
                      <label>Flooding duration</label>
                      <input
                        type="text"
                        className="form-control"
                        name="flooding_duration"
                        value={inputValues.flooding_duration}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.flooding_duration}</div>
                    </div> */}
                    <div className="form-group col-md-6">
                      <label>Draining duration (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="draining_duration"
                        value={inputValues.draining_duration}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.draining_duration}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>System shutdown waiting time (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="system_shutdown_waiting_time"
                        value={inputValues.system_shutdown_waiting_time}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.system_shutdown_waiting_time}</div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-3">
                      <label>TDS dosing enable</label>
                    </div>
                    <div className="col-md-3">
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="tds_dosing_enable"
                          onClick={handleInputs}
                          // checked={check[index].on_off == 1 ? true : false}
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-3">
                      <label>PH dosing enable</label>
                    </div>
                    <div className="col-md-3">
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="ph_dosing_enable"
                          onClick={handleInputs}
                          // checked={check[index].on_off == 1 ? true : false}
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-3">
                      <label>GP dosing enable</label>
                    </div>
                    <div className="col-md-3">
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="gp_dosing_enable"
                          onClick={handleInputs}
                          // checked={check[index].on_off == 1 ? true : false}
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    <div className=" text-center mt-2 col-md-2">
                      <button type="submit" className="btn btn-info">
                        Create{" "}
                        <i className="fas fa-long-arrow-alt-right ml-2"></i>
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
