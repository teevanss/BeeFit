import { Container, Row, Col } from "react-bootstrap";
import { Calendar2CheckFill } from 'react-bootstrap-icons';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserMenu } from './UserMenu.js';
import { toast } from 'react-toastify';
import axios from "../Axios.js";
import 'react-toastify/dist/ReactToastify.css';
import '../css/userhomepage.css';
import 'animate.css';
import journal from "../images/book.svg";

const JOURNAL_URL = "http://localhost:8080/api/checkin?username="
const id =  JSON.parse(localStorage.getItem("user"));
if (localStorage.getItem("user") ==! null) {
  let [key, value] = Object.entries(id)[1];
  let userId = value;
  JOURNAL_URL = "http://localhost:8080/api/checkin?username=" + userId; 
}

export const Journal = () => {

  const {theme, setTheme} = useContext(ThemeContext);

  // Send GET request for check-in data for user
  useEffect(() => {
    const fetchJournal = async () => {

      // Send GET request
      try {
        const response = await axios.get(
        JOURNAL_URL, 
      {
      },
      {
        headers: 
        { 
          "Content-Type": "application/json", 
          "Access-Control-Allow-Origin": "http://localhost:3000",
        }
      }
      )
      .then(response => {


      });
        } catch (err) {
          if (!err?.response) {
            toast.error("No server response. We are so sorry!", {
              position: "top-left",
              autoClose: 5000,
              theme: theme,
              });
          } else {
          toast.error("There was an error retrieving your journal information.", {
              position: "top-left",
              autoClose: 5000,
              theme: theme,
              });
            };
          }
    };
    fetchJournal()
    // Run effect if theme changes (to update colors)
  }, [theme])


    return ( 

        <section className="user-home-container" id={theme === 'light' ? 'user-home' : 'user-home-dark'}> 
          <Container>
            <Row className="align-items-center">

          <Col xs={0} md={2} xl={2}>
            <UserMenu/>
          </Col>

          <Col xs={12} md={10} xl={10}>
            <img className="book" src={journal} alt="A book to write in"/>
          </Col>

            </Row>
          </Container>
        </section>
  )
}