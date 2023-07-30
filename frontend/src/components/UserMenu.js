import { useState, useEffect } from "react";
import { Nav, Container, Modal } from "react-bootstrap";
import { Pencil, Calendar2Check, HouseHeart, Journal, GraphDown } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../Axios";
const CHECKIN_URL = "/api/checkin";

export const UserMenu = () => {

    const [activeLink, setActiveLink] = useState(window.location.pathname);
    const {theme, setTheme} = useContext(ThemeContext);
    const [show, setShow] = useState(false);
    const [weight, setWeight] = useState("");
    const [success, setSuccess] = useState("false");
    const [width, setWidth] = useState(window.innerWidth);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id =  JSON.parse(localStorage.getItem("user"));
    let userId = "";
    if (localStorage.getItem("user") !== null) {
        let [key, value] = Object.entries(id)[1];
        userId = value;
    }

    // Change sidebar buttons if width less than 1250
    useEffect(() => {
    const onWidthChange = () => {
        setWidth(window.innerWidth)
    }
    window.addEventListener("resize", onWidthChange);
    return () => window.removeEventListener("resize", onWidthChange);
    }, [])

  // Handle check-in submission
  const handleSubmit = async (e) => {
      e.preventDefault();

      if (weight === "") {
          toast.error("Please enter your weight.", {
              position: "top-left",
              autoClose: 5000,
              theme: theme,
          });
          return;
      }
  
      // Send POST request
      try {
          const response = await axios.post(
          CHECKIN_URL,
          {
              username: userId,
              weight: weight,
          },
          {
              headers: { 
                  "Content-Type": "application/json", 
                  "Access-Control-Allow-Origin": "http://localhost:3000",
                  "Access-Control-Allow-Credentials": true},
              withCredentials: true,
          }
          );
  
          // Clear state and controlled inputs
          setWeight("");
          userId = "";
  
          // Successful POST request
          setSuccess("true");
          toast.success("Thanks for checking in! Keep it up!",  {
              position: "top-left",
              autoClose: 5000,
              theme: theme,
              });
          
          // Close modal
          handleClose();
          
      // Error handling, can only check after POST request (POST request failed)
      } catch (err) {
          if (!err?.response) {
              toast.error("No server response. We are so sorry!", {
                  position: "top-left",
                  autoClose: 5000,
                  theme: theme,
                  });
          } else {
              toast.error("There was an error retrieving your check-in information.", {
                  position: "top-left",
                  autoClose: 5000,
                  theme: theme,
                  });
          }
      }
  };

  // To change button styling on NavBar to show active location
  useEffect(() => {
    const onClick = () => {
      if (window.location.pathname === `/stats/${userId}`) {
        setActiveLink(`/stats/${userId}`);
      }
      else if (window.location.pathname === `/journal/${userId}`) {
        setActiveLink(`/journal/${userId}`);
      }
      else if (window.location.pathname === `/home/${userId}`) {
        setActiveLink(`/home/${userId}`);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [window.location.pathname])

    return (
        <Container>

          {/* Popup Modal for daily weight check-ins */}
          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <div className="user-home-container">
                      <br></br><h1>Daily Check<a>-in</a></h1>
                  </div>
              </Modal.Header>
                  <form>
                      <div className="container">

                          <div className="user-home-container">
                              <h2>Always bee kind to yourself.</h2>
                              <p><b>Tip:</b> It's helpful to weigh yourself at the start of your day! <br></br> Enter today's weight below:</p>
                          </div>

                          <div className="iconDiv">
                              <Pencil size={24} color="#5d5d5d" className="icon3"/>
                              <input type="number" placeholder="Enter Weight" name="uweight" value={weight} onChange={(e) => setWeight(e.target.value)} id="weight" required className="textBox"></input>
                          </div>

                      </div>
                  </form>

                  <div className="footerDiv">
                      <button type="submit" className="submit-button" onClick={handleSubmit} style={{color: 'black' }}>Submit &#10004;</button>
                      <button type="cancel" className="submit-button" onClick={handleClose} style={{color: 'black', backgroundColor: "transparent"}}>Cancel &#10006;</button>
                  </div>
          </Modal>
          {/* End of popup modal */}

            {width > 1250
            ?
            (<Nav className="col-md-2 d-none d-md-block bg-transparent sidebar">
                <Link to={`/home/${userId}`}>
                    <div className={activeLink === `/home/${userId}` ? 'active-button-nav' : 'button-nav'} style={{marginTop: '2rem', marginLeft: '1rem'}}>
                        Home
                    </div>
                </Link>
                    <div className='button-nav' style={{marginTop: '2rem', marginLeft: '1rem'}} onClick={handleShow}>
                        Check-in
                    </div>
                <Link to={`/stats/${userId}`}>
                    <div className={activeLink === `/stats/${userId}` ? 'active-button-nav' : 'button-nav'} style={{marginTop: '2rem', marginLeft: '1rem'}}>
                        My Stats 
                    </div>
                </Link>
                <Link to={`/journal/${userId}`}>
                  <div className="button-nav" style={{marginTop: '2rem', marginLeft: '1rem' }}>
                        Journal
                  </div>
                </Link>
            </Nav>)
                :
            (<Nav className="col-md-2 d-none d-md-block bg-transparent sidebar">
                <Link to={`/home/${userId}`}>
                    <HouseHeart size={55} color="white" className="sideBarIcon"/><br></br>
                </Link>
                    <Calendar2Check size={55} color="white" className="sideBarIcon" onClick={handleShow}/><br></br>
                <Link to={`/stats/${userId}`}>
                    <GraphDown size={55} color="white" className="sideBarIcon"/><br></br>
                </Link>
                <Link to={`/journal/${userId}`}>
                    <Journal size={55} color="white" className="sideBarIcon"/>
                </Link> 
            </Nav>)
            }

        </Container>
    )
}
