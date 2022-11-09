const Button = (props) => {
    const { type, children, className, inline, ...rest } = props;

    return (

        <button
            className={`
      inline-flex
      items-center
      rounded-md
      px-4
      py-3
      text-center
      font-normal
      leading-tight
      duration-300
      hover:transition-colors
      ${!inline && 'w-full'}
      ${className}
    `}
            {...rest}
        >
            {children}
        </button>
    );
};

Button.defaultProps = {
    type: 'primary',
    children: null,
    className: '',
    inline: false
};

export default Button ;
