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
    if (props.happiness >= 51 && props.happiness <= 99) {   
        setSrc(BeeHappy)
    } 
    else if (props.happiness <= 50 && props.happiness > 30){
        setSrc(BeeAngry)
    } 
    else if (props.happiness === 100){
        setSrc(BeeExcited)
    } 
    else if (props.happiness <= 30) {
        setSrc(BeeSad)
    } 
    else {
        setSrc(BeeExcited)
    }

  }, [props.happiness]);

  return (
    <img className="bee-home" alt="Bee" src={src} />
  );
}