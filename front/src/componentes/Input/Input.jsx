import { forwardRef } from "react";

const Input = (props) => {
    const { type, value, className,Funcion, placeholder,id,required, funcion, ...rest } = props;



    return (
        <input

            type={type}
            className={ `${className}`}
            value={value}
            id={id}
            placeholder={placeholder}
            required={required}

        />
    );

};

Input.defaultProps = {
    type: 'text',
    className: 'form-control',
    placeholder:'Ingresa data',
    value:'-'
};
export default Input;
