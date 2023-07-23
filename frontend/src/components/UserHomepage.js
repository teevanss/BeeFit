import { Container, Row, Modal, Button } from "react-bootstrap";
import { Pencil } from 'react-bootstrap-icons';
import { useContext, useState } from 'react';
import { MyContext } from '../MyContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../AxiosCheckin";
import '../css/userhomepage.css';
import 'animate.css';
import BeeExcited from "../images/bee-excited.svg";
const USERHOMEPAGE_URL = "/home/:id";

export const UserHomepage = () => {

    const {theme, setTheme} = useContext(MyContext);
    const [show, setShow] = useState(false);
    const [weight, setWeight] = useState("");
    const [user, setUser] = useState("");
    const [success, setSuccess] = useState("false");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Handle check-in submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUser(JSON.parse(localStorage.getItem("user")));
    
        // Send POST request
        try {
            const response = await axios.post(
            USERHOMEPAGE_URL,
            {
                username: user,
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
            setUser("");
    
            // Successful POST request
            // Set success to true, so that we can redirect the user.
            setSuccess("true");
            toast.success("You have logged in successfully! We are so happy to see you!",  {
                position: "top-left",
                autoClose: 5000,
                theme: theme,
                });
            
        // Error handling, can only check after POST request (POST request failed)
        } catch (err) {
            if (!err?.response) {
                toast.error("No server response. We are so sorry!", {
                    position: "top-left",
                    autoClose: 5000,
                    theme: theme,
                    });
            } else {
                toast.error("Error logging in. Invalid username or password.", {
                    position: "top-left",
                    autoClose: 5000,
                    theme: theme,
                    });
            }
        }
        };

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
                            <input type="number" placeholder="Enter Weight" name="uweight" value={weight} onChange={(e) => setWeight(e.target.value)} id="weight" required className="textBox"></input>
                        </div>

                    </div>
                </form>

                <div className="footerDiv">
                    <button type="submit" className="submit-button" onClick={handleSubmit} style={{color: 'black' }}>Submit &#10004;</button>
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