import React, {useState} from 'react'

const Button = (props) => {

    const {type, textName, onClick,color, ...rest} = props;

    return (
        <button
            className={`btn py-3 px-4 w-full xl:w-32 xl:mr-3 align-top ${color}`}
            onClick={onClick}
        >
            {textName}
        </button>
    );
};

Button.defaultProps = {
    type: 'button',
    color:'btn-primary'
};

export default Button;
