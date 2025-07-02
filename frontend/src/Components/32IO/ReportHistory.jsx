import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import HeaderNavigation from "../HeaderNavigation";
import { API_URL } from "../../constant/API_Settings";
import Moment from "moment";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ReportHistory() {
  const [listReport, setListReport] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pages, setPages] = useState({
    current_page: 1,
    last_page: 0,
    total_pages: 0,
    total: 0,
  });

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetchReportData(1);
  }, [startDate, endDate,selectedDevice]);
  useEffect(() => {
    fetchDeviceList();
  }, []);

  async function fetchReportData(page) {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
        Accept: "application/json",
      },
      body: JSON.stringify({
        page: page,
        startDate: startDate ? Moment(startDate).format("YYYY-MM-DD HH:mm:ss") : null,
        endDate: endDate ? Moment(endDate).format("YYYY-MM-DD HH:mm:ss") : null,
        selectedDevice: selectedDevice ? selectedDevice : null,
      }),
    };
    try {
      const response = await fetch(API_URL + "/get_all_report?page=" + page, requestOptions);
      const responseData = await response.json();
      setListReport(responseData.data.data);
      setPages({
        current_page: responseData.data.current_page,
        last_page: responseData.data.last_page,
        total_pages: responseData.data.last_page,
        total: responseData.data.total,
      });
      setIsLoading(false); 
      console.log("setpages", setPages)
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  async function fetchDeviceList() {
    try {
      const response = await fetch(API_URL + "/get_all_devices", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("AUTH_TOKEN"),
          Accept: "application/json",
        },
      });
      const responseData = await response.json();
      setDevices(responseData);
      console.log(responseData,"mydevicedata");
    } catch (e) {
      console.error(e);
    }
  }

  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    fetchReportData(selectedPage);
  };

  return (
    <>
    <div>
      <HeaderNavigation />
      <div className="page-wrapper">
        <div className="container">
          <div className="no-result text-center">
            <div className="">
              <div className="report-sort-wrap content-wrapper w-100">
                <div className="row align-items-end justify-content-between">                    
                  
                    <div className="col-md-6">
                      <div className="left-head-flex">
                      <div className="form-group select-group">
                        <label>
                        Device:
                        </label>
                        <select 
                          className="form-group form-control" 
                          onChange={(event) => setSelectedDevice(event.target.value)}
                        >
                        <option value="">All Devices</option>
                        {devices.map(device => (
                          <option key={device.device_id} value={device.device_id}>{device.device_id}</option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group start-date-outer">
                      <div className="start-date">
                        <label>Start Date:</label>
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          showTimeSelect
                          dateFormat="yyyy-MM-dd HH:mm:ss"
                        />
                      </div>
                    </div>
                    <div className="form-group end-date-outer">
                      <div className="end-date">
                      <label>End Date:</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        showTimeSelect
                        dateFormat="yyyy-MM-dd HH:mm:ss"
                      />
                    </div>
                    </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                    <div className="right-head-flex">
                      {/* <div className="btn-wrap">
                        <button className="btn btn-success">Download</button>
                      </div> */}
                    </div>
                    </div>

                    </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mt-md-2">
                    <div className="graph-wraper">
                      <div className="table-widget data-table table-responsive">
                        <div className="table nowrap">
                          <h2 className="font-weight-bolder mt-2 text-dark">Api Reports</h2>
                          <table className="table table-bordered data-table">
                            <thead>
                              <tr>
                                <th scope="col"><h3>SL.No</h3></th>
                                <th scope="col"><h3>Device ID</h3></th>
                                <th scope="col"><h3>P1</h3></th>
                                <th scope="col"><h3>P2</h3></th>
                                <th scope="col"><h3>P3</h3></th>
                                <th scope="col"><h3>P4</h3></th>
                                <th scope="col"><h3>P5</h3></th>
                                <th scope="col"><h3>P6</h3></th>
                                <th scope="col"><h3>P7</h3></th>
                                <th scope="col"><h3>P8</h3></th>
                                <th scope="col"><h3>P9</h3></th>
                                <th scope="col"><h3>P10</h3></th>
                                <th scope="col"><h3>P11</h3></th>
                                <th scope="col"><h3>P12</h3></th>
                                <th scope="col"><h3>P13</h3></th>
                                <th scope="col"><h3>P14</h3></th>
                                <th scope="col"><h3>P15</h3></th>
                                <th scope="col"><h3>P16</h3></th>
                                <th scope="col"><h3>P17</h3></th>
                                <th scope="col"><h3>P18</h3></th>
                                <th scope="col"><h3>P19</h3></th>
                                <th scope="col"><h3>P20</h3></th>
                                <th scope="col"><h3>P21</h3></th>
                                <th scope="col"><h3>P22</h3></th>
                                <th scope="col"><h3>P23</h3></th>
                                <th scope="col"><h3>P24</h3></th>
                                <th scope="col"><h3>P25</h3></th>
                                <th scope="col"><h3>P26</h3></th>
                                <th scope="col"><h3>P27</h3></th>
                                <th scope="col"><h3>P28</h3></th>
                                <th scope="col"><h3>P29</h3></th>
                                <th scope="col"><h3>P30</h3></th>
                                <th scope="col"><h3>P31</h3></th>
                                <th scope="col"><h3>P32</h3></th>
                                <th scope="col"><h3>P33</h3></th>
                                <th scope="col"><h3>P34</h3></th>
                                <th scope="col"><h3>P35</h3></th>
                                <th scope="col"><h3>P36</h3></th>
                                <th scope="col"><h3>P37</h3></th>
                                <th scope="col"><h3>P38</h3></th>
                                <th scope="col"><h3>P39</h3></th>
                                <th scope="col"><h3>P40</h3></th>
                                <th scope="col"><h3>P41</h3></th>
                                <th scope="col"><h3>P42</h3></th>
                                <th scope="col"><h3>P43</h3></th>
                                <th scope="col"><h3>P44</h3></th>
                                <th scope="col"><h3>P45</h3></th>
                                <th scope="col"><h3>P46</h3></th>
                                <th scope="col"><h3>P47</h3></th>
                                <th scope="col"><h3>P48</h3></th>
                                <th scope="col"><h3>P49</h3></th>
                                <th scope="col"><h3>Update Date & Time</h3></th>
                              </tr>
                            </thead>
                            <tbody>
                            {isLoading ? (
                                <tr>
                                  <td colSpan="28" rowSpan="10" className="text-center">
                                    Loading...
                                  </td>
                                </tr>
                              ) : (
                              
                              listReport.map((elem, index) => {
                                const serialNumber = (pages.current_page - 1) * 50 + (index + 1);
                                return (
                                  <tr key={index}>
                                    <td className="main">{serialNumber }</td>
                                    <td className="main">{elem.device_id}</td>
                                    <td className="main">{elem.P1}</td>
                                    <td className="main">{elem.P2}</td>
                                    <td className="main">{elem.P3}</td>
                                    <td className="main">{elem.P4}</td>
                                    <td className="main">{elem.P5}</td>
                                    <td className="main">{elem.P6}</td>
                                    <td className="main">{elem.P7}</td>
                                    <td className="main">{elem.P8}</td>
                                    <td className="main">{elem.P9}</td>
                                    <td className="main">{elem.P10}</td>
                                    <td className="main">{elem.P11}</td>
                                    <td className="main">{elem.P12}</td>
                                    <td className="main">{elem.P13}</td>
                                    <td className="main">{elem.P14}</td>
                                    <td className="main">{elem.P15}</td>
                                    <td className="main">{elem.P16}</td>
                                    <td className="main">{elem.P17}</td>
                                    <td className="main">{elem.P18}</td>
                                    <td className="main">{elem.P19}</td>
                                    <td className="main">{elem.P20}</td>
                                    <td className="main">{elem.P21}</td>
                                    <td className="main">{elem.P22}</td>
                                    <td className="main">{elem.P23}</td>
                                    <td className="main">{elem.P24}</td>
                                    <td className="main">{elem.P25}</td>
                                    <td className="main">{elem.P26}</td>
                                    <td className="main">{elem.P27}</td>
                                    <td className="main">{elem.P28}</td>
                                    <td className="main">{elem.P29}</td>
                                    <td className="main">{elem.P30}</td>
                                    <td className="main">{elem.P31}</td>
                                    <td className="main">{elem.P32}</td>
                                    <td className="main">{elem.P33}</td>
                                    <td className="main">{elem.P34}</td>
                                    <td className="main">{elem.P35}</td>
                                    <td className="main">{elem.P36}</td>
                                    <td className="main">{elem.P37}</td>
                                    <td className="main">{elem.P38}</td>
                                    <td className="main">{elem.P39}</td>
                                    <td className="main">{elem.P40}</td>
                                    <td className="main">{elem.P41}</td>
                                    <td className="main">{elem.P42}</td>
                                    <td className="main">{elem.P43}</td>
                                    <td className="main">{elem.P44}</td>
                                    <td className="main">{elem.P45}</td>
                                    <td className="main">{elem.P46}</td>
                                    <td className="main">{elem.P47}</td>
                                    <td className="main">{elem.P48}</td>
                                    <td className="main">{elem.P49}</td>
                                    <td className="main">{Moment(elem.created_at).format("DD-MM-YYYY hh:mm:ss A")}</td>
                                  </tr>
                                );
                              }))}
                            
                            </tbody>
                          </table>
                        </div>
                        <div className="col-md-12 mt-md-2">
                          <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(pages.total_pages)}
                            previousLabel="< Previous"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            activeClassName="active"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-md-2">
                  <div className="col-md-12"></div>
                </div>
              </div>
              <div className="dashboard-wrapper"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
