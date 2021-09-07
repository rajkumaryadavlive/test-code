import React, {useState, useRef}  from "react";
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    const sliderImage = [
      {
        id: 0,
        src: "assets/home1.jpg",
      },
      {
        id: 1,
        src: "assets/home1.jpg",
      },
      {
        id: 2,
        src: "assets/home2.jpg",
      },
      {
        id: 3,
        src: "assets/home3.jpg",
      },
      {
        id: 4,
        src: "assets/home4.jpg",
      },
      {
        id: 5,
        src: "assets/home5.jpg",
      },
    ]
    
    const [slider, setSlider] = useState(sliderImage[0]);

    const slideChange = (move) => {
      let id = slider.id;
      if (move === "left") {
        setSlider(id === 0 ? sliderImage[5] : sliderImage[id-1])
      }
      else {
        setSlider(id === 5 ? sliderImage[0] : sliderImage[id+1])
      }
     
    };

    const textRef = useRef();

    

    return (
      <div className="home"  style={{backgroundImage: `url("${slider.src}")`}}>
        
        <h3><Link to="/booking"><span ref={textRef} /></Link></h3>
        <img
        src="assets/arrow.png"
        className="arrow left"
        alt=""
        onClick={() => slideChange("left")}
      />
      <img
        src="assets/arrow.png"
        className="arrow right"
        alt=""
        onClick={() => slideChange()}
      />
      </div>
    );
}

export default Home;
