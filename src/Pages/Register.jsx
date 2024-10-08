
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Modal from '../Components/Modal';
import { Button, Pagination, Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Register() {
  
  const [data, setData] = useState([]);
  const [Name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);
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
  // const [show, setShow] = useState(false);
  // const documentUrl = "https://britfintechawards.com/test/assets/Uploads/BFA20240525023821.pdf"; // Replace with your document URL

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if token doesn't exist
      navigate("/login");
    }
  }, [navigate]);

  const handleShow = (documentContent) => {
    setSelectedDocument(documentContent);
    setShow(true);
  };

  const handleClose = () => setShow(false);


  const btnsearch = async () => {
    //e.preventDefault();
    //setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://www.britfintechawards.com/prod/api/admin/awardlist",
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
      if (result.data === "Invalid request" || result.data === "Invalid Field Values" || result.data === "No Records Found" || result.data === "Field is missing" ) {
        setData([]);
      } else {
        setData(result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  useEffect(() => {
    btnsearch(); // Call on page load
  }, []);

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
                <h1>Register List</h1>
                <div className="d-flex mb-4 gap-2 justify-content-between align-items-center flex-wrap">
                  <div className="mb-3 w-40">
                    <input
                      type="text"
                      className="form-control"
                      value={Name}
                      id="Name"
                      onChange={(e) => setname(e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3 w-40">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      id="email"
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3 w-40">
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="mb-3 w-40">
                    <input
                      type="text"
                      className="form-control"
                      value={fromdate}
                      id="fromdate"
                      onChange={(e) => setfromdate(e.target.value)}
                      placeholder="From Date"
                    />
                  </div>
                  <div className="mb-3 w-40">
                    <input
                      type="text"
                      className="form-control"
                      value={todate}
                      id="todate"
                      onChange={(e) => settodate(e.target.value)}
                      placeholder="To Date"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={btnsearch}
                    className="btn btn-rounded btn-primary"
                  >
                    <span className="btn-icon-start text-primary">
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </span>
                    Search
                  </button>
                  {/* <Button variant="primary" onClick={handleShow}>
        Show Document
      </Button>
      <Modal show={show} handleClose={handleClose} documentUrl={documentUrl} /> */}
                </div>
                <div className="table-responsive">
                <Table className="table check-data card-table default-table display mb-4 dataTablesCard table-responsive-xl" id="guestTable-all-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Document</th>
            <th>Additional Attach</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Turnover In GBP</th>
            <th>Company Reg No</th>
            <th>How Many Person Join</th>
            <th>Company Sector</th>
            <th>Company Name</th>
            <th>Company Address</th>
            <th>Award Category</th>
            <th>Business Corridors</th>
            <th>Service You Offer</th>
            <th>Website URL</th>
            <th>More Details About Yourself</th>
            <th>Record Insert Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="16" style={{ textAlign: "center" }}>No records found</td>
            </tr>
          ) : (
            currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{indexOfFirstItem + index + 1}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success light sharp"
                    onClick={() => handleShow(item.Upload_More_Details)}
                  >
                    Document
                  </button>
                </td>
                <td>
                 
              {item.AdditionalDoc ? (
                <button
                  type="button"
                  className="btn btn-success light sharp"
                  onClick={() => handleShow(item.AdditionalDoc_link)}
                >
                  Additional doc
                </button>
              ) : null}
            </td>

                <td>{item.FullName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.Annual_Turnover_In_GBP}</td>
                <td>{item.Company_Reg_Number}</td>
                <td>{item.how_many_person_join}</td>
                <td>{item.Company_Sector}</td>
                <td>{item.Company_Name}</td>
                <td>{item.Comapny_Address}</td>
                <td>{item.Award_Category}</td>
                <td style={{overflow: 'scroll'}}>{item.Business_Corridors}</td>
                <td style={{overflow: 'scroll'}}>{item.Service_You_Offer}</td>
                <td>{item.Website_URL}</td>
                <td style={{overflow: 'scroll'}}>{item.More_Details_About_Yourself}</td>
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
    

                  <Modal
                    show={show}
                    handleClose={handleClose}
                    documentContent={selectedDocument}
                  />
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


export default Register


