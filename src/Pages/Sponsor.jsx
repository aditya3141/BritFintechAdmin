import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { Pagination, Table } from "react-bootstrap";

function Sponsor() {
  const [data, setData] = useState([]);
  const [Name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Determine the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if token doesn't exist
      navigate("/login");
    }
  }, [navigate]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const btnsearch = async () => {
    //e.preventDefault();
    //setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://www.britfintechawards.com/prod/api/admin/listsponsors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ Name, email, phone, fromdate, todate })
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (result.data === "Invalid request" || result.data === "Invalid Field Values" || result.data === "No Records Found" || result.data === "Field is missing") {
        setData([]);
      } else {
        setData(result.data);
      }
      //setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  
  useEffect(() => {
    btnsearch(); // Call on page load
  }, []);

  // Additional functionality
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };
  
  return (
    <div>
      {/***********************************
  Main wrapper start
    ************************************/}
      <div id="main-wrapper">
        <Header />
        <Sidebar />
        {/***********************************
      Content body start
  ************************************/}
        <div className="content-body">
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <h1>Sponsors List</h1>
                <div className="row mb-4 align-items-center flex-wrap">
                  <div className="mb-3 col-xl-4 col-lg-4 col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      value={Name}
                      id="Name"
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3 col-xl-4 col-lg-4 col-md-4">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      id="email"
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3 col-xl-4 col-lg-4 col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="mb-3 col-xl-4 col-lg-4 col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      value={fromdate}
                      id="fromdate"
                      onChange={(e) => setfromdate(e.target.value)}
                      placeholder="From Date"
                    />
                  </div>
                  <div className="mb-3 col-xl-4 col-lg-4 col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      value={todate}
                      id="todate"
                      onChange={(e) => settodate(e.target.value)}
                      placeholder="To Date"
                    />
                  </div>
                <div className="col-xl-4 col-lg-4 col-md-4">
                <button
                    type="button"
                    onClick={btnsearch}
                    className="btn btn-rounded btn-primary w-50"
                  >
                    <span className="btn-icon-start text-primary">
                      <i class="fa-solid fa-magnifying-glass text-dark"></i>
                    </span>
                    Search
                  </button>
                </div>
                 
                </div>
                <div className="table-responsive">
                  {/* {data.length === 0 ? (
                    <p>No records found</p>
                  ) : ( */}
                  <Table
                    className="table check-data card-table default-table display mb-4 dataTablesCard table-responsive-xl "
                    id="guestTable-all-2"
                  >
                    <thead>
                      <tr>
                        <th>Sr.No.</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Sponsorship</th>
                        <th>Role In Company</th>
                        <th>Company Name</th>
                        <th>Company Info</th>
                        <th>Record Insert Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length === 0 ? (
                        <tr>
                          <td colSpan="9" style={{ textAlign: "center" }}>
                            No records found
                          </td>
                        </tr>
                      ) : (
                        data.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.FullName}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.Sponsorship}</td>
                            <td>{item.Role_In_Company}</td>
                            <td>{item.Company_Name}</td>
                            <td>{item.Company_Info}</td>
                            <td>{item.recordinsertdate}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages).keys()].map(number => (
          <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
            {number + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/***********************************
      Content body end
  ************************************/}

        <Footer />
        {/***********************************
     Support ticket button start
  ************************************/}
        {/***********************************
     Support ticket button end
  ************************************/}
      </div>
      {/***********************************
  Main wrapper end
    ************************************/}
    </div>
  );
}

export default Sponsor;
