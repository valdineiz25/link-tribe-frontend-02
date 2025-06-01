
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Zap, 
  BarChart3, 
  Users, 
  DollarSign,
  Eye,
  MousePointer,
  Star
} from 'lucide-react';

interface AffiBoostDashboardProps {
  algorithmStats: any;
  categoryStats: any[];
  onUpdateTrending: (categories: string[]) => void;
}

export const AffiBoostDashboard: React.FC<AffiBoostDashboardProps> = ({
  algorithmStats,
  categoryStats,
  onUpdateTrending
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleTrendingUpdate = () => {
    onUpdateTrending(selectedCategories);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  if (!algorithmStats) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Carregando estatísticas do AffiBoost...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com Stats Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Posts Analisados</p>
                <p className="text-2xl font-bold text-purple-600">{algorithmStats.totalPosts}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Score Médio</p>
                <p className="text-2xl font-bold text-blue-600">{algorithmStats.averageScore}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Em Trending</p>
                <p className="text-2xl font-bold text-orange-600">{algorithmStats.trendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Categorias</p>
                <p className="text-2xl font-bold text-green-600">{algorithmStats.categoriesAnalyzed.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top-performers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          <TabsTrigger value="categories">Por Categoria</TabsTrigger>
          <TabsTrigger value="trending">Trending Control</TabsTrigger>
        </TabsList>

        <TabsContent value="top-performers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                Top 5 Posts com Maior Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {algorithmStats.topPerformers.map((post: any, index: number) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Post #{post.id}</p>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">{post.score}</p>
                      <p className="text-xs text-gray-500">AffiBoost Score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Performance por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryStats.map((stat: any) => (
                  <div key={stat.category} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{stat.category}</h4>
                      <p className="text-sm text-gray-600">{stat.postCount} posts</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{stat.averageScore}</p>
                      <p className="text-xs text-gray-500">Score Médio</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                Controle de Trending
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Selecione as categorias que devem receber boost de trending:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {algorithmStats.categoriesAnalyzed.map((category: string) => (
                  <Button
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCategory(category)}
                    className="justify-start"
                  >
                    {selectedCategories.includes(category) && <TrendingUp className="h-4 w-4 mr-2" />}
                    {category}
                  </Button>
                ))}
              </div>

              <Button 
                onClick={handleTrendingUpdate}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                disabled={selectedCategories.length === 0}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Aplicar Trending Boost ({selectedCategories.length} categorias)
              </Button>

              {selectedCategories.length > 0 && (
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-800">
                    <strong>Categorias em trending:</strong> {selectedCategories.join(', ')}
                  </p>
                  <p className="text-xs text-orange-600 mt-1">
                    Posts dessas categorias receberão +20% de boost no score.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
