import React, {useState} from 'react'

const Input = (props) => {
    const { dataType, dataName,dataId, dataValue, dataOnchange, dataPlaceholder, className} = props

    return (
        <input type={dataType} name={dataName} id={dataId}
               className={className}
               value={dataValue}
               onChange={ (e)=> dataOnchange(e.target.value)}
               placeholder={dataPlaceholder}
               required=""/>
    );
};

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    className: 'intro-x login__input form-control py-3 px-4 block'
};

export default Input ;
