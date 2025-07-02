import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import avtar from "./img/avtar.png";
import logo from "./img/logo.png";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function HeaderNavigation() {
  const navigate = useNavigate();
  const [slidingmenu, setslidingMenu] = useState(false);

  const hideSlidingMenu = () => {
    setslidingMenu(false);
  };

  const showSlidingMenu = () => {
    setslidingMenu(true);
  };

  function signOutUser() {
    swal({
      title: "Are you sure want to Logout?",
      icon: "warning",
      buttons: true,
      //dangerMode: true,
      value: "logout",
    }).then((value) => {
      if (value) {
        navigate("/logout");
      }
    });
  }

  const location = useLocation();
  return (
    <div id="page-top">
      <nav className="navbar navbar-expand navbar-light bg-white topbar  static-top  w-100">
        <button
          className="navbar-toggler d-block border-0 left-toggler"
          type="button"
          data-bs-toggle="collapse"
          onClick={showSlidingMenu}
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <a id="hamburger-icon" title="Menu">
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </a>
        </button>
        <div
          id="sliding-menu"
          className={`sliding-menu  ${slidingmenu ? "show" : ""}`}
        >
          <div className="sliding-head">
            <div className="close-btn" onClick={hideSlidingMenu}>
              <div className="nav-icon">
                <div></div>
              </div>
            </div>
            {/* <img src={logo} height="55px" /> */}
          </div>
          <ul className="navbar-nav ml-auto ">
            {/* {localStorage.getItem("ROLE_ID") == "1" && (
              <>
               

                <li className="nav-item ">
                  <Link className="nav-link " to="/system_admins">
                    <i className="fas fa-users fa-sm fa-fw mr-2 "></i>System Admin
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/admins">
                    <i className="fas fa-user fa-sm fa-fw mr-2 "></i>
                    Admin
                  </Link>
                </li>
              </>
            )} */}
          </ul>
        </div>

        <div className="topbar-divider d-none d-sm-block"></div>
        {/* <Link
          className="topbar-brand d-flex align-items-center justify-content-center"
          to="/"
        > */}
        {/* <img src={logo} height="55px" /> */}
        {/* </Link> */}
        {/* <!-- Sidebar Toggle (Topbar) -->
         <!-- Topbar Search --> */}
        <div
          className="collapse navbar-collapse nav-menu"
          id="navbarSupportedContent"
        >
          {/* <!-- Topbar Navbar --> */}
          <ul className="navbar-nav ml-auto ">
            {localStorage.getItem("ROLE_ID") !== "3" && (
              <>
                <li
                  className={`nav-item ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link " to="/home">
                    Home
                  </Link>
                </li>

                <li
                  className={`nav-item ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  <Link className="nav-link " to="/climate">
                    Climate Reports
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    Reports
                  </a>
                  <div className="dropdown-menu w-fit-content ">
                    <a className="dropdown-item" href="/flooding_reports">
                      Flooding Reports
                    </a>

                    <a className="dropdown-item" href="/draining_reports">
                      Draining Reports
                    </a>
                    <a className="dropdown-item" href="/syncing_status_report">
                      Syncing Status Reports
                    </a>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Alerts
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="/alerts">
                      Power Alerts
                    </a>

                    <a className="dropdown-item" href="/flow_alerts">
                      Flow Alerts
                    </a>
                    <a className="dropdown-item" href="/system_warnings">
                      System Warnings
                    </a>
                  </div>
                </li>
              </>
            )}

            {localStorage.getItem("ROLE_ID") == "1" && (
              <li
                className={`nav-item ${
                  location.pathname === "/4g_test" ? "active" : ""
                }`}
              >
                <Link className="nav-link " to="/4g_test">
                  4G API Testing
                </Link>
              </li>
            )}
            {(localStorage.getItem("ROLE_ID") == "1" ||
              localStorage.getItem("ROLE_ID") == "3" ) && (
              <li
                className={`nav-item ${
                  location.pathname === "/32io_test" ? "active" : ""
                }`}
              >
                <Link className="nav-link " to="/32io_test">
                  48IO Testing
                </Link>
              </li>
            )}

            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {/* <!--<span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>--> */}
                <div> {/* <b>{user_det.name}</b> */}</div>
                <img className="img-profile rounded-circle ml-1" src={avtar} />
              </a>
              {/* <!-- Dropdown - User Information --> */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                {/* <Link className="dropdown-item" to="/change_password">
                  <i className="fas fa-key fa-sm fa-fw mr-2 text-gray-400"></i>
                  Change Password
                </Link> */}

                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={signOutUser}
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
        <button className="navbar-toggler mob-navtoggler border-0 d-md-none">
          <a id="hamburger-icon" href="#" title="Menu">
            <span className="line line-1"></span>
            <span className="line line-2"></span>
            <span className="line line-3"></span>
          </a>
        </button>
      </nav>
    </div>
  );
}
