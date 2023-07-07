import { ArrowRightCircle } from 'react-bootstrap-icons';
import { Container, Row, Col } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import '../css/homepage.css';
import '../App.css';
import 'animate.css';
import BeeFlower from "../images/bee-flower.svg";
import Daisy from "../images/daisy.png";
import Daisy2 from "../images/daisy2.png";
import Daisy3 from "../images/daisy3.png";

export const Homepage = () => {

  return ( 

    <section className="home" id="home">
      <Container>
        <Row className="align-items-center">

        {/* One full-width column, one half-width column, one 7/12 column */}
          <Col xs={15} md={8} xl={7}>

              <div className="animate__animated animate__fadeIn">
                <h1>Welcome to B<a>ee</a>Fit!</h1>
                <p>Buzz! Daily self care is finally fun - take care of your pet by taking care of yourself!</p>
                <Nav>
                    <Nav.Link href="#Register"><button>Get started <ArrowRightCircle size={25} /></button></Nav.Link>
                </Nav>
              </div>

          </Col>
          <Col xs={10} md={5} xl={5}>

                <div className="animate__animated animate__zoomIn">
                  <img className="bee" src={BeeFlower} alt="Bee holding flower"/>
                </div>

          </Col>
        </Row>
      </Container>

      <div className="daisy">
            <img src={Daisy} alt="Daisy"/>
        </div>
        <div className="daisy2">
            <img src={Daisy2} alt="Daisy"/>
        </div>
        <div className="daisy3">
            <img src={Daisy3} alt="Daisy"/>
        </div>
        
    </section>
  )
}