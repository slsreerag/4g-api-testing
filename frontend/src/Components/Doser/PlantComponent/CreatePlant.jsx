import React, { useEffect, useState } from "react";
import HeaderNavigation from "../../HeaderNavigation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constant/API_Settings";
import swal from "sweetalert";

export default function CreatePlant() {
  const navigate = useNavigate();
  const [inputValues, setinputValues] = useState([]);
  const [machine_list, setmachine_list] = useState([]);
  const [card_list, setcard_list] = useState([]);
  const [macro_list, setmacro_list] = useState([]);
  const [all_macro_list, setall_macro_list] = useState([
    { macro_id: "1" },
    { macro_id: "2" },
    { macro_id: "3" },
    { macro_id: "4" },
    { macro_id: "5" },
    { macro_id: "6" },
  ]);
  const [errors, seterrors] = useState({});
  const [backend_errors, setbackend_errors] = useState({});
  const [growth_details, setgrowth_details] = useState([
    {
      stage: "",
      standard_tds: "",
      tds_range: "",
      standard_ph: "",
      ph_range: "",
      standard_quantity_of_general_solution: "",
    },
  ]);
  const [growth_details_errors, setgrowth_details_errors] = useState([
    {
      stage: "",
      standard_tds: "",
      tds_range: "",
      standard_ph: "",
      ph_range: "",
      standard_quantity_of_general_solution: "",
    },
  ]);

  const handleAddGrowthSetting = () => {
    setgrowth_details([
      ...growth_details,
      {
        stage: "",
        standard_tds: "",
        tds_range: "",
        standard_ph: "",
        ph_range: "",
        standard_quantity_of_general_solution: "",
      },
    ]);

    setgrowth_details_errors([
      ...growth_details_errors,
      {
        stage: "",
        standard_tds: "",
        tds_range: "",
        standard_ph: "",
        ph_range: "",
        standard_quantity_of_general_solution: "",
      },
    ]);
  };

  useEffect(() => {
    ListMachine();
  }, []);
  useEffect(() => {
    ListCards();
  }, [inputValues.machine_id]);
  useEffect(() => {
    ListMacro();
  }, [inputValues.card_id]);

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
    await fetch(API_URL + "/used_macro_list", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var arr3 = [...all_macro_list, ...responseData];

        const filter_array = arr3.filter(
          (item) =>
            !responseData.some((item2) => item.macro_id == item2.macro_id)
        );

        setmacro_list(filter_array);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleRemoveGrowthSetting = (index) => {
    const values = [...growth_details];
    const values1 = [...growth_details_errors];
    values.splice(index, 1);
    values1.splice(index, 1);
    setgrowth_details(values);
    setgrowth_details_errors(values1);
  };

  const handleChangeInput = (index, event) => {
    const values = [...growth_details];
    let inputValue = event.target.value;
    values[index][event.target.name] = inputValue;
    setgrowth_details(values);
  };

  const handleInputs = (e) => {
    setinputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateform()) {
      sendPlantData();
    }
  };

  async function sendPlantData() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({
        plant_name: inputValues.plant_name,
        machine_id: inputValues.machine_id,
        macro_id: inputValues.macro_id,
        card_id: inputValues.card_id,
        growth_details: growth_details,
      }),
    };

    await fetch(API_URL + "/create_plant", requestOptions)
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
          navigate("/plants");
        }
        return responseData;
      })
      .catch((e) => {});
  }

  function validateform() {
    var errors = [];
    var formValid = true;

    if (!inputValues.plant_name) {
      errors["plant_name"] = "Plant name required";
      formValid = false;
    } else errors["plant_name"] = "";

    if (!inputValues.machine_id) {
      errors["machine_id"] = "Select Machine id";
      formValid = false;
    } else errors["machine_id"] = "";

    if (!inputValues.card_id) {
      errors["card_id"] = "Select Card id";
      formValid = false;
    } else errors["card_id"] = "";

    if (!inputValues.macro_id) {
      errors["macro_id"] = "Select Macro id";
      formValid = false;
    } else errors["macro_id"] = "";

    growth_details.map((growth_details, index) => {
      if (growth_details.stage == "") {
        growth_details_errors[index]["stage"] = "Stage required";
        formValid = false;
      } else growth_details_errors[index]["stage"] = "";

      if (growth_details.standard_tds == "") {
        growth_details_errors[index]["standard_tds"] = "Standard tds required";
        formValid = false;
      } else growth_details_errors[index]["standard_tds"] = "";

      if (growth_details.tds_range == "") {
        growth_details_errors[index]["tds_range"] = "TDS range required";
        formValid = false;
      } else growth_details_errors[index]["tds_range"] = "";

      if (growth_details.standard_ph == "") {
        growth_details_errors[index]["standard_ph"] = "Standard ph required";
        formValid = false;
      } else growth_details_errors[index]["standard_ph"] = "";

      if (growth_details.ph_range == "") {
        growth_details_errors[index]["ph_range"] = "PH range required";
        formValid = false;
      } else growth_details_errors[index]["ph_range"] = "";

      if (growth_details.standard_quantity_of_general_solution == "") {
        growth_details_errors[index]["standard_quantity_of_general_solution"] =
          "Standard quantity of general solution required";
        formValid = false;
      } else
        growth_details_errors[index]["standard_quality_of_general_solution"] =
          "";
    });
    seterrors(errors);
    setgrowth_details_errors(growth_details_errors);
    return formValid;
  }

  function handleBackList() {
    navigate("/plants");
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
                <h3 className="font-weight-bolder mt-2">Create New Project</h3>
                <ul className=" navbar-nav ">
                  <li className="nav-item active">
                    <a href="#">
                      <i className="fas fa-user"></i>Project Details
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
                <h3 className="font-weight-bolder mt-2">Project Details</h3>
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
                              <option
                                key={card.card_id}
                                value={card.card_id}
                              >
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
                          {/* <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option> */}
                        </select>
                        <i className="fas fa-angle-down droparrow"></i>
                      </div>
                      <div className="errorMsg">{errors.macro_id}</div>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Plant Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="plant_name"
                        value={inputValues.plant_name}
                        onChange={handleInputs}
                      />
                      <div className="errorMsg">
                        {errors.plant_name}
                        {backend_errors.plant_name}
                      </div>
                    </div>
                  </div>

                  <h3 className="font-weight-bolder mt-2">Stage</h3>

                  {growth_details.map((growth_details, index) => {
                    return (
                      <div className="parameter-wrap" key={index}>
                        <div className="text-center text-white">
                          {/* <h3>Device</h3> */}
                        </div>
                        {index > 0 && (
                          <button
                            className="close"
                            type="button"
                            onClick={(event) =>
                              handleRemoveGrowthSetting(index, event)
                            }
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        )}

                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label>Stage</label>
                            <div className="dropbox">
                              <select
                                className="form-control"
                                name="stage"
                                value={growth_details.stage}
                                onChange={(event) =>
                                  handleChangeInput(index, event)
                                }
                              >
                                <option value="">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                              <i className="fas fa-angle-down droparrow"></i>
                            </div>
                            <div className="errorMsg">
                              {growth_details_errors[index]["stage"]}
                            </div>
                          </div>
                          <div className="form-group col-md-6">
                            <label>Standard TDS (ppm)</label>
                            <input
                              type="text"
                              className="form-control"
                              name="standard_tds"
                              value={growth_details.standard_tds}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                            <div className="errorMsg">
                              {growth_details_errors[index]["standard_tds"]}
                            </div>
                          </div>
                          <div className="form-group col-md-6">
                            <label>TDS Range </label>
                            <input
                              type="text"
                              className="form-control"
                              name="tds_range"
                              value={growth_details.tds_range}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                            <div className="errorMsg">
                              {growth_details_errors[index]["tds_range"]}
                            </div>
                          </div>

                          <div className="form-group col-md-6">
                            <label>Standard PH </label>
                            <input
                              type="text"
                              className="form-control"
                              name="standard_ph"
                              value={growth_details.standard_ph}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                            <div className="errorMsg">
                              {growth_details_errors[index]["standard_ph"]}
                            </div>
                          </div>

                          <div className="form-group col-md-6">
                            <label>PH Range </label>
                            <input
                              type="text"
                              className="form-control"
                              name="ph_range"
                              value={growth_details.ph_range}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                            <div className="errorMsg">
                              {" "}
                              {growth_details_errors[index]["ph_range"]}
                            </div>
                          </div>
                          <div className="form-group col-md-6">
                            <label>
                              Standard quantity of general solution (ml){" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="standard_quantity_of_general_solution"
                              value={
                                growth_details.standard_quantity_of_general_solution
                              }
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                            <div className="errorMsg">
                              {
                                growth_details_errors[index][
                                  "standard_quantity_of_general_solution"
                                ]
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="light-wrap">
                    <div className="row">
                      <div className="col-md-8"></div>

                      <div className="col-md-3">
                        <button
                          className="btn btn-info"
                          type="button"
                          onClick={handleAddGrowthSetting}
                        >
                          <i className="fas fa-plus fa-sm mr-2 my-1"></i>Add
                          More
                        </button>
                      </div>
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
