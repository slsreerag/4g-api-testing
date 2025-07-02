import React, { useEffect, useState } from "react";
import HeaderNavigation from "../../Components/HeaderNavigation";
import { API_URL } from "../../constant/API_Settings";
import Moment from "moment";
import ReactPaginate from "react-paginate";

export default function SystemAlerts() {

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
    await fetch(API_URL + "/get_system_warning_list?page=" + page, requestOptions)
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
                  <div className="col-md-12 mt-md-2">
                    <div className="graph-wraper">
                      <div className="table-widget data-table table-responsive text-center">
                        <div className="table">
                          <h2 className="font-weight-bolder mt-2 text-dark text-center">
                            {" "}
                           System Warnings
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
                                  <h3>Message</h3>
                                </th>
                                <th scope="col">
                                  <h3>Reporting Date</h3>
                                </th>
                                <th scope="col">
                                  <h3>Reporting Time</h3>
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
                                      <td className="main">
                                        {elem.machine_id}
                                      </td>
                                      <td className="main">
                                        {elem.message}
                                      </td>
                                      <td className="main">{elem.reporting_date}</td>
                                      <td className="main">{elem.reporting_time}</td>

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
