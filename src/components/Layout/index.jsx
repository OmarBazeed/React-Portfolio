import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './layout.scss';

const Layout = () => {
return (
    <div className='mainLayout'>

        <Sidebar /> 

        <div className='tags'>

            <span> &lt;body&gt; </span>
            <br />

            <Outlet /> 
            
            <br />

            <span>&lt;/body&gt;</span>
            <br />
            <span>&lt;/html&gt;</span>
        
        </div>

    
    </div>
)
}

export default Layout;