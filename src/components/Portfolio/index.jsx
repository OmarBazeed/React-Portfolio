import React, { useEffect, useState } from "react";
import './portfolio.scss';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
// import required modules
import { EffectCards } from "swiper";
import AnimatedLetters from "../AnimattedLetters";
import Loader from "react-loaders";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";


 const Portfolio= ()=> {

    const [letterClass , setLetterClass] = useState('text-animate');
    const titleArray = ['M','Y',' ','P','o','r','t','f','o','l','i','o'];


    useEffect(()=>{
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000);
    },[])

return (
    <React.Fragment>

    <div className="PortfolioPage">


        <div className="Portfolio-content">
            <h1 data-after="&lt;h1&gt;" data-before='&lt;/h1&gt;'>
            <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={15}  />
            </h1>
        
            <p> Here Are Some Projects Built With React , React-Redux , Javascript With Different Libraries Also You Can Go And See More In My Github Link <a href="https://github.com/OmarBazeed" target='_blank' rel="noreferrer" style={{textDecoration:'none',color:'#e7d927',fontWeight:'bold'}}> GitHub </a>  </p>
        </div>

        <div id='app'> 
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                <SwiperSlide>
                <div> <p>Dashboard Project Built With React And Syncfusion <br /> Go A Head And Take A Look !</p><button><a href='https://ob-dashboard-syncfusion-rect.onrender.com' target='_blank' rel='noreferrer'>Demo <FontAwesomeIcon icon={faArrowRight} /> </a> </button></div>
                </SwiperSlide>

                <SwiperSlide>
                <div><p>Youtube Clone App With React And Rapid API <br /> Go A Head And Take A Look !</p><button><a href='https://ob-youtube-clone-react.onrender.com' target='_blank' rel='noreferrer'>Demo <FontAwesomeIcon icon={faArrowRight} /> </a> </button></div>
                </SwiperSlide>

                <SwiperSlide>
                <div><p>E-Commerce App With React , Authentication and Fully Responsive   <br /> Go A Head And Take A Look !</p><button><a href='https://ob-e-commerce-redux-toolkit.onrender.com' target='_blank' rel='noreferrer'>Demo <FontAwesomeIcon icon={faArrowRight} /> </a> </button></div>
                </SwiperSlide>

                <SwiperSlide>
                <div><p>Watch App List With React Sutiable For All Devices <br /> Go A Head And Take A Look !</p><button><a href='https://ob-watchlist-context-api.onrender.com' target='_blank' rel='noreferrer'>Demo <FontAwesomeIcon icon={faArrowRight} /> </a> </button></div>
                </SwiperSlide>

                <SwiperSlide>
                <div><p>Reminder App Built With React And DatePicker <br /> Go A Head And Take A Look !</p><button><a href='https://ob-reminder-react-redux-old-way.onrender.com' target='_blank' rel='noreferrer'>Demo <FontAwesomeIcon icon={faArrowRight} /> </a> </button></div>
                </SwiperSlide>

                <SwiperSlide>
                <div><p>Crud App With React , Fully Responsive <br /> Go A Head And Take A Look !</p><button><a href='https://ob-crud-app-react.onrender.com' target='_blank' rel='noreferrer'>Demo <FontAwesomeIcon icon={faArrowRight} /> </a> </button></div>
                </SwiperSlide>

                <SwiperSlide>
                <div><p>Type Speed Game Built With Vanilla Javascript <br /> Go A Head And Take A Look !</p><button><a href='https://omarbazeed.github.io/Typing-Speed-Test-Game-Vanilla-Javascript/' target='_blank' rel='noreferrer'>Demo <FontAwesomeIcon icon={faArrowRight} /> </a> </button></div>
                </SwiperSlide>

                <SwiperSlide>
                <div><p> Responsive And Interactive Templete With Javascript  <br /> Go A Head And Take A Look !</p><button><a href='https://omarbazeed.github.io/-Templete-Using-Html-Css-Javascript/' target='_blank' rel='noreferrer'>Demo <FontAwesomeIcon icon={faArrowRight} /> </a> </button></div>
                </SwiperSlide>

                
            </Swiper>
        </div>

    </div>

    <Loader type='cube-transition' />
    </React.Fragment>
);
}
export default Portfolio;