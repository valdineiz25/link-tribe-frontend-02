
import React from 'react';
import { TrendingUp, Sparkles, Plus, Filter, Users, BarChart3, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeedHeader: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          Feed de Afiliados
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Descubra produtos incríveis, conecte-se com outros afiliados e maximize suas comissões! 🚀
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center space-x-8 mb-8">
        <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-100">
          <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
          <div className="text-left">
            <div className="font-bold text-green-700">+2.5k</div>
            <div className="text-xs text-green-600">vendas hoje</div>
          </div>
        </div>
        <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-xl border border-blue-100">
          <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
          <div className="text-left">
            <div className="font-bold text-blue-700">R$ 45k</div>
            <div className="text-xs text-blue-600">em comissões</div>
          </div>
        </div>
        <div className="flex items-center bg-gradient-to-r from-purple-50 to-violet-50 px-4 py-3 rounded-xl border border-purple-100">
          <Users className="w-5 h-5 text-purple-600 mr-2" />
          <div className="text-left">
            <div className="font-bold text-purple-700">1.2k</div>
            <div className="text-xs text-purple-600">afiliados ativos</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/create-post">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5 mr-2" />
            Criar Post
          </Button>
        </Link>

        <Link to="/create-store">
          <Button 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <Store className="w-5 h-5 mr-2" />
            Criar Loja
          </Button>
        </Link>
        
        <Button 
          variant="outline"
          className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold px-6 py-3 rounded-xl transition-all"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filtros
        </Button>

        <Link to="/dashboard">
          <Button 
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold px-6 py-3 rounded-xl transition-all"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Analytics
          </Button>
        </Link>

        <Link to="/groups">
          <Button 
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold px-6 py-3 rounded-xl transition-all"
          >
            <Users className="w-5 h-5 mr-2" />
            Grupos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeedHeader;
