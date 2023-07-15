import { ArrowRightCircle } from 'react-bootstrap-icons';
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { MyContext } from '../MyContext';
import '../css/userhomepage.css';
import 'animate.css';
import BeeExcited from "../images/bee-excited.svg";

export const UserHomepage = () => {

    const {theme, setTheme} = useContext(MyContext);

    return ( 

        <section className="user-home" id={theme === 'light' ? 'user-home' : 'user-home-dark'}>
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