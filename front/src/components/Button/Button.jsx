import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
    const { type, textName, onClick, color, ...rest } = props;

    return (
        <button
            {...rest}
            type={type}
            className={`btn py-3 px-4 w-full xl:w-32 xl:mr-3 align-top ${color}`}
            onClick={onClick}
        >
            {textName}
        </button>
    );
}

Button.defaultProps = {
    type: 'button',
    color: 'btn-primary',
};

Button.propTypes = {
    type: PropTypes.string,
    textName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string,
};

export default Button;
