import React from 'react';
/* Component */
import { PersonComponent } from '../PersonComponent';
/* Styles */
import './HomeScreen.css';

function HomeScreen(props) {
    return (
        <div>
            <PersonComponent></PersonComponent>
        </div>
    );
}

export default HomeScreen;