import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import logo from "../images/logo.svg";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState("home");
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

  // To change CSS for active link (maybe reuse for darkmode)
  /*
  useEffect(() => {
    console.log(localStorage.getItem("Link"))
    if(localStorage.getItem("Link") === null){
        setActiveLink("home");
        localStorage.setItem("Link", JSON.stringify(activeLink));
    }
    else {
        const val = JSON.parse(localStorage.getItem("Link"))
        setActiveLink(val);
    }
  }, [activeLink]);
*/
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
    //localStorage.setItem("Link", JSON.stringify(value));
  }

  return (
    
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">

            <Navbar.Brand>
                <Link to="/">
                    <img className="logo" src={logo} alt="BeeFit logo" onClick={() => onUpdateActiveLink('home')}/>
                </Link>
            </Navbar.Brand>

            <Nav className="ms-auto">
                <Link to="/register">
                    <div className={activeLink == 'register' ? 'active-button-nav' : 'button-nav'} onClick={() => onUpdateActiveLink('register')}>
                        Register
                    </div>
                </Link>
                <Link to="/login">
                    <div className={activeLink == 'login' ? 'active-button-nav' : 'button-nav'} onClick={() => onUpdateActiveLink('login')}>
                        Login
                    </div>
                </Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}