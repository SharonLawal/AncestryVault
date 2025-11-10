import React from 'react';

const LoadingScreen = () => (
    <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E7EB',
        zIndex: 9999
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <style>
                {`
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                `}
            </style>
            <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#4338ca',
                borderRadius: '50%',
                animation: 'bounce 0.6s infinite',
                animationDelay: '0s'
            }}></div>
            <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#4338ca',
                borderRadius: '50%',
                animation: 'bounce 0.6s infinite',
                animationDelay: '0.2s'
            }}></div>
            <div style={{
                width: '16px',
                height: '16px',
                backgroundColor: '#4338ca',
                borderRadius: '50%',
                animation: 'bounce 0.6s infinite',
                animationDelay: '0.4s'
            }}></div>
        </div>
    </div>
);

export default LoadingScreen;