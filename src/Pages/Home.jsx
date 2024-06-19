import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';

function Home() {
  const [dashboardData, setDashboardData] = useState({
    award_count: 0,
    sponsor_count: 0,
    contact_cnt: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post('https://www.britfintechawards.com/prod/api/admin/dashboardcount', {}, {
          headers: {
            "Authorization": `Bearer ${token}` 
          }
        });

        if (response.data.response) {
          const data = response.data.data[0];
          setDashboardData({
            award_count: data.award_count,
            sponsor_count: data.sponsor_count,
            contact_cnt: data.contact_cnt
          });
        }
      } catch (error) {
        console.error('Error fetching data', error); 
      }
    };

    fetchData();
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
              <div className="col-xl-3 col-sm-6">
                <div className="card gradient-1 card-bx">
                  <div className="card-body d-flex align-items-center">
                    <div className="me-auto text-white">
                      <h2 className="text-white">{dashboardData.contact_cnt}</h2>
                      <span className="fs-18">Contacts Count</span>
                    </div>
                    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M29.0611 39.4402L13.7104 52.5947C12.9941 53.2089 11.9873 53.3497 11.1271 52.9556C10.2697 52.5614 9.7226 51.7041 9.7226 50.7597C9.7226 50.7597 9.7226 26.8794 9.7226 14.5028C9.7226 9.16424 14.0517 4.83655 19.3904 4.83655H38.7289C44.0704 4.83655 48.3995 9.16424 48.3995 14.5028V50.7597C48.3995 51.7041 47.8495 52.5614 46.9922 52.9556C46.1348 53.3497 45.1252 53.2089 44.4088 52.5947L29.0611 39.4402ZM43.5656 14.5028C43.5656 11.8335 41.3996 9.66841 38.7289 9.66841C33.0207 9.66841 25.1014 9.66841 19.3904 9.66841C16.7196 9.66841 14.5565 11.8335 14.5565 14.5028V45.5056L27.4873 34.4215C28.3926 33.646 29.7266 33.646 30.6319 34.4215L43.5656 45.5056V14.5028Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="card gradient-2 card-bx">
                  <div className="card-body d-flex align-items-center">
                    <div className="me-auto text-white">
                      <h2 className="text-white">{dashboardData.sponsor_count}</h2>
                      <span className="fs-18">Sponsors Count</span>
                    </div>
                    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M36.25 9.66665V7.24998C36.25 5.91598 37.3327 4.83331 38.6667 4.83331C40.0007 4.83331 41.0833 5.91598 41.0833 7.24998V9.66665C46.4242 9.66665 50.75 13.9949 50.75 19.3333V43.5C50.75 48.8384 46.4242 53.1666 41.0833 53.1666C34.1741 53.1666 23.8283 53.1666 16.9167 53.1666C11.5782 53.1666 7.25 48.8384 7.25 43.5V19.3333C7.25 13.9949 11.5782 9.66665 16.9167 9.66665V7.24998C16.9167 5.91598 17.9993 4.83331 19.3333 4.83331C20.6673 4.83331 21.75 5.91598 21.75 7.24998V9.66665H36.25ZM45.9167 29H12.0833V43.5C12.0833 46.168 14.2487 48.3333 16.9167 48.3333H41.0833C43.7537 48.3333 45.9167 46.168 45.9167 43.5V29ZM33.5748 37.8329L36.9822 34.5172C37.9392 33.5868 39.469 33.6086 40.3994 34.5656C41.3298 35.5202 41.3081 37.0523 40.3535 37.9827L35.3848 42.8161C34.4955 43.6788 33.1011 43.732 32.1513 42.9393L29.4302 40.6677C28.4055 39.8146 28.2677 38.2896 29.1232 37.265C29.9763 36.2403 31.5012 36.1026 32.5259 36.9581L33.5748 37.8329ZM41.0833 14.5V16.9166C41.0833 18.2506 40.0007 19.3333 38.6667 19.3333C37.3327 19.3333 36.25 18.2506 36.25 16.9166V14.5H21.75V16.9166C21.75 18.2506 20.6673 19.3333 19.3333 19.3333C17.9993 19.3333 16.9167 18.2506 16.9167 16.9166V14.5C14.2487 14.5 12.0833 16.6629 12.0833 19.3333V24.1666H45.9167V19.3333C45.9167 16.6629 43.7537 14.5 41.0833 14.5Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6">
                <div className="card gradient-3 card-bx">
                  <div className="card-body d-flex align-items-center">
                    <div className="me-auto text-white">
                      <h2 className="text-white">{dashboardData.award_count}</h2>
                      <span className="fs-18">Awards Count</span>
                    </div>
                    <svg width={58} height={58} viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.66671 38.6667V43.5C9.66671 48.8409 13.995 53.1667 19.3334 53.1667H43.5C48.8409 53.1667 53.1667 48.8409 53.1667 43.5C53.1667 35.455 53.1667 22.5475 53.1667 14.5C53.1667 9.16162 48.8409 4.83337 43.5 4.83337C36.5908 4.83337 26.245 4.83337 19.3334 4.83337C13.995 4.83337 9.66671 9.16162 9.66671 14.5V19.3334C9.66671 20.6674 10.7494 21.75 12.0834 21.75C13.4174 21.75 14.5 20.6674 14.5 19.3334C14.5 19.3334 14.5 17.069 14.5 14.5C14.5 11.832 16.6654 9.66671 19.3334 9.66671H43.5C46.1705 9.66671 48.3334 11.832 48.3334 14.5V43.5C48.3334 46.1705 46.1705 48.3334 43.5 48.3334C36.5908 48.3334 26.245 48.3334 19.3334 48.3334C16.6654 48.3334 14.5 46.1705 14.5 43.5C14.5 40.9335 14.5 38.6667 14.5 38.6667C14.5 37.3351 13.4174 36.25 12.0834 36.25C10.7494 36.25 9.66671 37.3351 9.66671 38.6667ZM27.9995 26.5834L24.8748 23.461C23.9323 22.5161 23.9323 20.9864 24.8748 20.0415C25.8197 19.099 27.3495 19.099 28.292 20.0415L35.542 27.2915C36.4869 28.2364 36.4869 29.7661 35.542 30.711L28.292 37.961C27.3495 38.9035 25.8197 38.9035 24.8748 37.961C23.9323 37.0161 23.9323 35.4864 24.8748 34.5415L27.9995 31.4167H7.25004C5.91604 31.4167 4.83337 30.334 4.83337 29C4.83337 27.6685 5.91604 26.5834 7.25004 26.5834H27.9995Z" fill="white" />
                    </svg>
                  </div>
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
        {/***********************************
        Main wrapper end
        ************************************/}

      </div>
    </div>
  );
}

export default Home;
