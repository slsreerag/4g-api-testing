import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import HeaderNavigation from "../../HeaderNavigation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constant/API_Settings";
import ReactPaginate from "react-paginate";
import Moment from "moment";
import swal from "sweetalert";

export default function ListPlant() {
  const navigate = useNavigate();
  const [plant_list, setplant_list] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState({});
  const [active_status, setactive_status] = useState(1);

  const [pages, setpages] = useState({
    current_page: 1,
    last_page: 0,
    total_pages: 0,
    pagination_item: [],
    total_pages: 0,
    total: 0,
  });

  useEffect(() => {
    ListPlant(1);
  }, [search, active_status]);

  async function ListPlant(page) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: active_status,
        pagination_limit: 20,
        search_keyword: search,
      }),
    };
    await fetch(API_URL + "/list_plant?page=" + page, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setloading(true);
        setplant_list(responseData.data.data);
        var total_pages = responseData.data.last_page;
        var items = [];
        // for (let number = 1; number <= total_pages; number++) {
        //    number===page?items.push(
        //       <li key={number} className="page-item active"><a className="page-link" onClick={()=>handlePagination(number)}>{number}</a></li>
        //       ,):items.push(
        //       <li key={number} className="page-item"><a className="page-link" onClick={()=>handlePagination(number)}>{number}</a></li>
        //       ,)
        //        }

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

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageClick = (data) => {
    setpages({
      ...pages,
      current_page: data.selected + 1,
    });
    let number = data.selected + 1;
    ListPlant(number);
  };

  const onAllClick = () => {
    setactive_status("");
  };

  const onActiveClick = () => {
    setactive_status(1);
  };

  const onDeactiveClick = () => {
    setactive_status(2);
  };

  const ConfirmActivate = (event, id, status) => {
    swal({
      title: "Are you sure want to Activate?",
      //   text: "*Project associated  with the customer will also get deactivate",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      value: "logout",
    }).then((value) => {
      console.log(value);
      if (value) {
        handleSubmit(event, id, status);
      }
    });
  };

  const ConfirmDeactivate = (event, id, status) => {
    swal({
      title: "Are you sure want to Deactivate?",
      text: "*Project associated  with the growth stage and macro details will also get Deactivate",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      value: "logout",
    }).then((value) => {
      if (value) {
        handleSubmit(event, id, status);
      }
    });
  };

  const handleSubmit = (event, id, status) => {
    event.preventDefault();
    sendDelete(id, status);
  };

  async function sendDelete(id, status) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },

      body: JSON.stringify({
        plant_id: id,
        status:status
      }),
    };

    await fetch(API_URL + "/deactivate_plant", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        if (responseData.response) {
          // setfielderrors({
          //     project_name: responseData.response.project_name,
          //     gps: responseData.response.gps,
          // });
        } else if (responseData.status == 3) {
          swal(
            "",
            responseData.message,
            responseData.status ? "warning" : "danger"
          );
        } else {
          swal(
            "",
            responseData.message,
            responseData.status ? "success" : "danger"
          );
          ListPlant(1);
        }
        return responseData;
      })
      .catch((e) => {});
  }

  return (
    <div className="bg-white ">
      <HeaderNavigation />
      <div className="page-wrapper ">
        <div className="container">
          <div className="d-md-flex">
            <div className="side-wrap ">
              {/* <div className="row">
           <div className="col-md-4">
              <div className="count">
                 <p>All</p>
                 <h4>1</h4>
              </div>
           </div>
           <div className="col-md-4">
              <div className="count">
                 <p>Active</p>
                 <h4>2</h4>
              </div>
           </div>
           <div className="col-md-4">
              <div className="count">
                 <p>Inactive</p>
                 <h4>3</h4>
              </div>
           </div>
        </div> */}

              <Link to="/create/plant">
                {" "}
                <button className="btn btn-info my-2">
                  <i className="fas fa-plus fa-sm mr-2"></i>Create Project
                </button>
              </Link>
            </div>
            <div className="content-area  ">
              <div className="widget-head">
                <div className="row">
                  {/* <div className="col-md-6 search">
                    <div className="input-group ">
                      <input
                        type="text"
                        className="form-control bg-light border-0 small"
                        placeholder="Search with Plant Name"
                                              value={search.search_keyword} onChange={handleSearch} onKeyPress={(event) => {
                        var key = event.keyCode || event.which;
                        if (key === 13) {

                        }
                        }}
                      />
                      <div className="input-group-append align-items-center justify-content-center">
                        <i className="fas fa-search fa-sm"></i>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-md-6"></div>

                  <div className="col-md-6">
                    <div
                      className="btn-group float-right"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <button
                        type="button"
                        className={`btn btn-outline-secondary ${
                          active_status === "" ? "active" : ""
                        }`}
                        onClick={onAllClick}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        className={`btn btn-outline-secondary ${
                          active_status === 1 ? "active" : ""
                        }`}
                        onClick={onActiveClick}
                      >
                        Active
                      </button>
                      <button
                        type="button"
                        className={`btn btn-outline-secondary ${
                          active_status === 2 ? "active" : ""
                        }`}
                        onClick={onDeactiveClick}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-widget">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" colSpan="2">
                          Plant Name
                        </th>
                        <th scope="col">Machine Id</th>
                        <th scope="col">Card Id</th>
                        <th scope="col">Macro Id</th>
                        <th scope="col">Created Date/Time</th>

                        <th scope="col" colSpan="3" className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {plant_list.map((plant, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row" width="30px">
                              <div className=" img-wrap-xs">
                                <div className="text-rounded">
                                  {plant.plant_name[0]}
                                </div>
                              </div>
                            </th>
                            <td>
                              <strong>{plant.plant_name}</strong>
                            </td>

                            <td>
                              <strong>{plant.machine_id}</strong>
                            </td>
                            <td>
                              <strong>{plant.card_id}</strong>
                            </td>
                            <td>
                              <strong className="text-rounded">
                                {plant.macro_id}
                              </strong>
                            </td>
                            <td>
                              <strong>
                                {Moment(plant.created_at).format(
                                  "DD-MM-YYYY, h:mm A"
                                )}
                              </strong>
                            </td>
                            {/* <td  onClick={(event)=>navigate("/customers/edit/"+plant.id)}><button className="btn btn-gray">View</button></td> */}
                            {/* <td ><a className="sub-btn" href=""><i className="fas fa-ellipsis-h"></i></a> */}

                            <td>
                              <div className="dropdown text-center mb-3">
                                <a
                                  className=" sub-btn"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="fas fa-ellipsis-h"></i>
                                </a>
                                <div
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  {plant.status==1 &&
                                  <a
                                    onClick={(event) =>
                                      navigate("/edit/plant/" + plant.id)
                                    }
                                    className="dropdown-item"
                                  >
                                    <i className="fas fa-eye mr-2"></i>{" "}
                                    View/Edit
                                  </a>}

                                  {
                                    plant.status === 1 ? (
                                      <a
                                        className="dropdown-item"
                                        onClick={(event) =>
                                          ConfirmDeactivate(event, plant.id, 2)
                                        }
                                        href="#"
                                      >
                                        <i className="fas fa-toggle-off mr-2"></i>
                                        Deactivate
                                      </a>
                                    ) : 
                                     (
                                      <a
                                        className="dropdown-item"
                                        onClick={(event) =>
                                          ConfirmActivate(
                                            event,
                                            plant.id,
                                            1
                                          )
                                        }
                                      >
                                        <i className="fas fa-toggle-on mr-2"></i>
                                        Activate
                                      </a>
                                    )
                                  }
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {pages.total === 0 && (
                <>
                  <div className=" text-center mt-3 no-project ">
                    {/* <img src={Nodata} className="img-fluid p-2" /> */}
                    <p className="text-light">
                      No Data Found. <br />
                    </p>
                  </div>
                </>
              )}

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
