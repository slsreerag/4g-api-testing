import React, { useEffect, useState } from "react";
import HeaderNavigation from "../../HeaderNavigation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constant/API_Settings";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

export default function EditMacro() {
  const navigate = useNavigate();
  const params = useParams();
  const [plant_list, setplant_list] = useState([]);
  const [machine_list, setmachine_list] = useState([]);
  const [card_list, setcard_list] = useState([]);
  const [inputValues, setinputValues] = useState([]);
  const [errors, seterrors] = useState({});
  const [backend_errors, setbackend_errors] = useState({});
  const [installDate, setinstallDate] = useState(new Date());
  const [transDate, settransDate] = useState(new Date());
  const [macro_list, setmacro_list] = useState([]);
  const [all_macro_list, setall_macro_list] = useState([
    { macro_id: "1" },
    { macro_id: "2" },
    { macro_id: "3" },
    { macro_id: "4" },
    { macro_id: "5" },
    { macro_id: "6" },
  ]);

  useEffect(() => {
    ListPlant();
    ListMachine();
    EditMacro();
  }, []);

  useEffect(() => {
    ListCards();
  }, [inputValues.machine_id]);

  useEffect(() => {
    if (inputValues.card_id && inputValues.machine_id) {
      ListMacro();
    }
  }, [inputValues.card_id, inputValues.machine_id]);


  useEffect(() => {
    if (inputValues.macro_id && inputValues.machine_id && inputValues.card_id)
      PlantName();
  }, [inputValues.macro_id, inputValues.machine_id, inputValues.card_id]);

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
    await fetch(API_URL + "/machine_list", requestOptions)
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

  async function ListCards() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({ machine_id: inputValues.machine_id }),
    };
    await fetch(API_URL + "/card_list", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setcard_list(responseData);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function ListMacro() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({ machine_id: inputValues.machine_id,
        card_id:inputValues.card_id
       }),
    };
    await fetch(API_URL + "/used_macro_macro_details", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var arr3 = [...all_macro_list, ...responseData];

        const filter_array = arr3.filter(
          (item) =>
            !responseData.some((item2) => item.macro_id == item2.macro_id)
        );

        setmacro_list([...macro_list, ...filter_array]);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function ListPlant() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/list_plant", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setplant_list(responseData.data);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function EditMacro() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({ macro_details_id: params.id }),
    };
    await fetch(API_URL + "/edit_macro", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setinputValues({
          ...inputValues,
          macro_details_id: params.id,
          machine_id: responseData.machine_id,
          card_id: responseData.card_id,
          plant_id: responseData.plant_id,
          macro_id: responseData.macro_id,
          installation_date: responseData.installation_date,
          transplanting_date: responseData.transplanting_date,
          tank_capacity: responseData.tank_capacity,
          flooding_duration: responseData.flooding_duration,
          number_of_mini_units: responseData.number_of_mini_units,
          number_of_pots: responseData.number_of_pots,
          dosing_interval: responseData.dosing_interval,
          reservoir_mixing_duration: responseData.reservoir_mixing_duration,
        });
        setmacro_list([
          {
            macro_id: responseData.macro_id,
          },
        ]);

        settransDate(new Date(responseData.transplanting_date));
        setinstallDate(new Date(responseData.installation_date));

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function PlantName() {
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
        card_id: inputValues.card_id,
        macro_id: inputValues.macro_id,
      }),
    };
    await fetch(API_URL + "/get_plant_name", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setinputValues({
          ...inputValues,
          plant_id: responseData.id,
        });

        return responseData;
      })
      .catch((e) => {
        setinputValues({
          ...inputValues,
          plant_id: "",
        });
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
      sendMacroData();
    }
  };

  async function sendMacroData() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({
        macro_details_id: params.id,
        machine_id: inputValues.machine_id,
        card_id: inputValues.card_id,
        plant_id: inputValues.plant_id,
        macro_id: inputValues.macro_id,
        installation_date: installDate.toLocaleDateString(),
        transplanting_date: transDate.toLocaleDateString(),
        tank_capacity: inputValues.tank_capacity,
        flooding_duration: inputValues.flooding_duration,
        number_of_mini_units: inputValues.number_of_mini_units,
        number_of_pots: inputValues.number_of_pots,
        dosing_interval: inputValues.dosing_interval,
        reservoir_mixing_duration: inputValues.reservoir_mixing_duration,
      }),
    };

    await fetch(API_URL + "/create_macro", requestOptions)
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
          navigate("/macro");
        }
        return responseData;
      })
      .catch((e) => {});
  }

  function validateform() {
    var errors = [];
    var formValid = true;

    if (!inputValues.plant_id) {
      errors["plant_id"] =
        "No plants were added to the selected machine with the selected macro id";
      formValid = false;
    } else errors["plant_id"] = "";

    if (!inputValues.machine_id) {
      errors["machine_id"] = "Select machine id";
      formValid = false;
    } else errors["machine_id"] = "";

    if (!inputValues.card_id) {
      errors["card_id"] = "Select card id";
      formValid = false;
    } else errors["card_id"] = "";

    if (!inputValues.macro_id) {
      errors["macro_id"] = "Select macro id";
      formValid = false;
    } else errors["macro_id"] = "";

    if (!inputValues.tank_capacity) {
      errors["tank_capacity"] = "Reservior capacity required";
      formValid = false;
    } else errors["tank_capacity"] = "";

    if (!inputValues.flooding_duration) {
      errors["flooding_duration"] = "Flooding duration required";
      formValid = false;
    } else if (inputValues.flooding_duration) {
      if (isNaN(inputValues.flooding_duration) == true) {
        errors["flooding_duration"] =
          "Flooding duration should be a number";
        formValid = false;
      } else {
        if (inputValues.flooding_duration < 0) {
          errors["flooding_duration"] =
            "Flooding duration can't be negtaive values";
          formValid = false;
        } else errors["flooding_duration"] = "";
      }
    }

    if (!inputValues.number_of_mini_units) {
      errors["number_of_mini_units"] = "Number of mini units required";
      formValid = false;
    } else errors["number_of_mini_units"] = "";

    if (!inputValues.number_of_pots) {
      errors["number_of_pots"] = "Number of pots required";
      formValid = false;
    } else errors["number_of_pots"] = "";
    if (!inputValues.dosing_interval) {
      errors["dosing_interval"] = "Dosing interval required";
      formValid = false;
    } else if (inputValues.dosing_interval) {
      if (isNaN(inputValues.dosing_interval) == true) {
        errors["dosing_interval"] = "Dosing interval should be a number";
        formValid = false;
      } else {
        if (inputValues.dosing_interval < 0) {
          errors["dosing_interval"] =
            "Dosing interval can't be negtaive values";
          formValid = false;
        } else errors["dosing_interval"] = "";
      }
    }

    if (!inputValues.reservoir_mixing_duration) {
      errors["reservoir_mixing_duration"] =
        "Reservoir mixing duration required";
      formValid = false;
    } else if (inputValues.reservoir_mixing_duration) {
      if (isNaN(inputValues.reservoir_mixing_duration) == true) {
        errors["reservoir_mixing_duration"] =
          "Reservoir mixing duration should be a number";
        formValid = false;
      } else {
        if (inputValues.reservoir_mixing_duration < 0) {
          errors["reservoir_mixing_duration"] =
            "Reservoir mixing duration can't be negtaive values";
          formValid = false;
        } else errors["reservoir_mixing_duration"] = "";
      }
    }

    seterrors(errors);
    return formValid;
  }

  function handleBackList() {
    navigate("/macro");
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
                <h3 className="font-weight-bolder mt-2">Edit Macro Details</h3>
                <ul className=" navbar-nav ">
                  <li className="nav-item active">
                    <a href="#">
                      <i className="fas fa-user"></i>Macro Deatils
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
                <h3 className="font-weight-bolder mt-2">Macro Deatils</h3>
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
                      <label>Card Id</label>
                      <div className="dropbox">
                        <select
                          className="form-control"
                          name="card_id"
                          value={inputValues.card_id}
                          onChange={handleInputs}
                        >
                          <option value="">Select</option>
                          {card_list.map((card) => {
                            return (
                              <option key={card.card_id} value={card.card_id}>
                                {card.card_id}
                              </option>
                            );
                          })}
                        </select>
                        <i className="fas fa-angle-down droparrow"></i>
                      </div>
                      <div className="errorMsg">{errors.card_id}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Macro Id</label>
                      <div className="dropbox">
                        <select
                          className="form-control"
                          name="macro_id"
                          value={inputValues.macro_id}
                          onChange={handleInputs}
                        >
                          <option value="">Select</option>
                          {macro_list.map((macro) => {
                            return (
                              <option
                                key={macro.macro_id}
                                value={macro.macro_id}
                              >
                                {macro.macro_id}
                              </option>
                            );
                          })}
                        </select>
                        <i className="fas fa-angle-down droparrow"></i>
                      </div>
                      <div className="errorMsg">{errors.macro_id}</div>
                    </div>

                    <div className="form-group col-md-6">
                      <label>Plant</label>
                      <div className="dropbox">
                        <select
                          className="form-control"
                          name="plant_id"
                          value={inputValues.plant_id}
                          onChange={handleInputs}
                          disabled
                        >
                          <option value="">Select</option>
                          {plant_list.map((plant) => {
                            return (
                              <option key={plant.id} value={plant.id}>
                                {plant.plant_name}
                              </option>
                            );
                          })}
                        </select>
                        <i className="fas fa-angle-down droparrow"></i>
                      </div>
                      <div className="errorMsg">{errors.plant_id}</div>
                    </div>

                    <div className="form-group col-md-6">
                      <label>Installation date</label>
                      <DatePicker
                        selected={installDate}
                        className="form-control"
                        onChange={(date) => setinstallDate(date)}
                        name="installation_date"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Transplanting date</label>
                      <DatePicker
                        selected={transDate}
                        className="form-control"
                        onChange={(date) => settransDate(date)}
                        name="transplanting_date"
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Reservior capacity</label>
                      <input
                        type="text"
                        className="form-control"
                        name="tank_capacity"
                        value={inputValues.tank_capacity}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.tank_capacity}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Flooding duration (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="flooding_duration"
                        value={inputValues.flooding_duration}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.flooding_duration}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Number of mini units</label>
                      <input
                        type="text"
                        className="form-control"
                        name="number_of_mini_units"
                        value={inputValues.number_of_mini_units}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.number_of_mini_units}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Number of pots</label>
                      <input
                        type="text"
                        className="form-control"
                        name="number_of_pots"
                        value={inputValues.number_of_pots}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.number_of_pots}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Dosing Interval (hrs)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="dosing_interval"
                        value={inputValues.dosing_interval}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">{errors.dosing_interval}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Reservoir Mixing Duration (sec)</label>
                      <input
                        type="text"
                        className="form-control"
                        name="reservoir_mixing_duration"
                        value={inputValues.reservoir_mixing_duration}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.reservoir_mixing_duration}
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
