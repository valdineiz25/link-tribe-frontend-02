
import React from 'react';
import { Clock } from 'lucide-react';

interface PromotionBannerProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ timeLeft }) => {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-red-600 to-red-500 text-white p-4 shadow-lg">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="font-bold text-sm">🔴 PROMOÇÃO DO DIA</span>
        </div>
        <div className="flex items-center space-x-2 text-sm font-mono">
          <Clock size={16} />
          <span>Acaba em {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};
