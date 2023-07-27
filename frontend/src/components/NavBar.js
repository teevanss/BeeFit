import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { LoginContext } from '../LoginContext';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../images/logo.svg";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState(window.location.pathname);
  console.log(window.location.pathname)
  const [scrolled, setScrolled] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const {theme, setTheme} = useContext(ThemeContext);
  const {loggedIn, setLoggedIn} = useContext(LoginContext);

  let userId = ""
  if (loggedIn == true ) {
    const id =  JSON.parse(localStorage.getItem("user"));
          
    let [key, valueUser] = Object.entries(id)[1];
    let userId = valueUser;
  }

  // To change button styling on NavBar to show active location
  useEffect(() => {
    const onClick = () => {
      if (window.location.pathname === "/register") {
        setActiveLink("/register");
      }
      else if (window.location.pathname === "/login") {
        setActiveLink("/login");
      }
      else if (window.location.pathname === "/settings") {
        setActiveLink("/settings");
      }
      if (window.location.pathname === `/stats/${userId}`) {
        setActiveLink(`/stats/${userId}`);
      }
      else if (window.location.pathname === "/journal") {
        setActiveLink("/journal");
      }
      else if (window.location.pathname === `/home/${userId}`) {
        setActiveLink(`/home/${userId}`);
      }
      else if (window.location.pathname === "/") {
        setActiveLink("/");
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [activeLink])
  
  // To change background color for NavBar depending on scroll location
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

    // Combine navBars when logged in and width less than 768
    useEffect(() => {
      const onWidthChange = () => {
        setWidth(window.innerWidth)
      }
      window.addEventListener("resize", onWidthChange);
      return () => window.removeEventListener("resize", onWidthChange);
    }, [])

  // Update theme
  const onUpdateTheme = () => {
    if (theme === "light") {
        setTheme("dark");
      } else {
        setTheme("light");
      }
  }

  // Change navbar buttons depending on if user is logged in or not
  const onLogout = () => {
    localStorage.removeItem("user")
    setLoggedIn("false");
  }

  // To change the values in CSS files 
  var store = document.querySelector(':root');
  var value = getComputedStyle(store);

  if (theme === "light") {
    store.style.setProperty('--text-color', 'white');
    store.style.setProperty('--text-color2', 'black');
    store.style.setProperty('--bee-yellow', '#ffb313');
    store.style.setProperty('--input-box', 'rgb(255, 246, 189)');
    store.style.setProperty('--scroll-bar', '#582c08');
  }
  else if (theme === "dark") {
    store.style.setProperty('--text-color', 'black');
    store.style.setProperty('--text-color2', 'white');
    store.style.setProperty('--bee-yellow', '#230999');
    store.style.setProperty('--input-box', 'rgb(208, 192, 252)');
    store.style.setProperty('--scroll-bar', '#090725');
  }

// If logged in and width is less than 768, we combine the two navbars into one.
if (loggedIn === true) {
  if (width < 768) {
    return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">

            <Navbar.Brand>
                <Link to="/">
                    <img className="logo" src={logo} alt="BeeFit logo"/>
                </Link>
            </Navbar.Brand>

            <Nav className="ms-auto">
                <Link>
                  <div className="button-nav" onClick={() => onUpdateTheme()}>
                      Theme
                  </div>
                </Link>
                <Link to="/settings">
                  <div className={activeLink === '/settings' ? 'active-button-nav' : 'button-nav'}>
                      Settings
                  </div>
                </Link>
                <Link to={`/home/${userId}`}>
                    <div className={activeLink === `/home/${userId}` ? 'active-button-nav' : 'button-nav'}>
                        Home
                    </div>
                </Link>
                <Link>
                  <div className="button-nav">
                      Check-in
                  </div>
                </Link>
                <Link to={`/stats/${userId}`}>
                  <div className={activeLink === `/stats/${userId}` ? 'active-button-nav' : 'button-nav'}>
                      My Stats 
                  </div>
                </Link>
                <Link to="/journal">
                  <div className="button-nav">
                      Journal
                  </div>
                </Link> 
                <Link to="/">
                  <div className='button-nav' onClick={() => onLogout()}>
                      Logout
                  </div>
                </Link> 
            </Nav>

          </Navbar.Collapse>
      </Navbar>
    )
  }
  else {
    return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">

            <Navbar.Brand>
                <Link to="/">
                    <img className="logo" src={logo} alt="BeeFit logo"/>
                </Link>
            </Navbar.Brand>

            <Nav className="ms-auto">
                <Link>
                  <div className="button-nav" onClick={() => onUpdateTheme()}>
                      Theme
                  </div>
                </Link>
                <Link to="/settings">
                  <div className={activeLink === '/settings' ? 'active-button-nav' : 'button-nav'}>
                      Settings
                  </div>
                </Link>
                <Link to="/">
                  <div className='button-nav' onClick={() => onLogout()}>
                      Logout
                  </div>
                </Link> 
            </Nav>

          </Navbar.Collapse>
      </Navbar>
    )
  }
}
  
  // User not logged in
  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">

            <Navbar.Brand>
                <Link to="/">
                    <img className="logo" src={logo} alt="BeeFit logo"/>
                </Link>
            </Navbar.Brand>

            <Nav className="ms-auto">
                <Link>
                    <div className="button-nav" onClick={() => onUpdateTheme()}>
                        Theme
                    </div>
                </Link>
                <Link to="/register">
                    <div className={activeLink === '/register' ? 'active-button-nav' : 'button-nav'}>
                        Register
                    </div>
                </Link>
                <Link to="/login">
                  <div className={activeLink === '/login' ? 'active-button-nav' : 'button-nav'}>
                      Login
                  </div>
                </Link> 
            </Nav>

          </Navbar.Collapse>
      </Navbar>
  )
}
