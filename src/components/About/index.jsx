import React , {useEffect, useState} from 'react';
import { faCss3,  faGitAlt, faHtml5, faJs, faReact, faSass } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimatedLetters from '../AnimattedLetters';
import './about.scss';
import Loader from 'react-loaders';


const About = ()=>{

    const [letterClass , setLetterClass] = useState('text-animate');
    const titleArray = ['A' , 'b', 'o' ,'u', 't' , ' ' , 'M' , 'e'];

    useEffect(()=>{
        setTimeout(()=>{
            setLetterClass('text-animate-hover')
        },3000)
    },[])

    return(
    <React.Fragment>

        <div className='AboutPage'>

            <div className='about-content'>
                <h1 data-after="&lt;h1&gt;" data-before='&lt;/h1&gt;'>
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={15}  />
                </h1>
                
                <p> i'm very ambitious front-end developer looking for a role in established IT company with the oppertunity to work with the lastest technologies on challenging and diverse projects </p>
                <p> i'm quietly confident , naturally curious and perprtually working on improving my chops one design problem at a time </p>
                <p> If I need to define myself in one sentence that would be a family person , i like graphic desining also i can do digital markrting ... </p>

            </div>

            <div className='about-skills'>
                <div className='cube-spinner'>
                    <div className='face1'>
                        <FontAwesomeIcon icon={faReact} color='#5ED4F4' />
                    </div>
                    <div className='face2'>
                        <FontAwesomeIcon icon={faHtml5} color='#F06529' />
                    </div>
                    <div className='face3'>
                        <FontAwesomeIcon icon={faCss3} color='#28A4D9' />
                    </div>
                    <div className='face4'>
                        <FontAwesomeIcon icon={faGitAlt} color='#EC4' />
                    </div>
                    <div className='face5'>
                        <FontAwesomeIcon icon={faSass} color='#DD0031' />
                    </div>
                    <div className='face6'>
                        <FontAwesomeIcon icon={faJs} color='#EFD81D' />
                    </div>
                </div>
            </div>

        </div>

        <Loader type='pacman' />
        
    </React.Fragment>
    )
}

export default About;