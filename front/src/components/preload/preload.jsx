import React from 'react'
import Input from "@/components/Input/Input.jsx";

const preload = (props) => {
    const {className} = props
    return (
        <div className={className} >
            <div className="dot">
            </div>
            <div className="dot">
            </div>
            <div className="dot">
            </div>
            <div className="dot">
            </div>
            <div className="dot">
            </div>
        </div>
    );

};

preload.defaultProps = {
    className:"loader"
};


export default preload;