import React from 'react'

const SpinnerIcon = () => {
    const spinnerStyle = {
        margin: "auto" ,
        background: "none" ,
        display: "block" ,
        shapeRendering: "auto" 
    }
    return (
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" style={spinnerStyle} width="231px" height="151px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#93dbe9" strokeWidth="7" r="28" strokeDasharray="131.94689145077132 45.982297150257104" transform="rotate(201.962 50 50)">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.0416666666666665s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
        </circle>
        </svg>
    </div>
    )
}

export default SpinnerIcon
