import React , {useEffect, useState} from 'react';
import AnimatedLetters from '../AnimattedLetters';
import './skills.scss';
import Words from './React-3D-Sphere'
import Loader from 'react-loaders';


const Skills = ()=>{

    const [letterClass , setLetterClass] = useState('text-animate');
    const titleArray = ['M' , 'y', ' ' ,'S', 'k' , 'i' , 'l' , 'l' , 's' ,' ' ,',' ,' ', 'E' , 'x' , 'p' , 'r' , 'i' , 'e' , 'n','c','e'];

    useEffect(()=>{
        setTimeout(()=>{
            setLetterClass('text-animate-hover')
        },3000)
    },[])

    return(
    <React.Fragment>

        <div className='SkillsPage'>

            <div className='Skills-content'>
                <h1 data-after="&lt;h1&gt;" data-before='&lt;/h1&gt;'>
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={8}  />
                </h1>
                <p>
                I Studed Web Development Track So I gained some Skills Like Html , Css , JavaScript and react  <br /> Also I Studed Graphic Design Track So I can use Photoshop , illustator and In design Besides Some Skills In Digital Merketing
                </p>
            </div>

            <div className="tree">
                <Words  />
            </div>

        </div>  

        <Loader type="pacman" />

        </React.Fragment>
    )
}

export default Skills;