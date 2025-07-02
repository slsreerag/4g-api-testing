import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import HeaderNavigation from "../../HeaderNavigation";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../constant/API_Settings";
import ReactPaginate from "react-paginate";
import Moment from "moment";

export default function ListMacro() {
  const navigate = useNavigate();
  const [macro_list, setmacro_list] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setSearch] = useState({});

  const [pages, setpages] = useState({
    current_page: 1,
    last_page: 0,
    total_pages: 0,
    pagination_item: [],
    total_pages: 0,
    total: 0,
  });

  useEffect(() => {
    ListMacro(1);
  }, [search]);

  async function ListMacro(page) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN") + "",
        Accept: "application/json",
      },
      body: JSON.stringify({
        pagination_limit: 20,
        search_keyword: search,
        status:1,
      }),
    };
    await fetch(API_URL + "/list_macro?page=" + page, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        setloading(true);
        setmacro_list(responseData.data.data);
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
    ListMacro(number);
  };

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

              <Link to="/create/macro">
                {" "}
                <button className="btn btn-info my-2">
                  <i className="fas fa-plus fa-sm mr-2"></i>Create Macro
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
                  {/* <div className="col-md-6">
                 <div className="btn-group float-right" role="group" aria-label="Basic outlined example">
                    <button type="button" className={`btn btn-outline-secondary ${active_status === "" ? 'active' : ''}`} onClick={onAllClick}>All</button>
                    <button type="button" className={`btn btn-outline-secondary ${active_status === 1 ? 'active' : ''}`} onClick={onActiveClick}>Active</button>
                    <button type="button" className={`btn btn-outline-secondary ${active_status === 2 ? 'active' : ''}`} onClick={onDeactiveClick}>Inactive</button>
                 </div>
              </div> */}
                </div>
              </div>
              <div className="table-widget">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" colspan="2">
                         Machine Id
                        </th>
                        <th scope="col">
                         Card Id
                        </th>
                        <th scope="col">Plant Name</th>
                        <th scope="col">Macro Id</th>
                        <th scope="col">Created Date/Time</th>

                        <th scope="col" colspan="3" className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {macro_list.map((macro) => {
                        return (
                          <tr>
                            <th scope="row" width="30px">
                              <div className=" img-wrap-xs">
                                <div className="text-rounded">
                                  {macro.machine_id[0]}
                                </div>
                              </div>
                            </th>
                            <td>
                              <strong>{macro.machine_id}</strong>
                            </td>
                            <td>
                              <strong>{macro.card_id}</strong>
                            </td>

                            <td>
                              <strong>{macro.get_plant.plant_name}</strong>
                            </td>
                            <td>
                              <strong className="text-rounded">{macro.macro_id}</strong>
                            </td>
                            <td>
                              <strong>
                                {Moment(macro.created_at).format(
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
                                  <a onClick={(event)=>navigate("/edit/macro/"+macro.id)} className="dropdown-item">
                                    <i className="fas fa-eye mr-2"></i>{" "}
                                    View/Edit
                                  </a>
                                  {/* {permission.includes("contractor deactivate","contractor activate") &&
                        <>
                       {customer.status===1?   <a className="dropdown-item" onClick={(event)=>confirmUser(event,customer.get_user.id,2)} href="#"><i className="fas fa-toggle-off mr-2"></i>Deactivate</a>:<a className="dropdown-item"  onClick={(event)=>confirmActiveUser(event,customer.get_user.id,1)}><i className="fas fa-toggle-on mr-2"></i>Activate</a>}
                       </>
                        } */}
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
