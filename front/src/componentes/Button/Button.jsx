import { forwardRef } from "react";


const Button = (props) => {
    const { type, titulo, className, inline, ...rest } = props;

    return (
        <button
            type={type}
            className={`${className} `}
            titulo={titulo}
        >
            {titulo}
        </button>
    );

};
Button.defaultProps = {
    type: 'button',
    className: 'btn btn-primary w-24 mr-1 mb-2',
    titulo:'botón'
};
export default Button;
