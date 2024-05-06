import React from 'react'
import './logo.scss'
import GsapImg from '../../../assets/images/profilePic.png'

const Logo = () => {
  return (
    <React.Fragment>
      <div className="logo-container">
        <img
          src={GsapImg}
          alt="gsap-img"
          className="solid-logo"
          height="150%"
          width="150%"
        />
      </div>
    </React.Fragment>
  )
}

export default Logo
