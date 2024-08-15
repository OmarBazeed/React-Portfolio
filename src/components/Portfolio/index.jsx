import React, { useEffect, useState } from 'react'
import './portfolio.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css/bundle'

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper'
import AnimatedLetters from '../AnimattedLetters'
import Loader from 'react-loaders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const Portfolio = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const titleArray = [
    'M',
    'Y',
    ' ',
    'P',
    'o',
    'r',
    't',
    'f',
    'o',
    'l',
    'i',
    'o',
  ]

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  return (
    <React.Fragment>
      <div className="PortfolioPage">
        <div className="Portfolio-content">
          <h1 data-after="&lt;h1&gt;" data-before="&lt;/h1&gt;">
            <AnimatedLetters
              letterClass={letterClass}
              strArray={titleArray}
              idx={15}
            />
          </h1>

          <p>
            Here Are Some Projects Built With React , React-Redux , Javascript
            With Different Libraries Also You Can Go And See More In My Github
            Link
            <a
              href="https://github.com/OmarBazeed"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: 'none',
                color: '#e7d927',
                fontWeight: 'bold',
                paddingLeft: '5px',
              }}
            >
              GitHub
            </a>
          </p>
        </div>

        <div id="app">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            // autoplay={{
            //   delay: 4000,
            //   disableOnInteraction: false,
            // }}
            direction={'vertical'}
            pagination={{
              clickable: true,
            }}
            className="mySwiper"
            modules={[Autoplay, Pagination, Navigation]}
          >
            <SwiperSlide>
              <div>
                <p>Real Estate App With Nextjs And Rapid API</p>
                <button>
                  <a
                    href="https://ob-real-estate-nextjs-api.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/Real-Estate-App-Nextjs-API"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <p>
                  Dashboard Project Built With React And Syncfusion <br /> Go A
                  Head And Take A Look !
                </p>
                <button>
                  <a
                    href="https://ob-dashboard-syncfusion-rect.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/Dashboard-Syncfusion-React"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Youtube Clone App With React And Rapid API <br /> Go A Head
                  And Take A Look !
                </p>
                <button>
                  <a
                    href="https://ob-youtube-clone-react.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/Youtube-Clone-React"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Full-Stack Disney Clone App With React,Firebase and Redux
                  Sutiable For All Devices <br /> Go A Head And Take A Look !
                </p>
                <button>
                  <a
                    href="https://ob-disney-clone-firebase.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/Disney-Clone-React-Firebase"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <p>
                  E-Commerce App With React , Authentication and Fully
                  Responsive <br /> Go A Head And Take A Look !
                </p>
                <button>
                  <a
                    href="https://ob-e-commerce-redux-toolkit.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/E-Commerce-Redux-Toolkit"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Food Mangement App Built With React(vite) And Bootstarp <br />{' '}
                  Go A Head And Take A Look !
                </p>
                <button>
                  <a
                    href="https://food-app-mangement.netlify.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/food-app-react"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Project Mangement Sysytem Built In Typescript(vite) and
                  Bootstarp <br /> Go A Head And Take A Look !
                </p>
                <button>
                  <a
                    href="https://project-mange-sys.netlify.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/project-mangement-system"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Type Speed Game Built With Vanilla Javascript <br /> Go A Head
                  And Take A Look !
                </p>
                <button>
                  <a
                    href="https://omarbazeed.github.io/Typing-Speed-Test-Game-Vanilla-Javascript/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/Typing-Speed-Test-Game-Vanilla-Javascript"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Responsive And Interactive Templete With Javascript <br /> Go
                  A Head And Take A Look !
                </p>
                <button>
                  <a
                    href="https://omarbazeed.github.io/-Templete-Using-Html-Css-Javascript/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/-Templete-Using-Html-Css-Javascript"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Tetris Game With React <br /> Go And Start A New Game !
                </p>
                <button>
                  <a
                    href="https://ob-react-tetris-game.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/React-Tetris-Game-Div"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Fitness Gym With React And Typescript <br /> Go And Book Now !
                </p>
                <button>
                  <a
                    href="https://ob-gym-typescript-react.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/Finess-App-Typescript-React"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>Full-Stack-Food-Delivery-App-React-Firebase</p>
                <button>
                  <a
                    href="https://ob-delivery-food-app-context-firebase.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/Full-Stack-Food-Delivery-App-React-Firebase"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div>
                <p>
                  Full Stack Amazon Clone Using React , Firebase And Stripe
                  <br /> Go A Head And Take A Look !
                </p>
                <button>
                  <a
                    href="https://ob-full-stack-amazon-clone.onrender.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                </button>
                <button>
                  <a
                    href="https://github.com/OmarBazeed/Full-Stack-Amazon-Clone"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithub} /> Code
                  </a>
                </button>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <Loader type="cube-transition" />
    </React.Fragment>
  )
}
export default Portfolio
