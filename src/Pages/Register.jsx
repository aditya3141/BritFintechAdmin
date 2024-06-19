
import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import Modal from '../Components/Modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Register() {
  
  const [data, setData] = useState([]);
  const [Name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [fromdate, setfromdate] = useState(null);
  const [todate, settodate] = useState(null);
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
            Authorization: `Bearer ${token}`// Include the token in the Authorization header
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
  // useEffect(() => {
  //   btnsearch(); // Call on page load
  // }, []);

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
                  <table
                    className="table check-data card-table default-table display mb-4 dataTablesCard table-responsive-xl "
                    id="guestTable-all-2"
                  >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Document</th>
                        <th>Full Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>TurnoverIn GBP</th>
                        <th>Company Reg No</th>
                        <th>Company Name</th>
                        <th>Comapny Address</th>
                        <th>Award Category</th>
                        <th>Business Corridors</th>
                        <th>Service You Offer</th>
                        <th>Website URL</th>
                        <th>More_Details_About_Yourself</th>
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
                            <td>
                              {/* <div className="dropdown">
                              <button
                                type="button"
                                className="btn btn-success light sharp"
                                onClick={handleShow}
                              >Document
                              </button>
                            </div> */}




                              <button
                                type="button"
                                className="btn btn-success light sharp"
                                onClick={() => handleShow(item.Upload_More_Details) }
			      >
                                Document
                              </button>
                            </td>
                            <td>{item.FullName}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>{item.Annual_Turnover_In_GBP}</td>
                            <td>{item.Company_Reg_Number}</td>
                            <td>{item.Company_Name}</td>
                            <td>{item.Comapny_Address}</td>
                            <td>{item.Award_Category}</td>
                            <td>{item.Business_Corridors}</td>
                            <td>{item.Service_You_Offer}</td>
                            <td>{item.Website_URL}</td>
                            <td>{item.More_Details_About_Yourself}</td>
                            <td>{item.recordinsertdate}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

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


