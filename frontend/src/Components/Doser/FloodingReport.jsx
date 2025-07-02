import React, { useEffect, useState } from "react";
import HeaderNavigation from "../../Components/HeaderNavigation";
import { API_URL } from "../../constant/API_Settings";
import Moment from "moment";
import ReactPaginate from "react-paginate";

export default function FloodingReport() {
  const [list_report, setreport] = useState([]);
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
  }, []);

  async function Listreport(page) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_flooding_list?page=" + page, requestOptions)
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

  const handlePageClick = (data) => {
    setpages({
      ...pages,
      current_page: data.selected + 1,
    });
    let number = data.selected + 1;
    Listreport(number);
  };
  return (
    <div>
      <HeaderNavigation />
      <div className="page-wrapper">
        <div className="container">
          <div className="no-result">
            <div className="">
              <div className="content-wrapper">
                <div className="row">
                  {/* <div className=" col-md-4">
                    <label>Machine ID</label>
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
                  </div> */}

                  {/* <div className="col-md-2">
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
                  </div> */}

                  {/* <div className="col-md-4">
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
                  </div> */}

                  {/* <div className="col-md-4">
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
                  </div> */}

                  {/* <div className="col-md-2">
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
                            <option
                              key={plant.plant_name}
                              value={plant.plant_name}
                            >
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
                  </div> */}
                </div>
                {/* <div className="row">
                  <div className="col-md-10"></div>

                  <div className="col-md-1 mt-4">
                    <button
                      className="btn btn-success mr-2"
                      onClick={handleFind}
                    >
                      Find
                    </button>
                  </div>
                  <div className="col-md-1 mt-4">
                    <button className="btn btn-danger" onClick={handleReset}>
                      Reset
                    </button>
                  </div>
                </div> */}

                <div className="row">
                  <div className="col-md-12 mt-md-2">
                    <div className="graph-wraper">
                      <div className="table-widget data-table table-responsive text-center">
                        <div className="table">
                          <h2 className="font-weight-bolder mt-2 text-dark text-center">
                            {" "} 
                            Flooding Reports
                          </h2>

                          <table className="table table-bordered data-table">
                            <thead>
                              <tr>
                                <th scope="col">
                                  <h3>SL.No</h3>
                                </th>
                                <th scope="col">
                                  <h3>Machine ID</h3>
                                </th>

                                <th scope="col">
                                  <h3>Card ID</h3>
                                </th>
                                <th scope="col">
                                  <h3>Macro ID</h3>
                                </th>
                                <th scope="col">
                                  <h3>Flood Status</h3>
                                </th>
                                <th scope="col">
                                  <h3>Duration</h3>
                                </th>
                                <th scope="col">
                                  <h3>Date</h3>
                                </th>
                                <th scope="col">
                                  <h3>Time</h3>
                                </th>

                                <th scope="col">
                                  <h3>Reported At</h3>
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
                                      <td className="main">{elem.machine_id}</td>
                                      <td className="main">{elem.card_id}</td>
                                      <td className="main">
                                      {elem.macro_id}
                                      </td>
                                      <td className="main">{elem.flood_status}</td>
                                      <td className="main">{elem.duration}</td>
                                      <td className="main">{elem.date}</td>
                                      <td className="main">{elem.time}</td>

                                      <td className="main">
                                        {Moment(elem.created_at).format(
                                          "DD-MM-YYYY, h:mm A"
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* {pages.total === 0 &&

                      <>
                        <div className=" text-center mt-2 no-project ">
                          <img src={Nodata} className="img-fluid p-2" />
                          <p className="text-light">No Data Found. <br />
                            
                          </p>
                         
                        </div>


                      </>

                    / } */}
                    </div>
                  </div>
                </div>
              </div>

              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pages.total_pages}
                marginPagesDisplayed={3}
                pageRangeDisplayed={4}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-end"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
