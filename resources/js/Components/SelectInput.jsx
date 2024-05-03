import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ className = '', isFocused = false, children, ...props }, ref) {
    const selectRef = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            selectRef.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={selectRef}
        >
            {children}
        </select>
    );
});
