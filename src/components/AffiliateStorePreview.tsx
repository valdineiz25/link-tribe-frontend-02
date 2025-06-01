
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  Edit, 
  TrendingUp, 
  Eye, 
  ChevronRight,
  Package,
  Plus
} from 'lucide-react';
import { AffiliateStats } from '@/types/affiliate';

interface AffiliateStorePreviewProps {
  stats: AffiliateStats;
  hasStore: boolean;
  onEditStore: () => void;
  onCreateStore: () => void;
  onViewAnalytics: () => void;
}

const AffiliateStorePreview: React.FC<AffiliateStorePreviewProps> = ({
  stats,
  hasStore,
  onEditStore,
  onCreateStore,
  onViewAnalytics
}) => {
  const [showTopProducts, setShowTopProducts] = useState(false);

  if (!hasStore) {
    return (
      <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 mb-4">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store size={24} className="text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Crie sua primeira loja!
          </h3>
          <p className="text-gray-600 mb-4">
            Adicione seus produtos e comece a vender hoje mesmo
          </p>
          <Button
            onClick={onCreateStore}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Plus size={16} className="mr-2" />
            Criar Loja
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-lg border border-gray-200 mb-4 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Store size={20} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">Sua Loja</CardTitle>
              <p className="text-sm text-gray-600">Pré-visualização e métricas</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onEditStore}
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <Edit size={14} className="mr-1" />
            Editar
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Store Preview */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <Package size={24} className="text-gray-400" />
            </div>
          ))}
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Eye size={16} className="text-blue-600 mr-1" />
              <span className="text-sm font-medium text-blue-600">Visitas Hoje</span>
            </div>
            <p className="text-xl font-bold text-blue-900">{stats.todayVisits}</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp size={16} className="text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-600">Produtos</span>
            </div>
            <p className="text-xl font-bold text-green-900">{stats.totalProducts}</p>
          </div>
        </div>

        {/* Top Products Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTopProducts(!showTopProducts)}
          className="w-full justify-between text-gray-700 hover:bg-gray-50"
        >
          <span className="flex items-center">
            <TrendingUp size={16} className="mr-2" />
            {stats.topProducts.length} produtos mais clicados
          </span>
          <ChevronRight 
            size={16} 
            className={`transition-transform ${showTopProducts ? 'rotate-90' : ''}`}
          />
        </Button>

        {/* Expandable Top Products */}
        {showTopProducts && (
          <div className="mt-3 space-y-2">
            {stats.topProducts.slice(0, 3).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <span className="text-sm font-medium text-gray-900">{product.name}</span>
                </div>
                <span className="text-xs text-gray-500">{product.clicks} cliques</span>
              </div>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={onViewAnalytics}
              className="w-full mt-2"
            >
              Ver Analytics Completo
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AffiliateStorePreview;
