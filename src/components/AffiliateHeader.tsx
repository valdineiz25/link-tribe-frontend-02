
import React from 'react';
import { Bell, Store, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AffiliateStats } from '@/types/affiliate';

interface AffiliateHeaderProps {
  stats: AffiliateStats;
  onNotificationClick: () => void;
}

const AffiliateHeader: React.FC<AffiliateHeaderProps> = ({ stats, onNotificationClick }) => {
  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl shadow-lg mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Store size={20} />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold">Sua loja:</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {stats.totalProducts} produtos
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <TrendingUp size={14} />
              <span>{formatCurrency(stats.monthlyCommissions)} em comissões este mês</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onNotificationClick}
          className="relative text-white hover:bg-white/20"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        </Button>
      </div>
    </div>
  );
};

export default AffiliateHeader;
