import React from 'react';

const Options = props => {



    if(props.show && props.options.length > 0){
    return (
        <div className="form__optionContainer">
        {
            props.options.map(option => {
                if(option.data.title){
                    return (<div className="form__option" key={option.data.id} id={option.data.url} onClick={props.fetch}>{option.data.title}</div>)
                }
            })
        }
        </div>
        );
    } else {
        return null
    }
}

export default Options;