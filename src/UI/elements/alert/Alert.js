import React from 'react';


const Alert = props => {
  
    //Alert displayed
    if(props.show){
        return (
            <div className="alert">
                <div className="alert__box">
                     <h1>{props.text}</h1>
                </div>
            </div>
            );
    } else {
        return null;
    }

}

export default Alert;