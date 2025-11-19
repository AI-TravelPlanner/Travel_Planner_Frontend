import React, { useEffect, useState } from 'react';
import { useSeason } from '@/dashboard/SeasonThemeSystem';

const SeasonalAnimations = () => {
  const { season } = useSeason();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 30;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: `${season}-${i}`,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      size: season === 'winter' ? 8 + Math.random() * 4 : 10 + Math.random() * 10,
    }));
    setParticles(newParticles);
  }, [season]);

  return (
    <>
      <style>{`
        @keyframes winter-fall {
          0% {
            transform: translateY(-20px) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(30px);
          }
        }

        @keyframes spring-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
          }
        }

        @keyframes summer-float {
          0% {
            transform: translate(0, -20px) scale(1);
          }
          25% {
            transform: translate(20px, 20vh) scale(1.2);
          }
          50% {
            transform: translate(40px, 40vh) scale(1);
          }
          75% {
            transform: translate(20px, 60vh) scale(1.2);
          }
          100% {
            transform: translate(0, 100vh) scale(1);
          }
        }

        @keyframes autumn-fall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
          }
          100% {
            transform: translateY(100vh) rotate(1080deg) translateX(50px);
          }
        }

        .particle-winter {
          position: absolute;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          animation: winter-fall linear infinite;
          pointer-events: none;
        }
        
        .particle-spring {
          position: absolute;
          background: linear-gradient(135deg, #f472b6, #ec4899);
          border-radius: 50% 0 50% 0;
          animation: spring-fall linear infinite;
          opacity: 0.7;
          pointer-events: none;
        }
        
        .particle-summer {
          position: absolute;
          background: radial-gradient(circle, #fbbf24, #fb923c);
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
          animation: summer-float ease-in-out infinite;
          opacity: 0.6;
          pointer-events: none;
        }
        
        .particle-autumn {
          position: absolute;
          background: linear-gradient(135deg, #fb923c, #ea580c);
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          animation: autumn-fall linear infinite;
          opacity: 0.8;
          pointer-events: none;
        }
      `}</style>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9999,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {particles.map((particle) => (
          <div 
            key={particle.id}
            className={`particle-${season}`}
            style={{
              left: `${particle.left}%`,
              top: '-20px',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default SeasonalAnimations;