
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  Zap,
  Gift,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/hooks/useProducts';
import { ProductFilters } from '@/types/product';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<'price' | 'commission' | 'rating' | 'sales' | 'newest'>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  const filters: ProductFilters = {
    searchTerm: searchTerm || undefined,
    category: selectedCategory || undefined,
    minPrice: priceRange.min ? parseFloat(priceRange.min) : undefined,
    maxPrice: priceRange.max ? parseFloat(priceRange.max) : undefined,
    sortBy,
    sortOrder
  };

  const { products, loading, trackClick } = useProducts(filters);

  const categories = [
    'Todos',
    'Eletrônicos',
    'Moda',
    'Casa e Jardim',
    'Saúde e Beleza',
    'Esportes',
    'Livros'
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
    setSortOrder('desc');
    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram removidos.",
    });
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === 'Todos' ? '' : category);
    toast({
      title: "Categoria selecionada",
      description: `Exibindo produtos de: ${category}`,
    });
  };

  const handleProductClick = (productId: string) => {
    trackClick(productId);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      toast({
        title: "Busca realizada",
        description: `Procurando por: "${searchTerm}"`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Header Hero */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            🛍️ Marketplace Premium
          </h1>
          <p className="text-gray-600 text-xl mb-6">Descubra produtos incríveis e ganhe comissões fantásticas!</p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform">
              <Star size={24} className="mx-auto mb-2" />
              <p className="font-bold text-lg">{products.length}+ Produtos</p>
              <p className="text-xs opacity-90">Verificados</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform">
              <Zap size={24} className="mx-auto mb-2" />
              <p className="font-bold text-lg">Até 25%</p>
              <p className="text-xs opacity-90">De Comissão</p>
            </div>
            <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform">
              <Gift size={24} className="mx-auto mb-2" />
              <p className="font-bold text-lg">Ofertas</p>
              <p className="text-xs opacity-90">Exclusivas</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6 space-y-6">
            {/* Busca */}
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" size={20} />
                <Input
                  placeholder="🔍 Buscar produtos incríveis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-3 border-orange-200 focus:border-orange-400 text-lg"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>

            {/* Categorias */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Filter size={20} className="text-orange-600" />
                <span className="font-bold text-gray-800">Categorias:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={(selectedCategory === category || (category === 'Todos' && !selectedCategory)) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategorySelect(category)}
                    className={(selectedCategory === category || (category === 'Todos' && !selectedCategory))
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-bold' 
                      : 'border-orange-300 text-orange-600 hover:bg-orange-50 font-medium'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filtro de Preço e Ordenação */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <SlidersHorizontal size={20} className="text-orange-600" />
                  <span className="font-bold text-gray-800">Faixa de Preço:</span>
                </div>
                <div className="flex space-x-3 items-center">
                  <Input
                    placeholder="R$ Mín"
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-28 border-orange-200"
                  />
                  <span className="font-medium text-gray-500">até</span>
                  <Input
                    placeholder="R$ Máx"
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-28 border-orange-200"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="font-bold text-gray-800">Ordenar por:</span>
                </div>
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-orange-200 rounded px-3 py-2 flex-1"
                  >
                    <option value="newest">Mais Recentes</option>
                    <option value="price">Preço</option>
                    <option value="commission">Comissão</option>
                    <option value="rating">Avaliação</option>
                    <option value="sales">Vendas</option>
                  </select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="border-orange-300"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full">
              <p className="font-bold">
                🔥 {products.length} produtos encontrados
              </p>
            </div>
            {(searchTerm || selectedCategory || priceRange.min || priceRange.max) && (
              <Button
                type="button"
                variant="outline"
                onClick={handleClearFilters}
                className="border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                Limpar todos os filtros
              </Button>
            )}
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product.id)}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🤔</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Ops! Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 text-lg mb-4">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
              <Button 
                type="button"
                onClick={handleClearFilters}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Limpar todos os filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
