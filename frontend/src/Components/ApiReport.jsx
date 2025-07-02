import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import HeaderNavigation from "../Components/HeaderNavigation";
import { API_URL } from "../constant/API_Settings";
import Moment from "moment";
import ReactPaginate from "react-paginate";

export default function ApiReport() {
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

  useEffect(() => {
    const timerId = setInterval(() => {
      Listreport(pages.current_page);
    }, 5000);
    return () => {
      clearInterval(timerId);
    };
  }, [pages]);

  async function Listreport(page) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
    };
    await fetch(API_URL + "/get_reports?page=" + page, requestOptions)
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

  const params = useParams();
  return (
    <div>
      <HeaderNavigation />
      <div className="page-wrapper">
        <div className="container">
          <div className="no-result text-center">
            <div className="">
              <div className="content-wrapper w-100">
                <div className="row">
                  <div className="col-md-12 mt-md-2">
                    <div className="graph-wraper">
                      {/* <div className="row mb-2 ml-2">
                         
                            <div className="form-group col-md-3">
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
                            Api Reports
                          </h2>

                          {/* <table className="table table-bordered data-table" > */}

                          <table className="table table-bordered data-table">
                            <thead>
                              <tr>
                                <th scope="col">
                                  <h3>SL.No</h3>
                                </th>
                                <th scope="col">
                                  <h3>Device ID</h3>
                                </th>
                                <th scope="col">
                                  <h3>Count</h3>
                                </th>
                                <th scope="col">
                                  <h3>Update Date & Time</h3>
                                </th>
                                <th scope="col">
                                  <h3>Time since last update</h3>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {list_report.map((elem, index) => {
                                return (
                                  <>
                                    <tr key={index}>
                                      <td className="main">{index + 1}</td>
                                      <td className="main">{elem.device_id}</td>
                                      <td className="main">{elem.count}</td>
                                      <td className="main">
                                        {Moment(elem.created_at).format(
                                          "DD-MM-YYYY, h:mm:ss A"
                                        )}
                                      </td>
                                      <td className="main">
                                        {elem.time_since_last_update}
                                      </td>
                                    </tr>
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* } */}

                      {/* {pages.total === 0 &&

                      <>
                        <div className=" text-center mt-2 no-project ">
                          <img src={Nodata} class="img-fluid p-2" />
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
