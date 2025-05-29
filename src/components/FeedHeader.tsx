
import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

const FeedHeader: React.FC = () => {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
        Feed de Afiliados
      </h1>
      <p className="text-gray-600 text-lg">Descubra produtos incríveis e ganhe comissões! 🚀</p>
      <div className="flex items-center justify-center space-x-4 mt-4">
        <div className="flex items-center text-orange-600">
          <TrendingUp size={20} className="mr-2" />
          <span className="font-semibold">+2.5k vendas hoje</span>
        </div>
        <div className="flex items-center text-green-600">
          <Sparkles size={20} className="mr-2" />
          <span className="font-semibold">R$ 45k em comissões</span>
        </div>
      </div>
    </div>
  );
};

export default FeedHeader;
