import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Developer from '../../assets/images/WORK.png';
import './home.scss';
import AnimatedLetters from '../AnimattedLetters';

const Home = ()=>{

    const [letterClass , setLetterClass] = useState('text-animate');
    const nameArray = [' ','O' , 'm', 'a' , 'r', ' ', 'B' , 'a', 'z', 'e', 'e', 'd'];
    const jobArray = ['W' , 'e', 'b' ,' ', 'D', 'e' , 'v', 'e', 'l', 'o','p', 'e','r' ,'.'];

    useEffect(()=>{
            setTimeout(()=>{
            setLetterClass('text-animate-hover')
        }, 4000) 
    },[])
    
    return(
        <React.Fragment>
            <div className='mainHome'>

                <div className='content'>
                    <h1 data-after="&lt;h1&gt;" data-before='&lt;/h1&gt;'>
                        <span className={`${letterClass} _20`}>H</span> 
                        <span className={`${letterClass} _20`}>i,</span> 
                        <br /> <br />

                        <span className={`${letterClass} _20`}>I</span> 
                        <span className={`${letterClass} _20`}>'m</span>  <img src={Developer} alt="developer" />  
                        <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15}  /> <br /> <br />
                        <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={22}  />
                    </h1>
                    
                    <p>Frontend Developer | Graphic Desinger | Digital Marketing Speciallest </p>

                    <Link to='/contact'>
                        <button> Contact Me</button>
                    </Link> 
                </div>

            </div>
        </React.Fragment>
    )
}

export default Home;