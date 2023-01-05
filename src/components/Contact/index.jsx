import React , {useEffect, useRef, useState} from 'react';
import AnimatedLetters from '../AnimattedLetters';
import './contact.scss';
import Loader from 'react-loaders';
import emailjs from '@emailjs/browser';
import { MapContainer, Popup, TileLayer ,Marker } from 'react-leaflet';
import swal from 'sweetalert';



const Contact = ()=>{

    const [letterClass , setLetterClass] = useState('text-animate');
    const titleArray = ['A' , 'b', 'o' ,'u', 't' , ' ' , 'M' , 'e'];
    const formRef = useRef();
    const position = [44.93366, 19.61045]

    const sendEmail = (e)=>{

        e.preventDefault();

        emailjs.sendForm('service_ecoi1n8', 'template_tmyjh6i', formRef.current, 'Ez59NvKjrYkPfiRTR')
        .then(() => {
            swal("Good job!", "Your Mail Sent Succssfully!", "success");
            setTimeout(()=>{
                window.location.reload();
            },5000)
        }, (err) => {
            console.log(`Email Error And The Error Is ${err}`);
            window.location.reload();
        });
        
    }

    useEffect(()=>{
        setTimeout(()=>{
            setLetterClass('text-animate-hover')
        },3000)
    },[])

    return(
<React.Fragment>

    <div className='ContactPage'>
        <div className='Contact-content'>

            <div className='first'>
                <h1 data-after="&lt;h1&gt;" data-before='&lt;/h1&gt;'>
                    <AnimatedLetters letterClass={letterClass} strArray={titleArray} idx={15}  />
                </h1>
                
                <p> i'm intersted in freelance oppertunities - especially ambitious or large projects . However , if you have other request or question , don't hesitate to contact me using below form either . </p>
            </div>
            <div className='form-div'>
                <form onSubmit={sendEmail} ref={formRef} >
                    <input type='text' placeholder='Name' name='from_name' required />
                    <input type='email' placeholder='E-mail' required />
                    <input type='text' placeholder='Subject' required />
                    <textarea placeholder='Enter your message' name='message' required />
                    <input type='submit'  value='send'/>
                </form>
            </div>
            
        </div>
        
        <div className='map-div'>

            <div className='info'>
                Omar Bazeed , +0201095851070  <br />
                Mansourah , Dakhliaha , Egypt <br />
                <span><a href='https://mail.google.com/mail/u/0/?hl=ar#inbox' target='_blank' rel='noreferrer'>omarbazeed@gmail.com</a> </span>
            </div>

            <div className='the-map'>
                <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <Marker position={position}>
                            <Popup>
                            unfortunately, need to pay to get my right location So I live In Mansoura Search For It , Come To Have Some Coffee !!
                            </Popup>
                        </Marker>
                </MapContainer>
            </div>
        
        </div>
    </div>

        <Loader type='ball-clip-rotate-multiple' />
            
</React.Fragment>
    )
}

export default  Contact;