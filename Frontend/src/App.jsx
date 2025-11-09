import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import VideoWillPage from './pages/VideoWillPage';

const LoadingScreen = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-indigo-700 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="w-4 h-4 bg-indigo-700 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 bg-indigo-700 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
    </div>
);

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.tailwindcss.com';
        script.async = true;
        
        // Add onload event to set loading to false
        script.onload = () => {
            setIsLoading(false);
        };
        
        document.head.appendChild(script);
        
        return () => {
            const existingScript = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setCurrentPage('home');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentPage('login');
    };
    
    const handleSetPage = (page) => {
        if (isLoggedIn) {
            setCurrentPage(page);
        }
    }

    const renderPage = () => {
        if (!isLoggedIn) {
            return <LoginPage onLogin={handleLogin} />;
        }
        switch (currentPage) {
            case 'video-will':
                return <VideoWillPage />;
            case 'home':
            default:
                return <HomePage onSetPage={handleSetPage} />;
        }
    };

    // Show loading screen until Tailwind is ready
    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="bg-gray-200 min-h-screen flex flex-col">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
                body { font-family: 'Inter', sans-serif; background-color: #E5E7EB; }
                .font-playfair { font-family: 'Playfair Display', serif; }
                .page { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
            
            {isLoggedIn && <Header onSetPage={handleSetPage} onLogout={handleLogout} />}
            
            <main className="flex-grow">
                {renderPage()}
            </main>
            
            {isLoggedIn && <Footer />}
        </div>
    );
}