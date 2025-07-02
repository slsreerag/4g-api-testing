import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import HeaderNavigation from "../../Components/HeaderNavigation";
import { API_URL } from "../../constant/API_Settings";
import Moment from "moment";
import ReactPaginate from "react-paginate";

export default function DoserReport() {
  const [list_report, setreport] = useState([]);
  const [machineList, setmachineList] = useState([]);
  const [macroList, setmacroList] = useState([]);
  const [plantList, setplantList] = useState([]);
  const [GrowthStageList, setGrowthStageList] = useState([]);
  const [inputValues, setinputValues] = useState([]);
  const [pages, setpages] = useState({
    current_page: 1,
    last_page: 0,
    total_pages: 0,
    pagination_item: [],
    total_pages: 0,
    total: 0,
  });
  useEffect(() => {
    Listreport(1);
    ListMachine();
    ListMacro();
    ListPlant();
    ListGrowthStage();
  }, []);

  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     Listreport(pages.current_page);
  //   }, 10000);
  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, [pages]);

  async function Listreport(page) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_doser_reports?page=" + page, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setreport(responseData.data.data);
        var total_pages = responseData.data.last_page;
        var items = [];
        setpages({
          ...pages,
          current_page: responseData.data.current_page,
          last_page: responseData.data.last_page,
          total_pages: responseData.data.last_page,
          pagination_items: items,
          total: responseData.data.total,
        });

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function ListMachine() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_machine_list", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setmachineList(responseData);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function ListPlant() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_plant_list", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setplantList(responseData);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function ListGrowthStage() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_growth_stage_list", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setGrowthStageList(responseData);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async function ListMacro() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_macro_list", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setmacroList(responseData);

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleValues = (e) => {
    setinputValues({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  // const handlePagination = (number) => {
  //   setpages({
  //     ...pages,
  //     current_page: number,
  //   });

  //   Listreport(number);
  // };

  const handlePageClick = (data) => {
    setpages({
      ...pages,
      current_page: data.selected + 1,
    });
    let number = data.selected + 1;
    Listreport(number);
  };

  const handleReset = () => {
    setinputValues({
      machine_id: "",
      macro_id: "",
      from_date: "",
      to_date: "",
      plant_name: "",
      growth_stage: "",
    });
    Listreport(1);
  };

  const handleFind = () => {
    ListreportData(1);
  };

  async function ListreportData(page) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",

        Accept: "application/json",
      },
      body: JSON.stringify({
        machine_id: inputValues.machine_id,
        macro_id: inputValues.macro_id,
        from_date: inputValues.from_date.split("-").reverse().join("-"),
        to_date: inputValues.to_date.split("-").reverse().join("-"),
        plant_name: inputValues.plant_name,
        growth_stage: inputValues.growth_stage,
      }),
    };
    await fetch(API_URL + "/get_doser_reports?page=" + page, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setreport(responseData.data.data);
        var total_pages = responseData.data.last_page;
        var items = [];
        setpages({
          ...pages,
          current_page: responseData.data.current_page,
          last_page: responseData.data.last_page,
          total_pages: responseData.data.last_page,
          pagination_items: items,
          total: responseData.data.total,
        });

        return responseData;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const params = useParams();
  return (
    <div>
      <HeaderNavigation />
      <div className="container">
      {/* <div className="row">
       <ul className="navbar-nav ml-auto ">
            <li
              className="nav-item"
            >
              <Link className="nav-link " to="/">
                Doser Report
              </Link>
            </li>
            </ul>


       </div> */}
        <div className="page-wrapper">
       
      
          <div className="row mb-2">
            <div className=" col-md-2">
              <label>Machine IDss</label>
              <div className="dropbox">
                <select
                  className="form-control"
                  name="machine_id"
                  value={inputValues.machine_id}
                  onChange={handleValues}
                >
                  <option value="">Select</option>

                  {machineList.map((machine) => {
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
            </div>

            <div className="col-md-2">
              <label>Macro ID</label>
              <div className="dropbox">
                <select
                  className="form-control"
                  name="macro_id"
                  value={inputValues.macro_id}
                  onChange={handleValues}
                >
                  <option value="">Select</option>

                  {macroList.map((macro) => {
                    return (
                      <option key={macro.macro_id} value={macro.macro_id}>
                        {macro.macro_id}
                      </option>
                    );
                  })}
                </select>
                <i className="fas fa-angle-down droparrow"></i>
              </div>
            </div>

            <div className="col-md-2">
              <label>From Date</label>
              <div className="datebox border-0">
                <input
                  type="date"
                  name="from_date"
                  className="form-control"
                  onChange={handleValues}
                  value={inputValues.from_date}
                />
              </div>
            </div>

            <div className="col-md-2">
              <label>To Date</label>
              <div className="datebox border-0">
                <input
                  type="date"
                  name="to_date"
                  className="form-control"
                  onChange={handleValues}
                  value={inputValues.to_date}
                />
              </div>
            </div>

            <div className="col-md-2">
              <label>Plant</label>
              <div className="dropbox">
                <select
                  className="form-control"
                  name="plant_name"
                  onChange={handleValues}
                  value={inputValues.plant_name}
                >
                  <option value="">Select</option>

                  {plantList.map((plant) => {
                    return (
                      <option key={plant.plant_name} value={plant.plant_name}>
                        {plant.plant_name}
                      </option>
                    );
                  })}
                </select>
                <i className="fas fa-angle-down droparrow"></i>
              </div>
            </div>

            <div className="col-md-2">
              <label>Growth Stage</label>
              <div className="dropbox">
                <select
                  className="form-control"
                  name="growth_stage"
                  onChange={handleValues}
                  value={inputValues.growth_stage}
                >
                  <option value="">Select</option>

                  {GrowthStageList.map((growth_stage) => {
                    return (
                      <option
                        key={growth_stage.growth_stage}
                        value={growth_stage.growth_stage}
                      >
                        {growth_stage.growth_stage}
                      </option>
                    );
                  })}
                </select>
                <i className="fas fa-angle-down droparrow"></i>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-10"></div>
            <div className="col-md-1 mt-4">
              <button className="btn btn-success mr-2" onClick={handleFind}>
                Find
              </button>
            </div>
            <div className="col-md-1 mt-4">
              <button className="btn btn-danger" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="table-widget data-table table-responsive">
          <div className="table">
            <h2 className="font-weight-bolder mt-2 text-dark text-center">
              {" "}
              <strong>Doser Reports</strong>
              
            </h2>

            <table className="table table-bordered data-table">
              <thead>
                <tr>
                  <th scope="col">
                    <h5>SL.No</h5>
                  </th>
                  <th scope="col">
                    <h5>Report ID</h5>
                  </th>
                  <th scope="col">
                    <h5>Machine ID</h5>
                  </th>
                  <th scope="col">
                    <h5>Date</h5>
                  </th>
                  <th scope="col">
                    <h5>Time</h5>
                  </th>
                  <th scope="col">
                    <h5>Macro ID</h5>
                  </th>
                  <th scope="col">
                    <h5>Plant Name</h5>
                  </th>
                  <th scope="col">
                    <h5>Growth Stage</h5>
                  </th>

                  <th scope="col">
                    <h5>Pre-TDS</h5>
                  </th>
                  <th scope="col">
                    <h5>Post-TDS</h5>
                  </th>
                  <th scope="col">
                    <h5>Pre-PH</h5>
                  </th>
                  <th scope="col">
                    <h5>Post-PH</h5>
                  </th>
                  <th scope="col">
                    <h5>Motor A Time</h5>
                  </th>
                  <th scope="col">
                    <h5>Motor B Time</h5>
                  </th>
                  <th scope="col">
                    <h5>Motor Acid Time</h5>
                  </th>
                  <th scope="col">
                    <h5>Motor Alkali Time</h5>
                  </th>
                  <th scope="col">
                    <h5>Motor Cmg Time</h5>
                  </th>
                  <th scope="col">
                    <h5>Ph Update</h5>
                  </th>
                  <th scope="col">
                    <h5>Tds Update</h5>
                  </th>
                  <th scope="col">
                    <h5>Cal Mg Update</h5>
                  </th>

                  <th scope="col">
                    <h5>GP #1</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pages.total == 0 && (
                  <tr>
                    <td colspan="22" className="main">
                      <strong>
                        <h3>No Data Found</h3>
                      </strong>
                    </td>
                  </tr>
                )}
                {list_report.map((elem, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td className="main">{index + 1}</td>
                        <td className="main">{elem.report_id}</td>
                        <td className="main">{elem.machine_id}</td>
                        <td className="main">{elem.date}</td>
                        <td className="main">{elem.time}</td>
                        <td className="main">{elem.macro_id}</td>
                        <td className="main">{elem.plant_name}</td>
                        <td className="main">{elem.growth_stage}</td>

                        <td className="main">{elem.pre_tds}</td>
                        <td className="main">{elem.post_tds}</td>
                        <td className="main">{elem.pre_ph}</td>
                        <td className="main">{elem.post_ph}</td>
                        <td className="main">{elem.motor_a_time}</td>
                        <td className="main">{elem.motor_b_time}</td>
                        <td className="main">{elem.motor_acd_time}</td>
                        <td className="main">{elem.motor_alk_time}</td>
                        <td className="main">{elem.motor_cmg_time}</td>
                        <td className="main">{elem.ph_update}</td>
                        <td className="main">{elem.tds_update}</td>
                        <td className="main">{elem.cal_mg_update}</td>

                        <td className="main">{elem.gp_1}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
