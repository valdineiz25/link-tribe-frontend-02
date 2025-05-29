
import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search,
  Filter,
  SlidersHorizontal
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
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
        <p className="text-gray-600">Descubra produtos incríveis e ganhe comissões!</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6 space-y-4">
          {/* Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categorias */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Filter size={20} />
              <span className="font-medium">Categorias:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtro de Preço */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <SlidersHorizontal size={20} />
              <span className="font-medium">Faixa de Preço:</span>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Mín"
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-24"
              />
              <span className="flex items-center">até</span>
              <Input
                placeholder="Máx"
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-24"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPriceRange({ min: '', max: '' })}
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            {filteredProducts.length} produtos encontrados
          </p>
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Nenhum produto encontrado com os filtros aplicados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
