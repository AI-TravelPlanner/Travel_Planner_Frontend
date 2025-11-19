
import React, { useEffect, useState } from 'react';

// Mock useSeason hook for demo - replace with your actual import
const useSeason = () => {
  const [season, setSeason] = useState('winter');
  
  useEffect(() => {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % seasons.length;
      setSeason(seasons[index]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return { season };
};

const SeasonalAnimations = () => {
  const { season } = useSeason();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: season === 'winter' ? 8 + Math.random() * 4 : 10 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, [season]);

  const getParticleClass = () => {
    switch (season) {
      case 'winter':
        return 'winter-particle';
      case 'spring':
        return 'spring-particle';
      case 'summer':
        return 'summer-particle';
      case 'autumn':
        return 'autumn-particle';
      default:
        return '';
    }
  };

  const getParticleStyle = (particle) => {
    const baseStyle = {
      position: 'absolute',
      left: `${particle.left}%`,
      top: '-20px',
      animationDelay: `${particle.animationDelay}s`,
      animationDuration: `${particle.duration}s`,
      pointerEvents: 'none',
    };

    switch (season) {
      case 'winter':
        return {
          ...baseStyle,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
        };
      
      case 'spring':
        return {
          ...baseStyle,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
        };
      
      case 'summer':
        return {
          ...baseStyle,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
        };
      
      case 'autumn':
        return {
          ...baseStyle,
          width: `${particle.size}px`,
          height: `${particle.size * 1.2}px`,
        };
      
      default:
        return baseStyle;
    }
  };

  return (
    <>
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(calc(100vh + 50px));
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(30px);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(20px);
          }
          50% {
            transform: translateY(0) translateX(40px);
          }
          75% {
            transform: translateY(-20px) translateX(20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        @keyframes fallAndSway {
          to {
            transform: translateY(calc(100vh + 50px));
          }
        }

        @keyframes swayMotion {
          0%, 100% {
            left: 0;
          }
          50% {
            left: 30px;
          }
        }

        .winter-particle {
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          animation: fall linear infinite, sway 3s ease-in-out infinite;
          animation-iteration-count: infinite;
        }
        
        .spring-particle {
          background: linear-gradient(135deg, #f472b6, #ec4899);
          border-radius: 50% 0 50% 0;
          animation: fall linear infinite, spin 4s linear infinite, sway 2s ease-in-out infinite;
          opacity: 0.7;
        }
        
        .summer-particle {
          background: radial-gradient(circle, #fbbf24, #fb923c);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
          animation: float ease-in-out infinite, pulse 2s ease-in-out infinite;
          opacity: 0.6;
        }
        
        .autumn-particle {
          background: linear-gradient(135deg, #fb923c, #ea580c);
          border-radius: 0 50% 50% 50%;
          clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
          animation: fall linear infinite, spin 3s linear infinite, sway 2.5s ease-in-out infinite;
          opacity: 0.8;
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '8px',
          zIndex: 1000,
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          Current Season: <strong>{season}</strong>
        </div>
        {particles.map((particle) => (
          <div 
            key={particle.id} 
            className={getParticleClass()}
            style={getParticleStyle(particle)} 
          />
        ))}
      </div>
    </>
  );
};

export default SeasonalAnimations;