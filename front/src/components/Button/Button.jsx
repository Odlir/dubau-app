import React, {useState} from 'react'
const Button = (props) => {
/*
    const { type, children, className, inline, ...rest } = props;
*/

    return (
        <button type="submit"
                className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
            Login
        </button>
    );
};

/*Button.defaultProps = {
    type: 'primary',
    children: null,
    className: '',
    inline: false
};*/

export default Button ;
