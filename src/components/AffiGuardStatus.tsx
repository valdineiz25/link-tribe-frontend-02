
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';
import { useAffiGuard } from '@/hooks/useAffiGuard';

interface AffiGuardStatusProps {
  userId?: string;
  compact?: boolean;
}

export const AffiGuardStatus: React.FC<AffiGuardStatusProps> = ({ 
  userId = '1', 
  compact = false 
}) => {
  const { getUserStatus, getStats } = useAffiGuard(userId);
  const userStatus = getUserStatus();
  const systemStats = getStats();

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <Shield className={`h-4 w-4 ${userStatus.isSuspended ? 'text-red-500' : 'text-green-500'}`} />
        <Badge variant={userStatus.isSuspended ? 'destructive' : 'secondary'}>
          {userStatus.isSuspended ? 'Suspenso' : `${userStatus.remainingAttempts} tentativas`}
        </Badge>
      </div>
    );
  }

  return (
    <Card className={`${userStatus.isSuspended ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Shield className={`h-5 w-5 ${userStatus.isSuspended ? 'text-red-600' : 'text-green-600'}`} />
          <span>Status de Segurança AffiGuard</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Status do Usuário */}
        <div className={`p-4 rounded-lg border ${
          userStatus.isSuspended 
            ? 'bg-red-100 border-red-200' 
            : userStatus.violationsCount > 1 
              ? 'bg-yellow-100 border-yellow-200'
              : 'bg-green-100 border-green-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {userStatus.isSuspended ? (
                <XCircle className="h-5 w-5 text-red-600" />
              ) : userStatus.violationsCount > 1 ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              <span className="font-semibold">
                {userStatus.isSuspended 
                  ? 'Conta Suspensa' 
                  : userStatus.violationsCount > 1 
                    ? 'Atenção Requerida'
                    : 'Conta em Boa Situação'
                }
              </span>
            </div>
            
            <Badge variant={userStatus.isSuspended ? 'destructive' : 'secondary'}>
              {userStatus.violationsCount}/3 violações
            </Badge>
          </div>
          
          <p className={`text-sm ${
            userStatus.isSuspended 
              ? 'text-red-700' 
              : userStatus.violationsCount > 1 
                ? 'text-yellow-700'
                : 'text-green-700'
          }`}>
            {userStatus.isSuspended 
              ? 'Sua conta foi suspensa por 7 dias devido a múltiplas tentativas de postar links não autorizados.'
              : userStatus.violationsCount > 1 
                ? `Você tem ${userStatus.remainingAttempts} tentativa(s) restante(s) antes da suspensão automática.`
                : 'Continue seguindo as regras para manter sua conta segura!'
            }
          </p>
        </div>

        {/* Estatísticas do Sistema */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{systemStats.totalViolations}</div>
            <div className="text-sm text-gray-600">Violações (24h)</div>
          </div>
          
          <div className="text-center p-3 bg-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{systemStats.suspendedUsers}</div>
            <div className="text-sm text-gray-600">Usuários Suspensos</div>
          </div>
          
          <div className="text-center p-3 bg-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((1 - systemStats.totalViolations / Math.max(systemStats.totalViolations + 100, 1)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Taxa de Conformidade</div>
          </div>
        </div>

        {/* Ações */}
        {userStatus.isSuspended && (
          <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700">
              A suspensão será removida automaticamente em 7 dias.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
