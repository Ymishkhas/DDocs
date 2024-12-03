import { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../styles/SelectButton.css';

const SelectButton = ({ icon, text, options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleDropdown = (event) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // const handleOptionOnClick = (event, onClick) => {
    //     event.stopPropagation();
    //     onClick();
    // }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const dropdown = (
        <ul className="select-button-options" ref={dropdownRef} style={{ top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY, left: buttonRef.current?.getBoundingClientRect().left + window.scrollX }}>
            {options.map((option) => (
                <li key={option.text} className="option" onClick={(event) => option.onClick(event)}>
                    {option.icon && <div className="icon">{option.icon}</div>}
                    {option.text && <div className="text">{option.text}</div>}
                </li>
            ))}
        </ul>
    );

    return (
        <div className="select-button">
            <button className="select-button-toggle" onClick={toggleDropdown} ref={buttonRef}>
                {icon && <div className="icon">{icon}</div>}
                {text && <div className="text">{text}</div>}
            </button>
            {isOpen && ReactDOM.createPortal(dropdown, document.body)}
        </div>
    );
};

export default SelectButton;