import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import { Pagination, Table } from "react-bootstrap";

function Contact() {
  const [data, setData] = useState([]);
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const btnSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://www.britfintechawards.com/prod/api/admin/contactlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify({ Name, email, phone, fromDate, toDate }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      if (["Invalid request", "Invalid Field Values", "No Records Found", "Field is missing"].includes(result.data)) {
        setData([]);
      } else {
        const sortedData = result.data.sort((a, b) => (a.id === 123 ? -1 : b.id === 123 ? 1 : 0));
        setData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    btnSearch(); // Call on page load
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Determine the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div id="main-wrapper">
        <Header />
        <Sidebar />
        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <h1>Contact List</h1>
                <div className="row mb-4 align-items-center flex-wrap">
                  <div className="mb-3 col-xl-4 col-lg-4 col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      value={Name}
                      id="Name"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3 col-xl-4 col-lg-4 col-md-4">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
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
                      type="date"
                      className="form-control"
                      value={fromDate}
                      id="fromDate"
                      onChange={(e) => setFromDate(e.target.value)}
                      placeholder="From Date"
                    />
                  </div>
                  <div className="mb-3 col-xl-4 col-lg-4 col-md-4">
                    <input
                      type="date"
                      className="form-control"
                      value={toDate}
                      id="toDate"
                      onChange={(e) => setToDate(e.target.value)}
                      placeholder="To Date"
                    />
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4">
                    <button
                      type="button"
                      onClick={btnSearch}
                      className="btn btn-rounded btn-primary w-50"
                    >
                      <span className="btn-icon-start text-primary">
                        <i className="fa-solid fa-magnifying-glass text-dark"></i>
                      </span>
                      Search
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
                  <Table className="table check-data card-table default-table display mb-4 dataTablesCard table-responsive-xl" id="guestTable-all-2">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Record Insert Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center" }}>
                            No records found
                          </td>
                        </tr>
                      ) : (
                        currentItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.message}</td>
                            <td>{item.recordinsertdate}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages).keys()].map((number) => (
                      <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                        {number + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                  </Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
