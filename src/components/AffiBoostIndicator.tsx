
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Zap, Star, Target } from 'lucide-react';

interface AffiBoostIndicatorProps {
  score: number;
  rankingFactors?: {
    engagementScore: number;
    conversionScore: number;
    affiliateScore: number;
    trendingBonus: number;
  };
  compact?: boolean;
  showDetails?: boolean;
}

export const AffiBoostIndicator: React.FC<AffiBoostIndicatorProps> = ({
  score,
  rankingFactors,
  compact = false,
  showDetails = false
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Zap className="h-3 w-3" />;
    if (score >= 60) return <TrendingUp className="h-3 w-3" />;
    if (score >= 40) return <Star className="h-3 w-3" />;
    return <Target className="h-3 w-3" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Viral';
    if (score >= 60) return 'Alto';
    if (score >= 40) return 'Médio';
    return 'Baixo';
  };

  if (compact) {
    return (
      <Badge variant="secondary" className={`${getScoreColor(score)} flex items-center gap-1`}>
        {getScoreIcon(score)}
        <span className="text-xs font-semibold">{score.toFixed(1)}</span>
      </Badge>
    );
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">AffiBoost Score</h4>
              <p className="text-xs text-gray-600">Potencial de monetização</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">{score.toFixed(1)}</div>
            <Badge variant="secondary" className={getScoreColor(score)}>
              {getScoreLabel(score)}
            </Badge>
          </div>
        </div>

        {showDetails && rankingFactors && (
          <div className="space-y-2">
            <div className="text-xs text-gray-600 mb-2">Fatores de Ranking:</div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Engajamento:</span>
                <span className="font-medium">{rankingFactors.engagementScore.toFixed(1)}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Conversão:</span>
                <span className="font-medium">{rankingFactors.conversionScore.toFixed(1)}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Afiliado:</span>
                <span className="font-medium">{rankingFactors.affiliateScore.toFixed(1)}</span>
              </div>
              
              {rankingFactors.trendingBonus > 0 && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Trending:
                  </span>
                  <span className="font-medium text-orange-600">
                    +{(rankingFactors.trendingBonus * 100).toFixed(0)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(score, 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
