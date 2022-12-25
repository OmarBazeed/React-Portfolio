import React from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.scss';
import Logo1 from '../../assets/images/WORK.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faEnvelope, faHomeAlt, faPhotoFilm, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


const Sidebar = () => {
  return (
    <React.Fragment>

      <section  className='sidebar'>

        <NavLink to='/' className='sidebar-logo'>
        <img src={Logo1} alt='logo1' className='logo1' />
        <h3> Omar Bazeed</h3>
        </NavLink>
        
        <ul className='sidebar-navi'>
          <NavLink to='/' data-content='Home'> <FontAwesomeIcon icon={faHomeAlt} /> </NavLink>
          <NavLink to='/about' data-content='About'> <FontAwesomeIcon icon={faUserAlt} /> </NavLink>
          <NavLink to='/skills' data-content='Skills'> <FontAwesomeIcon icon={faBrain} /> </NavLink>
          <NavLink to='/portfolio' data-content='Portfolio'> <FontAwesomeIcon icon={faPhotoFilm} /> </NavLink>
          <NavLink to='/contact' data-content='Contact'> <FontAwesomeIcon icon={faEnvelope} /> </NavLink>
        </ul>

        <ul className='connect'>
        <li> 
          <a href='https://github.com/OmarBazeed' target='_blank' rel='noreferrer' > 
          <FontAwesomeIcon icon={faGithubAlt} />
          </a> 
        </li>
        <li> 
          <a href='https://www.linkedin.com/in/omar-bazeed-516437246/'  target='_blank' rel='noreferrer'>
          <FontAwesomeIcon icon={faLinkedinIn} /></a> 
        </li>
        </ul>

      </section>
    
    </React.Fragment>
  )
}

export default Sidebar