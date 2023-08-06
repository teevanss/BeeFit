import { Container } from "react-bootstrap";
import { useContext, useState } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserMenu } from './UserMenu.js';
import { ProgressBar } from './ProgressBar.js';
import '../css/userhomepage.css';
import 'animate.css';
import BeeExcited from "../images/bee-excited.svg";

export const UserHomepage = () => {

    const {theme, setTheme} = useContext(ThemeContext);
    const [health, setHealth] = useState(50);
    const [hunger, setHunger] = useState(50);
    const [happiness, setHappiness] = useState(50);

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
        setHappiness((prev) => stayInRange(prev + 20));
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

            <ProgressBar value={happiness} />
            <button onClick={petBee}>Pet</button>

            <ProgressBar value={health} />
            <button onClick={cleanBee}>Clean</button>

            <ProgressBar value={hunger} />
            <button onClick={feedBee}>Feed</button>

            <div className="animate__animated animate__zoomIn">
                <img className="bee-excited" src={BeeExcited} alt="A happy bee"/>
            </div>
    
            <UserMenu/>

        </Container>
        </section>
  )
}