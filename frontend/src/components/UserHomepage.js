import { Container, Row, Col } from "react-bootstrap";
import { DropletFill, HeartFill, BrushFill } from 'react-bootstrap-icons';
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserMenu } from './UserMenu.js';
import { ProgressBar } from './ProgressBar.js';
import { Bee } from './Bee.js';
import '../css/userhomepage.css';
import 'animate.css';

export const UserHomepage = () => {

    const {theme, setTheme} = useContext(ThemeContext);
    const [health, setHealth] = useState(0);
    const [hunger, setHunger] = useState(0);
    const [happiness, setHappiness] = useState(0);

    // Stats must stay in range 0-100
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
        setHealth((prev) => stayInRange(prev + 10));
    }
  
    const feedBee = () => {
        setHunger((prev) => stayInRange(prev + 10));
    }
  
    return ( 
        <section className="user-home-container" id={theme === 'light' ? 'user-home' : 'user-home-dark'}> 
            <Container>
                <Row>
                    
                    <Col xs={0} md={2} xl={2}>
                        <UserMenu/>
                    </Col>

                    <Col xs={12} md={10} xl={10}>
                        <ProgressBar value={happiness} style={{borderRadius: '5rem', height: '1.5rem'}}/>
                        <button className="action-button" style={{color: 'black', marginLeft: '0'}} onClick={petBee}> &nbsp; Pet <HeartFill size={24} color="black" className="icon3"/> </button>

                        <ProgressBar value={health} style={{borderRadius: '5rem', height: '1.5rem'}}/>
                        <button className="action-button" style={{color: 'black', marginLeft: '0'}} onClick={cleanBee}> &nbsp; Clean <BrushFill size={24} color="black" className="icon3"/> </button>

                        <ProgressBar value={hunger} style={{borderRadius: '5rem', height: '1.5rem'}}/>
                        <button className="action-button" style={{color: 'black', marginLeft: '0'}} onClick={feedBee}> &nbsp; Feed <DropletFill size={24} color="black" className="icon3"/> </button>

                        <div className="animate__animated animate__zoomIn">
                            <Bee happiness={happiness} hunger={hunger} health={health}/>
                        </div>
                    </Col>

                </Row>
            </Container>
        </section>
  )
}