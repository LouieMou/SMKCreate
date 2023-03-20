import React from 'react';
/* Components */
import FilterFrame from '../components/FilterComponent/FilterFrame';
/* Functions */
import {setBackgroundColor} from '../functions/background'
/* Styles */
import './SearchScreen.css';

function SearchScreen(props) {

    const yellow = getComputedStyle(document.documentElement).getPropertyValue('--secondary-yellow')
    setBackgroundColor(yellow);
    return (
        <>
        <div className='screen-container'>
            <FilterFrame></FilterFrame>
        </div>
        </>
    );
}

export default SearchScreen;