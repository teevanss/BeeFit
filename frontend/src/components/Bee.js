import React, {useState, useEffect} from 'react';
import BeeExcited from "../images/bee-excited.svg";
import BeeAngry from "../images/bee-angry.svg";
import BeeHappy from "../images/bee-happy.svg";
import BeeSad from "../images/bee-sad.svg";

export const Bee = (props) => {
  const [src, setSrc] = useState(BeeExcited);

  useEffect(() => {

    // Preloading character assets
    const imageList = [BeeExcited, BeeHappy, BeeAngry]
        imageList.forEach((image) => {
            new Image().src = image
        });
    }, []);

  useEffect(() => {
    if (((props.happiness === 100) && (props.hunger === 100) && (props.health === 100))) {
        setSrc(BeeExcited)
    } 
    else if (((props.happiness <= 30) || (props.hunger <= 30) || (props.health <= 30))) {
        setSrc(BeeSad)
    } 
    else if ((((props.happiness <= 50) && (props.happiness > 30)) || ((props.hunger <= 50) && (props.hunger > 30)) || ((props.health <= 50) && (props.health > 30)))) {
        setSrc(BeeAngry)
    } 
    else if ((((props.happiness >= 51) && (props.happiness <= 99)) || ((props.hunger >= 51) && (props.hunger <= 99)) || ((props.health >= 51) && (props.health <= 99)))) {   
        setSrc(BeeHappy)
    } 
    else {
        setSrc(BeeExcited)
    }

  }, [props.happiness, props.hunger, props.health]);

  return (
    <img className="bee-home" alt="Bee" src={src} />
  );
}