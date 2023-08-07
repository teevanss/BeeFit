import { Container, Row, Col } from "react-bootstrap";
import { Pencil } from 'react-bootstrap-icons';
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserMenu } from './UserMenu.js';
import { ProgressBar } from './ProgressBar.js';
import { Bee } from './Bee.js';
import '../css/userhomepage.css';
import 'animate.css';

export const UserHomepage = () => {

    const {theme, setTheme} = useContext(ThemeContext);
    const [health, setHealth] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [happiness, setHappiness] = useState(0);

    // Stats must stay between 0-100
    const stayInRange = (stat) => {
        if (stat >= 0 && stat <= 100)
          return stat;
       else if (stat > 100)
          return 100;
      else
          return 0;
    }

    const petBee = () => {
        setHappiness((prev) => stayInRange(prev + 10));
    }

    const cleanBee = () => {
        setHealth((prev) => stayInRange(prev + 20));
    }
  
    const feedBee = () => {
        setHunger((prev) => stayInRange(prev + 20));
    }
  
    return ( 
        <section className="user-home-container" id={theme === 'light' ? 'user-home' : 'user-home-dark'}> 
            <Container>
                <Row>
                    
                    <Col xs={0} md={2} xl={2}>
                            <UserMenu/>
                    </Col>

                    <Col xs={12} md={10} xl={10}>
                        <ProgressBar value={happiness}/>
                        <button className="submit-button" style={{color: 'black', marginLeft: '0', }} onClick={petBee}>Pet <Pencil size={24} color="#5d5d5d" className="icon3"/> </button>

                        <ProgressBar value={health}/>
                        <button className="submit-button" style={{color: 'black', marginLeft: '0' }} onClick={cleanBee}>Clean <Pencil size={24} color="#5d5d5d" className="icon3"/> </button>

                        <ProgressBar value={hunger}/>
                        <button className="submit-button" style={{color: 'black', marginLeft: '0' }} onClick={feedBee}>Feed <Pencil size={24} color="#5d5d5d" className="icon3"/> </button>

                        <div className="animate__animated animate__zoomIn">
                            <Bee happiness={happiness}/>
                        </div>
                    </Col>

                </Row>
            </Container>
        </section>
  )
}