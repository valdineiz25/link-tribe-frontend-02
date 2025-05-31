
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Crown, Users, TrendingUp, Star } from 'lucide-react';

const TopAffiliates = () => {
  const affiliates = [
    {
      id: 1,
      name: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      speciality: 'Tecnologia & Gadgets',
      followers: 45200,
      engagement: 8.5,
      revenue: 15420,
      badge: 'Diamante',
      verified: true,
      products: 234
    },
    {
      id: 2,
      name: 'João Santos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      speciality: 'Moda & Lifestyle',
      followers: 32800,
      engagement: 7.2,
      revenue: 12350,
      badge: 'Ouro',
      verified: true,
      products: 189
    },
    {
      id: 3,
      name: 'Ana Costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      speciality: 'Casa & Decoração',
      followers: 28500,
      engagement: 9.1,
      revenue: 10890,
      badge: 'Ouro',
      verified: true,
      products: 156
    },
    {
      id: 4,
      name: 'Carlos Oliveira',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      speciality: 'Esportes & Fitness',
      followers: 24100,
      engagement: 6.8,
      revenue: 9240,
      badge: 'Prata',
      verified: false,
      products: 98
    }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Diamante': return 'bg-gradient-to-r from-blue-400 to-purple-500';
      case 'Ouro': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Prata': return 'bg-gradient-to-r from-gray-400 to-gray-600';
      default: return 'bg-gradient-to-r from-orange-400 to-red-500';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatRevenue = (revenue: number) => {
    return revenue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Crown className="text-yellow-500" size={24} />
        <h2 className="text-2xl font-bold text-gray-800">Top Afiliados</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {affiliates.map((affiliate, index) => (
          <Card key={affiliate.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              {/* Ranking Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-8 h-8 rounded-full ${getBadgeColor(affiliate.badge)} flex items-center justify-center text-white font-bold text-sm`}>
                  {index + 1}
                </div>
                {affiliate.verified && (
                  <div className="flex items-center gap-1 text-blue-500">
                    <Star size={16} className="fill-current" />
                    <span className="text-xs">Verificado</span>
                  </div>
                )}
              </div>

              {/* Avatar & Name */}
              <div className="text-center mb-4">
                <Avatar className="w-16 h-16 mx-auto mb-3 ring-4 ring-orange-200">
                  <AvatarImage src={affiliate.avatar} alt={affiliate.name} />
                  <AvatarFallback className="bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold">
                    {affiliate.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-gray-800">{affiliate.name}</h3>
                <p className="text-sm text-gray-600">{affiliate.speciality}</p>
              </div>

              {/* Badge */}
              <div className="text-center mb-4">
                <Badge className={`${getBadgeColor(affiliate.badge)} text-white border-0`}>
                  {affiliate.badge}
                </Badge>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users size={14} />
                    <span>Seguidores</span>
                  </div>
                  <span className="font-semibold">{formatNumber(affiliate.followers)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <TrendingUp size={14} />
                    <span>Engajamento</span>
                  </div>
                  <span className="font-semibold">{affiliate.engagement}%</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Produtos</span>
                  <span className="font-semibold">{affiliate.products}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Receita</span>
                  <span className="font-semibold text-green-600">{formatRevenue(affiliate.revenue)}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                size="sm"
              >
                Ver Perfil
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopAffiliates;
