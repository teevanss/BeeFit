import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import logo from "../images/logo1.svg";

export const NavBar = () => {

  // To change CSS of active link
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // To change background color on NavBar
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
    
    <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">

            <Navbar.Brand href="/">
                <img className="logo" src={logo} alt="BeeFit logo"/>
            </Navbar.Brand>

            <Nav className="ms-auto">
                <div className={activeLink == 'register' ? 'active-button-nav' : 'button-nav'} onClick={() => onUpdateActiveLink('register')}>
                    <Nav.Link href="#Register">Register</Nav.Link>
                </div>
                <div className={activeLink == 'login' ? 'active-button-nav' : 'button-nav'} onClick={() => onUpdateActiveLink('login')}>
                    <Nav.Link href="#Login">Login</Nav.Link>
                </div>
            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </Router>
  )
}