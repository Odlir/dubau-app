import React, {useState} from 'react'

const Input = (props) => {
    const { dataType, dataName,dataId, dataValue, dataOnchange, dataPlaceholder} = props

    return (
        <input type={dataType} name={dataName} id={dataId}
               className="intro-x login__input form-control py-3 px-4 block"
               value={dataValue}
               onChange={ (e)=> dataOnchange(e.target.value)}
               placeholder={dataPlaceholder}
               required=""/>
    );
};

Input.defaultProps = {
    type: 'text',
    placeholder: ''
};

export default Input ;
