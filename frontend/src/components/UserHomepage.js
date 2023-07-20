import { Container, Row, Modal, Button } from "react-bootstrap";
import { Pencil } from 'react-bootstrap-icons';
import { useContext, useState } from 'react';
import { MyContext } from '../MyContext';
import '../css/userhomepage.css';
import 'animate.css';
import BeeExcited from "../images/bee-excited.svg";

export const UserHomepage = () => {

    const {theme, setTheme} = useContext(MyContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( 

        <section className="user-home" id={theme === 'light' ? 'user-home' : 'user-home-dark'}>
          
        <div className="d-flex align-items-center justify-content-center">
            <Button variant="primary" onClick={handleShow}>
            Launch Form modal
            </Button>
        </div>

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
                            <input type="number" placeholder="Enter Weight" name="uname" required className="textBox"></input>
                        </div>

                    </div>
                </form>

                <div className="footerDiv">
                    <button type="submit" className="submit-button" onClick={handleClose} style={{color: 'black' }}>Submit &#10004;</button>
                    <button type="cancel" className="submit-button" onClick={handleClose} style={{color: 'black', backgroundColor: "transparent"}}>Cancel &#10006;</button>
                </div>
        </Modal>
        
        <Container>

            <Row className="align-items-center">

            {/* One full-width column, one 8/12 column, one half-width column */}
            {/* <Col xs={14} md={8} xl={6}>
                <div className="animate__animated animate__fadeIn">
                    <h1>Welcome to B<a>ee</a>Fit!</h1>
                    <p>Buzz! Daily self care is finally fun - take care of your pet by taking care of yourself!</p>
                    <Link to ="/register"><button>Get started <ArrowRightCircle size={25} /></button></Link>
                </div>
    </Col> */}

                <div className="animate__animated animate__zoomIn">
                <img className="bee-excited" src={BeeExcited} alt="A happy bee"/>
                </div>
            
            </Row>
        </Container>
        </section>
  )
}