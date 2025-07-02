import React, { useEffect, useState } from "react";
import HeaderNavigation from "../../HeaderNavigation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constant/API_Settings";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

export default function EditDosingSetting() {
  const navigate = useNavigate();
  const params = useParams();
  const [errors, seterrors] = useState({});
  const [backend_errors, setbackend_errors] = useState({});
  const [machine_list, setmachine_list] = useState([]);
  const [inputValues, setinputValues] = useState({});

  useEffect(() => {
    ListMachine();
    EditSetting();
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
    await fetch(API_URL + "/get_used_machine_dosing", requestOptions)
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

  async function EditSetting() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({ dosing_setting_id: params.id }),
    };
    await fetch(API_URL + "/edit_dosing_setting", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setinputValues({
          ...inputValues,
          dosing_setting_id: params.id,
          machine_id: responseData.machine_id,
          testing_interval:responseData.testing_interval,
          climate_value_check_interval:responseData.climate_value_check_interval,
          container_level_check_interval:responseData.container_level_check_interval,
          draining_pots_on_time_interval:responseData.draining_pots_on_time_interval,
          draining_pots_off_time_interval:responseData.draining_pots_off_time_interval,
         
        });
        setmachine_list((machine_list) => [
          ...machine_list,
          {
           machine_id:responseData.machine_id
          },
        ]);
        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }




  const handleInputs = (e) => {
       setinputValues({
        ...inputValues,
        [e.target.name]: e.target.value,
      });  
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
        dosing_setting_id:params.id,
        machine_id: inputValues.machine_id,
        testing_interval:inputValues.testing_interval,
        climate_value_check_interval:inputValues.climate_value_check_interval,
        container_level_check_interval:inputValues.container_level_check_interval,
        draining_pots_on_time_interval:inputValues.draining_pots_on_time_interval,
        draining_pots_off_time_interval:inputValues.draining_pots_off_time_interval,
        
      }),
    };
    await fetch(API_URL + "/create_dosing_setting", requestOptions)
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
          navigate("/dosing_setting");
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

    if (!inputValues.testing_interval) {
      errors["testing_interval"] = "Testing interval required";
      formValid = false;
    } else if (inputValues.testing_interval) {
      if (isNaN(inputValues.testing_interval) == true) {
        errors["testing_interval"] = "Testing interval should be a number";
        formValid = false;
      } else {
        if (inputValues.testing_interval < 0) {
          errors["testing_interval"] =
            "Testing interval can't be negtaive values";
          formValid = false;
        } else errors["testing_interval"] = "";
      }
    }

    if (!inputValues.climate_value_check_interval) {
      errors["climate_value_check_interval"] =
        "Climate value check interval required";
      formValid = false;
    } else if (inputValues.climate_value_check_interval) {
      if (isNaN(inputValues.climate_value_check_interval) == true) {
        errors["climate_value_check_interval"] =
          "Climate value check interval should be a number";
        formValid = false;
      } else {
        if (inputValues.climate_value_check_interval < 0) {
          errors["climate_value_check_interval"] =
            "Climate value check interval can't be negtaive values";
          formValid = false;
        } else errors["climate_value_check_interval"] = "";
      }
    }

    if (!inputValues.container_level_check_interval) {
      errors["container_level_check_interval"] =
        "Container level check interval required";
      formValid = false;
    } else if (inputValues.container_level_check_interval) {
      if (isNaN(inputValues.container_level_check_interval) == true) {
        errors["container_level_check_interval"] =
          "Container level check interval should be a number";
        formValid = false;
      } else {
        if (inputValues.container_level_check_interval < 0) {
          errors["container_level_check_interval"] =
            "Container level check interval can't be negtaive values";
          formValid = false;
        } else errors["container_level_check_interval"] = "";
      }
    }

    if (!inputValues.draining_pots_on_time_interval) {
      errors["draining_pots_on_time_interval"] =
        "Draining pots on time interval required";
      formValid = false;
    }  else if (inputValues.draining_pots_on_time_interval) {
      if (isNaN(inputValues.draining_pots_on_time_interval) == true) {
        errors["draining_pots_on_time_interval"] =
          "Draining pots on time interval should be a number";
        formValid = false;
      } else {
        if (inputValues.draining_pots_on_time_interval < 0) {
          errors["draining_pots_on_time_interval"] =
            "Draining pots on time interval can't be negtaive values";
          formValid = false;
        } else errors["draining_pots_on_time_interval"] = "";
      }
    }
    

    if (!inputValues.draining_pots_off_time_interval) {
      errors["draining_pots_off_time_interval"] =
        "Draining pots off time interval required";
      formValid = false;
    }  else if (inputValues.draining_pots_off_time_interval) {
      if (isNaN(inputValues.draining_pots_off_time_interval) == true) {
        errors["draining_pots_off_time_interval"] =
          "Draining pots off time interval should be a number";
        formValid = false;
      } else {
        if (inputValues.draining_pots_off_time_interval < 0) {
          errors["draining_pots_off_time_interval"] =
            "Draining pots off time interval can't be negtaive values";
          formValid = false;
        } else errors["draining_pots_off_time_interval"] = "";
      }
    }
    
    seterrors(errors);
    return formValid;
  }

  function handleBackList() {
    navigate("/dosing_setting");
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
                  Edit Schedule Settings
                </h3>
                <ul className=" navbar-nav ">
                  <li className="nav-item active">
                    <a href="#">
                      <i className="fas fa-user"></i>Schedule Settings
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
                <h3 className="font-weight-bolder mt-2">Schedule Setting</h3>
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
                      <label>Testing Interval (min)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="testing_interval"
                        value={inputValues.testing_interval}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.testing_interval}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Climate value check interval (min)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="climate_value_check_interval"
                        value={inputValues.climate_value_check_interval}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.climate_value_check_interval}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Container level check interval (min)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="container_level_check_interval"
                        value={inputValues.container_level_check_interval}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.container_level_check_interval}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Draining pots ON time interval (min)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="draining_pots_on_time_interval"
                        value={inputValues.draining_pots_on_time_interval}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.draining_pots_on_time_interval}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Draining pots OFF time interval (min)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="draining_pots_off_time_interval"
                        value={inputValues.draining_pots_off_time_interval}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.draining_pots_off_time_interval}
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-center">
                    <div className=" text-center mt-2 col-md-2">
                      <button type="submit" className="btn btn-info">
                        Save{" "}
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
