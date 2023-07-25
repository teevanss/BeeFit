import { Container } from "react-bootstrap";
import { useContext, } from 'react';
import { ThemeContext } from '../ThemeContext';
import { UserMenu } from './UserMenu.js';
import '../css/userhomepage.css';
import 'animate.css';
import BeeExcited from "../images/bee-excited.svg";

export const UserHomepage = () => {

    const {theme, setTheme} = useContext(ThemeContext);

    return ( 

        <section className="user-home" id={theme === 'light' ? 'user-home' : 'user-home-dark'}> 
        <Container>

            <div className="animate__animated animate__zoomIn">
                <img className="bee-excited" src={BeeExcited} alt="A happy bee"/>
            </div>
    
            <UserMenu/>

        </Container>
        </section>
  )
}