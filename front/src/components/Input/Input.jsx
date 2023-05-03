import React from 'react';

function Input(props) {
    const {dataType, dataName, dataId, dataValue, dataOnchange, dataPlaceholder, className, dataCoin} = props;

    return (
        <input type={dataType} name={dataName} id={dataId} data-coin={dataCoin}
               className={className}
               value={dataValue}
               onChange={(e) => dataOnchange(e.target.value)}
               placeholder={dataPlaceholder}
               required=""/>
    );
}

Input.defaultProps = {
    type: 'text',
    placeholder: '',
    className: 'intro-x login__input form-control py-3 px-4 block',
    dataCoin: ''
};

export default Input;
