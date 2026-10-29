import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);
    return (
        <nav className="navbar">
            <h2 className="logo"><span>Silken</span> <span>Atelier</span> </h2>
            <button
                className={`hamburger ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
            <span className={`menuItems ${isOpen ? 'show' : ''}`}>
                <NavLink className="navLink" to="/" onClick={closeMenu}>
                    Home
                </NavLink>
                <NavLink to="/gallery" className="navLink" onClick={closeMenu}>
                    Gallery
                </NavLink>
                <NavLink to="/services" className="navLink" onClick={closeMenu}>
                    Services
                </NavLink>
                <NavLink to="/contact" className="navLink" onClick={closeMenu}>
                    Contact
                </NavLink>
            </span>
        </nav>
       
    );
}