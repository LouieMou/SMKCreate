import React from 'react';
import LabelButton from './LabelButton';
import './FilterFrame.css';
import '../index.css';

function FilterFrame(props) {
    return (
        <div className='filter-frame-container'>
            <h1>Fruit</h1>
                <LabelButton>banana</LabelButton>
                <LabelButton>orange</LabelButton>
                <LabelButton>apple</LabelButton>
                <LabelButton>all categories</LabelButton>
        </div>
    );
}

export default FilterFrame;