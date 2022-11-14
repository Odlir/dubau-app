// import { forwardRef } from "react";

// const Input = (props) => {
//     const { type, value, className,Funcion, placeholder,id,required, funcion, ...rest } = props;
//     const [emailId, setEmailId] = useState('');
//     const [platform, setPlatform] = useState('');
    


//     return (
//         <input

//             type={type}
//             className={ `${className}`}
//             value={value}
//             id={id}
//             placeholder={placeholder}
//             required={required}

//         />
//     );

// };

// Input.defaultProps = {
//     type: 'text',
//     className: 'form-control',
//     placeholder:'Ingresa data',
//     value:'-'
// };
// export default Input;

import React  from "react";

const Input = ({ value,  name, placeholder, type, onChange }) => (
  <div className="form-group">
    <input
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export default Input;