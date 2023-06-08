import React from 'react';

const preload = (props) => {
    const { className } = props;
    return (
        <div className={className}>
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
        </div>
    );
};

preload.defaultProps = {
    className: 'loader',
};

export default preload;
