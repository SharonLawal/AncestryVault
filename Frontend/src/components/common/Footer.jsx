import React from 'react';
import { LogoIconWhite } from './LogoIcon';

const Footer = () => {
    return (
        <footer className="bg-indigo-900 text-indigo-200">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <LogoIconWhite className="text-white" />
                        </div>
                    </div>
                    <div>
                        <h5 className="font-semibold text-white uppercase mb-4">Resources</h5>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">FAQs</a></li>
                            <li><a href="#" className="hover:text-white">History</a></li>
                            <li><a href="#" className="hover:text-white">Contact Lawyer</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold text-white uppercase mb-4">Archive</h5>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Gallery</a></li>
                            <li><a href="#" className="hover:text-white">View Family Will</a></li>
                            <li><a href="#" className="hover:text-white">Access the vault</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold text-white uppercase mb-4">Account</h5>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-white">Sign up</a></li>
                            <li><a href="#" className="hover:text-white">Sign out</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-indigo-700 mt-8 pt-8 flex justify-between items-center text-sm">
                    <p>&copy; 2025 Ancestry. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white">X</a>
                        <a href="#" className="hover:text-white">M</a>
                        <a href="#" className="hover:text-white">@</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;