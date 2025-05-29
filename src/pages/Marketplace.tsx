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
  Gift
} from 'lucide-react';

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const categories = [
    'Todos',
    'Eletrônicos',
    'Moda',
    'Casa e Jardim',
    'Saúde e Beleza',
    'Esportes',
    'Livros'
  ];

  const mockProducts = [
    {
      id: '1',
      name: 'Smartphone Android 128GB',
      price: 899.99,
      originalPrice: 1199.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      category: 'Eletrônicos',
      affiliateLink: 'https://example.com/smartphone',
      commission: 8
    },
    {
      id: '2',
      name: 'Tênis Running Performance',
      price: 249.90,
      originalPrice: 349.90,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      category: 'Esportes',
      affiliateLink: 'https://example.com/tenis',
      commission: 12
    },
    {
      id: '3',
      name: 'Skincare Kit Completo',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop',
      category: 'Saúde e Beleza',
      affiliateLink: 'https://example.com/skincare',
      commission: 15
    },
    {
      id: '4',
      name: 'Livro: Marketing Digital 2024',
      price: 39.90,
      originalPrice: 59.90,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
      category: 'Livros',
      affiliateLink: 'https://example.com/livro',
      commission: 20
    },
    {
      id: '5',
      name: 'Cafeteira Expresso Automática',
      price: 599.99,
      originalPrice: 799.99,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
      category: 'Casa e Jardim',
      affiliateLink: 'https://example.com/cafeteira',
      commission: 10
    },
    {
      id: '6',
      name: 'Vestido Elegante Primavera',
      price: 129.90,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop',
      category: 'Moda',
      affiliateLink: 'https://example.com/vestido',
      commission: 18
    }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesPriceMin = !priceRange.min || product.price >= parseFloat(priceRange.min);
    const matchesPriceMax = !priceRange.max || product.price <= parseFloat(priceRange.max);
    
    return matchesSearch && matchesCategory && matchesPriceMin && matchesPriceMax;
  });

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
            <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-xl">
              <Star size={24} className="mx-auto mb-2" />
              <p className="font-bold text-lg">+50k Produtos</p>
              <p className="text-xs opacity-90">Verificados</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-xl">
              <Zap size={24} className="mx-auto mb-2" />
              <p className="font-bold text-lg">Até 25%</p>
              <p className="text-xs opacity-90">De Comissão</p>
            </div>
            <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white p-4 rounded-xl">
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
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" size={20} />
              <Input
                placeholder="🔍 Buscar produtos incríveis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 border-orange-200 focus:border-orange-400 text-lg"
              />
            </div>

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
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 font-bold' 
                      : 'border-orange-300 text-orange-600 hover:bg-orange-50 font-medium'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filtro de Preço */}
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
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setPriceRange({ min: '', max: '' })}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full">
              <p className="font-bold">
                🔥 {filteredProducts.length} produtos encontrados
              </p>
            </div>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🤔</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                Ops! Nenhum produto encontrado
              </h3>
              <p className="text-gray-500 text-lg">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Todos');
                  setPriceRange({ min: '', max: '' });
                }}
                className="mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
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
