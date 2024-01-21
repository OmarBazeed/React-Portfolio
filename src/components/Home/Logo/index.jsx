import React from 'react';
import './logo.scss';
import GsapImg from '../../../assets/images/logo.png';

const Logo = () => {


    return (
        <React.Fragment>
            <div className='logo-container' >
                <img src={GsapImg} alt='gsap-img' className='solid-logo' height="400px" width="400px" />
            </div>
        </React.Fragment>
    )
}

export default Logo;