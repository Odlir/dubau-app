import React, {useState} from 'react';

function Accordion({items}) {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="w-full ">
            {items.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                    <button
                        className=" flex justify-between items-center w-full h-8 focus:outline-none"
                        onClick={() => handleClick(index)}
                    >
                        <span className="text-lg font-medium font-size-8px">{item.title}</span>
                        <svg
                            className={`w-5 h-5 transition-transform duration-200 transform ${
                                activeIndex === index ? 'rotate-180' : ''
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 6L10 10L14 6H6Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {activeIndex === index && (
                        <div className="p-4 font-size-8px">{item.content}</div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Accordion;