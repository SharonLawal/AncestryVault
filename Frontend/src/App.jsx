import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import VideoWillPage from './pages/VideoWillPage';
import { FormProvider } from './context/FormContext';
import LoadingScreen from './components/common/LoadingScreen';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentPage, setCurrentPage] = useState('login');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const existingScript = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
        
        if (existingScript && window.tailwind) {
            setTimeout(() => setIsLoading(false), 100);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.tailwindcss.com';
        script.async = false;
        
        script.onload = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        };
        
        script.onerror = () => {
            console.error("Failed to load Tailwind CSS.");
            setIsLoading(false);
        };
        
        document.head.appendChild(script);
        
        return () => {
            const scriptToRemove = document.querySelector('script[src="https://cdn.tailwindcss.com"]');
            if (scriptToRemove && scriptToRemove.onload) {
                scriptToRemove.onload = null;
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
                return <VideoWillPage onSetPage={handleSetPage} />;
            case 'home':
            default:
                return <HomePage onSetPage={handleSetPage} />;
        }
    };

    return (
        <FormProvider>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
                body { 
                    font-family: 'Inter', sans-serif; 
                    background-color: #E5E7EB; 
                    margin: 0;
                    padding: 0;
                }
                .font-playfair { font-family: 'Playfair Display', serif; }
                .page { animation: fadeIn 0.3s ease-in-out; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>
            
            {isLoading && <LoadingScreen />}
            
            <div style={{ 
                visibility: isLoading ? 'hidden' : 'visible',
                opacity: isLoading ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
            }} className="bg-gray-200 min-h-screen flex flex-col">
                {isLoggedIn && <Header onSetPage={handleSetPage} onLogout={handleLogout} />}
                
                <main className="flex-grow">
                    {renderPage()}
                </main>
                
                {isLoggedIn && <Footer />}
            </div>
        </FormProvider>
    );
}