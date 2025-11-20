import { createContext, useContext, useState, useEffect } from 'react';

const SeasonContext = createContext();

export const useSeason = () => useContext(SeasonContext);

export const seasonThemes = {
  spring: {
    // Main background - Cherry blossom sunrise
    bg: 'bg-gradient-to-br from-pink-100 via-rose-50 to-green-50',
    bgOverlay: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-200/20 via-transparent to-emerald-200/20',
    
    // Sidebar - Fresh petal glass
    sidebarBg: 'bg-gradient-to-br from-white/95 via-pink-50/90 to-emerald-50/85',
    sidebarBorder: 'border-pink-200/50',
    sidebarShadow: 'shadow-[0_8px_30px_rgb(244,114,182,0.12)]',
    sidebarText: 'text-emerald-950',
    
    // Cards & Muted areas
    muted: 'bg-white/70 backdrop-blur-md',
    mutedBorder: 'border-pink-200/40',
    mutedShadow: 'shadow-[0_4px_20px_rgba(244,114,182,0.08)]',
    mutedHover: 'hover:bg-white/90 hover:border-pink-300/60 hover:shadow-[0_8px_30px_rgba(244,114,182,0.15)]',
    
    // Interactive elements
    accent: 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600',
    accentHover: 'hover:from-pink-600 hover:via-rose-600 hover:to-pink-700',
    accentShadow: 'shadow-[0_4px_20px_rgba(244,114,182,0.4)]',
    accentText: 'text-pink-600',
    
    // Buttons
    button: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600',
    buttonText: 'text-white',
    buttonShadow: 'shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40',
    
    // Inputs
    input: 'bg-white/80 border-pink-200/50 focus:border-pink-400 focus:ring-pink-400/30',
    inputText: 'text-emerald-950',
    
    // Text hierarchy
    textPrimary: 'text-emerald-950',
    textSecondary: 'text-pink-900',
    textMuted: 'text-emerald-700',
    
    // Special effects
    glow: 'shadow-[0_0_30px_rgba(244,114,182,0.3)]',
    particle: 'rgba(244, 114, 182, 0.6)',
  },
  
  summer: {
    // Main background - Golden hour beach
    bg: 'bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100',
    bgOverlay: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200/20 via-transparent to-orange-200/20',
    
    // Sidebar - Sunset warmth
    sidebarBg: 'bg-gradient-to-br from-yellow-50/95 via-orange-50/90 to-amber-100/85',
    sidebarBorder: 'border-amber-300/50',
    sidebarShadow: 'shadow-[0_8px_30px_rgb(251,146,60,0.15)]',
    sidebarText: 'text-orange-950',
    
    // Cards & Muted areas
    muted: 'bg-white/60 backdrop-blur-md',
    mutedBorder: 'border-amber-200/40',
    mutedShadow: 'shadow-[0_4px_20px_rgba(251,146,60,0.1)]',
    mutedHover: 'hover:bg-white/80 hover:border-amber-300/60 hover:shadow-[0_8px_30px_rgba(251,146,60,0.2)]',
    
    // Interactive elements
    accent: 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500',
    accentHover: 'hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600',
    accentShadow: 'shadow-[0_4px_20px_rgba(251,146,60,0.5)]',
    accentText: 'text-orange-600',
    
    // Buttons
    button: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
    buttonText: 'text-white',
    buttonShadow: 'shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40',
    
    // Inputs
    input: 'bg-white/70 border-amber-200/50 focus:border-orange-400 focus:ring-orange-400/30',
    inputText: 'text-orange-950',
    
    // Text hierarchy
    textPrimary: 'text-orange-950',
    textSecondary: 'text-amber-900',
    textMuted: 'text-orange-800',
    
    // Special effects
    glow: 'shadow-[0_0_30px_rgba(251,146,60,0.4)]',
    particle: 'rgba(251, 146, 60, 0.6)',
  },
  
  autumn: {
    // Main background - Soft sunset (LIGHT THEME)
    bg: 'bg-gradient-to-br from-orange-100 via-amber-50 to-red-50',
    bgOverlay: 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-200/20 via-transparent to-amber-200/20',
    
    // Sidebar - Warm cream (LIGHT THEME)
    sidebarBg: 'bg-gradient-to-br from-orange-50/95 via-amber-50/90 to-red-50/85',
    sidebarBorder: 'border-orange-300/50',
    sidebarShadow: 'shadow-[0_8px_30px_rgb(251,146,60,0.15)]',
    sidebarText: 'text-orange-950',
    
    // Cards & Muted areas (LIGHT THEME)
    muted: 'bg-white/70 backdrop-blur-md',
    mutedBorder: 'border-orange-200/40',
    mutedShadow: 'shadow-[0_4px_20px_rgba(251,146,60,0.1)]',
    mutedHover: 'hover:bg-orange-50/80 hover:border-orange-300/60 hover:shadow-[0_8px_30px_rgba(251,146,60,0.2)]',
    
    // Interactive elements
    accent: 'bg-gradient-to-r from-orange-500 via-red-500 to-amber-500',
    accentHover: 'hover:from-orange-600 hover:via-red-600 hover:to-amber-600',
    accentShadow: 'shadow-[0_4px_20px_rgba(251,146,60,0.4)]',
    accentText: 'text-orange-600',
    
    // Buttons
    button: 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600',
    buttonText: 'text-white',
    buttonShadow: 'shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40',
    
    // Inputs (LIGHT THEME)
    input: 'bg-white/80 border-orange-200/50 focus:border-orange-400 focus:ring-orange-400/30 text-orange-950',
    inputText: 'text-orange-950',
    
    // Text hierarchy (DARK TEXT FOR READABILITY)
    textPrimary: 'text-orange-950',
    textSecondary: 'text-orange-800',
    textMuted: 'text-orange-700',
    
    // Special effects
    glow: 'shadow-[0_0_30px_rgba(251,146,60,0.3)]',
    particle: 'rgba(251, 146, 60, 0.6)',
  },
  
  winter: {
    // Main background - Soft winter sky (LIGHT THEME)
    bg: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-slate-50',
    bgOverlay: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100/30 via-transparent to-blue-100/30',
    
    // Sidebar - Frosted glass (LIGHT THEME)
    sidebarBg: 'bg-gradient-to-br from-white/95 via-cyan-50/90 to-blue-50/85',
    sidebarBorder: 'border-cyan-300/50',
    sidebarShadow: 'shadow-[0_8px_30px_rgb(34,211,238,0.15)]',
    sidebarText: 'text-slate-900',
    
    // Cards & Muted areas (LIGHT THEME)
    muted: 'bg-white/80 backdrop-blur-md',
    mutedBorder: 'border-cyan-200/40',
    mutedShadow: 'shadow-[0_4px_20px_rgba(34,211,238,0.1)]',
    mutedHover: 'hover:bg-cyan-50/80 hover:border-cyan-300/60 hover:shadow-[0_8px_30px_rgba(34,211,238,0.2)]',
    
    // Interactive elements
    accent: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500',
    accentHover: 'hover:from-cyan-600 hover:via-blue-600 hover:to-cyan-600',
    accentShadow: 'shadow-[0_4px_20px_rgba(34,211,238,0.4)]',
    accentText: 'text-cyan-600',
    
    // Buttons
    button: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600',
    buttonText: 'text-white',
    buttonShadow: 'shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40',
    
    // Inputs (LIGHT THEME)
    input: 'bg-white/90 border-cyan-200/50 focus:border-cyan-400 focus:ring-cyan-400/30 text-slate-900',
    inputText: 'text-slate-900',
    
    // Text hierarchy (DARK TEXT FOR READABILITY)
    textPrimary: 'text-slate-900',
    textSecondary: 'text-cyan-900',
    textMuted: 'text-slate-700',
    
    // Special effects
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.3)]',
    particle: 'rgba(34, 211, 238, 0.6)',
  }
};

export function SeasonProvider({ children }) {
  const [season, setSeason] = useState('summer');
  const theme = seasonThemes[season];

  useEffect(() => {
    // Add smooth transition class to body
    document.body.style.transition = 'background-color 1s ease-in-out';
  }, []);

  return (
    <SeasonContext.Provider value={{ season, setSeason, theme }}>
      <div className={`${theme.bg} relative min-h-screen transition-all duration-1000 ease-in-out`}>
        {/* Animated overlay */}
        <div className={`fixed inset-0 ${theme.bgOverlay} transition-all duration-1000 pointer-events-none`} />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </SeasonContext.Provider>
  );
}