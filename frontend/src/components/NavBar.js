import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../MyContext';
import logo from "../images/logo.svg";

export const NavBar = () => {

  const {activeLink, setActiveLink} = useContext(MyContext);
  const [scrolled, setScrolled] = useState(false);
  const {theme, setTheme} = useContext(MyContext);

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

  // Update Link
  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  // Update theme
  const onUpdateTheme = () => {
    if (theme == "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
  }

  // To change the values in CSS files
  var store = document.querySelector(':root');
  var value = getComputedStyle(store);

  if (theme == "light") {
    store.style.setProperty('--text-color', 'white');
    store.style.setProperty('--text-color2', 'black');
    store.style.setProperty('--bee-yellow', '#ffb313');
    store.style.setProperty('--input-box', 'rgb(255, 246, 189)');
    store.style.setProperty('--scroll-bar', '#582c08');
  }
  else if (theme == "dark") {
    store.style.setProperty('--text-color', 'black');
    store.style.setProperty('--text-color2', 'white');
    store.style.setProperty('--bee-yellow', '#230999');
    store.style.setProperty('--input-box', 'rgb(208, 192, 252)');
    store.style.setProperty('--scroll-bar', '#090725');
  }

  console.log(theme)

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
                    <div className="button-nav" onClick={() => onUpdateTheme()}>
                        Theme
                    </div>
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