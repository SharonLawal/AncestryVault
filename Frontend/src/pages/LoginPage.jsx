import React from 'react';
import { LogoIconBlue } from '../components/common/LogoIcon';

const LoginPage = ({ onLogin }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="page flex-grow flex items-center justify-center bg-gray-100 py-16">
            <div className="bg-white p-10 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <LogoIconBlue className="w-12 h-12 text-indigo-700" />
                </div>
                <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">Welcome Back</h2>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="login-email" className="block text-gray-700 mb-2">Email Address</label>
                        <input type="email" id="login-email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="you@family.com" defaultValue="demo@family.com" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="login-password" className="block text-gray-700 mb-2">Password</label>
                        <input type="password" id="login-password" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="••••••••" defaultValue="demopass" />
                    </div>
                    <button type="submit" className="w-full bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-800 transition duration-300">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;