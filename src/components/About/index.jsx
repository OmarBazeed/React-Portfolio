import React , {useEffect, useState} from 'react';
import './about.scss';
import AnimatedLetters from '../AnimattedLetters';
import Any from '../../assets/images/WORK.png'
const About = ()=>{

    const [letterClass , setLetterClass] = useState('text-animate');
    const titleArray = ['A' , 'b', 'o' ,'u', 't' , ' ' , 'M' , 'e'];

    useEffect(()=>{
        setTimeout(()=>{
            setLetterClass('')
        },3000)
    },[])

    return(
    <React.Fragment>
        <div className='AboutPage'>
            <div className='about-content'>
                <h1 data-after="&lt;h1&gt;" data-before='&lt;/h1&gt;'>
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={15}  />
                </h1>
                
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita deleniti quo porro beatae exercitationem quaerat reprehenderit debitis impedit fuga, ab odit vero, laborum ipsum? Eligendi labore alias corporis optio illo!</p>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita deleniti quo porro beatae exercitationem quaerat reprehenderit debitis impedit fuga, ab odit vero, laborum ipsum? Eligendi labore alias corporis optio illo!</p>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita deleniti quo porro beatae exercitationem quaerat reprehenderit debitis impedit fuga, ab odit vero, laborum ipsum? Eligendi labore alias corporis optio illo!</p>

            </div>

            <div className='about-skills'>
                <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita deleniti quo porro beatae exercitationem quaerat reprehenderit debitis impedit fuga, ab odit vero, laborum ipsum? Eligendi labore alias corporis optio illo!</p>
            </div>
        </div>
    </React.Fragment>
    )
}

export default About;