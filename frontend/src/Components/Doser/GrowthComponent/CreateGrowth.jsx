import React, { useEffect, useState } from "react";
import HeaderNavigation from "../../HeaderNavigation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constant/API_Settings";
import swal from "sweetalert";

export default function CreateGrowth() {
  const navigate = useNavigate();
  const [inputValues, setinputValues] = useState([]);
  const [plant_list, setplant_list] = useState([]);
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
      starting_day: "",
      ending_day: "",
      stage: "",
      gp_container_interval:""
    },
  ]);
  const [growth_details_errors, setgrowth_details_errors] = useState([
    {
      starting_day: "",
      ending_day: "",
      stage: "",
      gp_container_interval:""
    },
  ]);

  useEffect(() => {
    ListPlant();
    ListMachine();
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
    if(inputValues.macro_id && inputValues.machine_id && inputValues.card_id)
    PlantName();
  }, [inputValues.macro_id,inputValues.machine_id,inputValues.card_id]);

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
    await fetch(API_URL + "/used_macro_growth_stage", requestOptions)
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

  

  async function PlantName() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify(
        { 
          machine_id: inputValues.machine_id,
          card_id: inputValues.card_id,
          macro_id: inputValues.macro_id,
         }
        ),
    };
    await fetch(API_URL + "/get_plant_name", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setinputValues({
          ...inputValues,
          plant_id:responseData.id
        })

        return responseData;
      })
      .catch((e) => {
        setinputValues({
          ...inputValues,
          plant_id:""
        })
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

  const handleAddGrowthSetting = () => {
    setgrowth_details([
      ...growth_details,
      {
        starting_day: "",
        ending_day: "",
        stage: "",
        gp_container_interval:""
      },
    ]);

    setgrowth_details_errors([
      ...growth_details_errors,
      {
       
        starting_day: "",
        ending_day: "",
        stage: "",
        gp_container_interval:""
      },
    ]);
  };

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
      sendGrowthData();
    }
  };

  async function sendGrowthData() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({
        machine_id:inputValues.machine_id,
        card_id:inputValues.card_id,
        macro_id:inputValues.macro_id,
        plant_id:inputValues.plant_id,
        growth_details: growth_details,
      }),
    };

    await fetch(API_URL + "/create_growth_stage", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.response) {
         
        } else {
          swal(
            "",
            responseData.message,
            responseData.status ? "success" : "danger"
          );
          navigate("/growth_stage");
        }
        return responseData;
      })
      .catch((e) => {});
  }

  function validateform() {
    var errors = [];
    var formValid = true;

    if (!inputValues.plant_id) {
      errors["plant_id"] = "No plants were added to the selected machine with the selected card and macro id";
      formValid = false;
    } else errors["plant_id"] = "";

    if (!inputValues.machine_id) {
      errors["machine_id"] =
        "Select machine id";
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

   
    var growthStage=[]
    growth_details.map((growth_details, index) => {
      if (growth_details.stage == "") {
        growth_details_errors[index]["stage"] = "Stage required";
        formValid = false;
      }  else
      {
        if(growthStage.includes(growth_details.stage))
        {
          growth_details_errors[index]["stage"] = "Stage already selected";
          formValid = false;
        }  else  growth_details_errors[index]["stage"] = "";
        growthStage.push(growth_details.stage)
      }

      if (growth_details.starting_day == "") {
        growth_details_errors[index]["starting_day"] = "Starting day required";
        formValid = false;
      } else growth_details_errors[index]["starting_day"] = "";

      if (growth_details.ending_day == "") {
        growth_details_errors[index]["ending_day"] = "Ending day required";
        formValid = false;
      } else growth_details_errors[index]["ending_day"] = "";

      if (growth_details.gp_container_interval == "") {
        growth_details_errors[index]["gp_container_interval"] = "GP container interval required";
        formValid = false;
      } else growth_details_errors[index]["gp_container_interval"] = "";
    });
    seterrors(errors);
    setgrowth_details_errors(growth_details_errors);
    return formValid;
  }

  function handleBackList() {
    navigate("/growth_stage");
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
                <h3 className="font-weight-bolder mt-2">Create New Growth Stage</h3>
                <ul className=" navbar-nav ">
                  <li className="nav-item active">
                    <a href="#">
                      <i className="fas fa-user"></i>Growth Stage
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
                <h3 className="font-weight-bolder mt-2">Growth Stage</h3>
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
                      <div className="errorMsg">
                        {errors.machine_id}
                      </div>
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
                      <div className="errorMsg">
                        {errors.card_id}
                      </div>
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
                      <div className="errorMsg">
                        {errors.macro_id}
                      </div>
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
                          <option value="">Nil</option>
                          {plant_list.map((plant) => {
                          return (
                            <option
                              key={plant.id}
                              value={plant.id}
                            >
                              {plant.plant_name}
                            </option>
                          );
                        })}
                        </select>
                        <i className="fas fa-angle-down droparrow"></i>
                      </div>
                      <div className="errorMsg">
                        {errors.plant_id}
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
                            <label>Starting day</label>
                            <input
                              type="text"
                              className="form-control"
                              name="starting_day"
                              value={growth_details.starting_day}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                            <div className="errorMsg">
                              {growth_details_errors[index]["starting_day"]}
                            </div>
                          </div>
                          <div className="form-group col-md-6">
                            <label>Ending day </label>
                            <input
                              type="text"
                              className="form-control"
                              name="ending_day"
                              value={growth_details.ending_day}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                            <div className="errorMsg">
                              {growth_details_errors[index]["ending_day"]}
                            </div>
                          </div>

                          <div className="form-group col-md-6">
                            <label>GP Container Interval </label>
                            <input
                              type="text"
                              className="form-control"
                              name="gp_container_interval"
                              value={growth_details.gp_container_interval}
                              onChange={(event) =>
                                handleChangeInput(index, event)
                              }
                            />
                            <div className="errorMsg">
                              {
                                growth_details_errors[index][
                                  "gp_container_interval"
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
