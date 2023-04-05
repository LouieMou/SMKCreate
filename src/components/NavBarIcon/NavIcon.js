import React from 'react';
import "./Icon.css";

function NavIcon(props) {
    return (
        <div className='nav-icon-container'>
            <div className={props.img_container_style}>
            <img className='nav-icon-img' src={props.src} onClick={props.handleClick}></img>
            </div>
        </div>
    );
}

export default NavIcon;