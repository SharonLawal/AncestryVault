import React, { useState } from 'react';
import LogoIconBlue from './LogoIcon.jsx';
import { HamburgerIcon, CloseIcon } from './Icons.jsx';

const Header = ({ onSetPage, onLogout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (page) => {
        onSetPage(page);
        setIsMenuOpen(false);
    };

    const handleLogoutClick = () => {
        onLogout();
        setIsMenuOpen(false);
    }

    return (
        <header className="bg-white shadow-sm relative">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <LogoIconBlue />
                </div>
                
                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="#home" onClick={() => handleNavClick('home')} className="nav-link text-gray-700 hover:text-indigo-700">Home</a>
                    <a href="#video" onClick={() => handleNavClick('video-will')} className="nav-link text-gray-700 hover:text-indigo-700">Legacy Video Will</a>
                    <a href="#" className="text-gray-700 hover:text-indigo-700">All Members</a>
                    <a href="#" className="text-gray-700 hover:text-indigo-700">Family Timeline</a>
                    <a href="#" className="text-gray-700 hover:text-indigo-700">History</a>
                    <a href="#" className="text-gray-700 hover:text-indigo-700">Gallery</a>
                </div>

                {/* Desktop Sign Out Button */}
                <div className="hidden md:flex items-center space-x-2">
                    <button onClick={handleLogoutClick} className="bg-indigo-700 text-white py-2 px-5 rounded-lg font-semibold hover:bg-indigo-800 transition">
                        Sign Out
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-indigo-700 focus:outline-none">
                        {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu (Dropdown) */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 z-50">
                    <div className="container mx-auto px-6 flex flex-col space-y-4">
                        <a href="#home" onClick={() => handleNavClick('home')} className="nav-link text-gray-700 hover:text-indigo-700 py-2">Home</a>
                        <a href="#video" onClick={() => handleNavClick('video-will')} className="nav-link text-gray-700 hover:text-indigo-700 py-2">Legacy Video Will</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-700 py-2">All Members</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-700 py-2">Family Timeline</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-700 py-2">History</a>
                        <a href="#" className="text-gray-700 hover:text-indigo-700 py-2">Gallery</a>
                        
                        <div className="border-t border-gray-200 pt-4">
                            <button onClick={handleLogoutClick} className="w-full bg-indigo-700 text-white py-2 px-5 rounded-lg font-semibold hover:bg-indigo-800 transition">
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;