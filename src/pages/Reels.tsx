
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReels } from '@/hooks/usePosts';

interface Reel {
  id: string;
  description: string;
  media?: string;
  mediaType?: string;
  productLink?: string;
  category?: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  productName?: string;
  currentPrice?: number;
  promotionalPrice?: number;
  storeName?: string;
  createdAt: string;
}

const Reels: React.FC = () => {
  const { toast } = useToast();
  const { reels, loading } = useReels();
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());

  // Mock de dados caso não tenha reels salvos
  const mockReels: Reel[] = [
    {
      id: 'mock-1',
      description: 'Unboxing do melhor kit de skincare que já usei! 🌟 Resultados incríveis em 2 semanas',
      media: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      category: 'Saúde',
      likes: 156,
      comments: 23,
      shares: 12,
      views: 1240,
      productLink: 'https://example.com/skincare',
      productName: 'Kit Skincare Anti-idade Premium',
      currentPrice: 299.90,
      promotionalPrice: 199.90,
      storeName: 'BeautyShop',
      createdAt: new Date().toISOString()
    }
  ];

  // Combinar reels reais com mock se não houver dados
  const allReels = reels.length > 0 ? reels : mockReels;

  const handleLike = (reelId: string) => {
    toast({
      title: "❤️ Curtido!",
      description: "Você curtiu este reel",
    });
  };

  const handleComment = (reelId: string) => {
    toast({
      title: "💬 Comentários",
      description: "Funcionalidade em desenvolvimento",
    });
  };

  const handleShare = (reelId: string) => {
    toast({
      title: "📤 Compartilhado!",
      description: "Link copiado para a área de transferência",
    });
  };

  const togglePlay = (reelId: string) => {
    setPlayingVideo(playingVideo === reelId ? null : reelId);
  };

  const toggleMute = (reelId: string) => {
    const newMutedVideos = new Set(mutedVideos);
    if (mutedVideos.has(reelId)) {
      newMutedVideos.delete(reelId);
    } else {
      newMutedVideos.add(reelId);
    }
    setMutedVideos(newMutedVideos);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const getAuthorName = () => 'Usuário Afiliado'; // Mock author name

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando reels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold text-center">🔥 Reels</h1>
          <p className="text-center text-orange-100 text-sm">Vídeos curtos de produtos incríveis</p>
        </div>

        {/* Reels Feed */}
        {allReels.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum reel ainda
              </h3>
              <p className="text-gray-500">
                Crie seu primeiro reel para aparecer aqui!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {allReels.map((reel) => (
              <Card key={reel.id} className="border-0 rounded-none relative h-screen max-h-[calc(100vh-120px)] overflow-hidden">
                <CardContent className="p-0 relative h-full">
                  {/* Video */}
                  <div className="relative w-full h-full bg-black">
                    {reel.media ? (
                      <video
                        className="w-full h-full object-cover"
                        src={reel.media}
                        loop
                        playsInline
                        muted={mutedVideos.has(reel.id)}
                        autoPlay={playingVideo === reel.id}
                        onClick={() => togglePlay(reel.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">🎥</div>
                          <p className="text-lg">Vídeo não disponível</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Play/Pause Overlay */}
                    {playingVideo !== reel.id && reel.media && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30"
                          onClick={() => togglePlay(reel.id)}
                        >
                          <Play size={32} className="text-white" />
                        </Button>
                      </div>
                    )}

                    {/* Mute/Unmute Button */}
                    {reel.media && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                        onClick={() => toggleMute(reel.id)}
                      >
                        {mutedVideos.has(reel.id) ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </Button>
                    )}
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                    {/* Author Info */}
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {getAuthorName().charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{getAuthorName()}</p>
                        <p className="text-xs text-gray-300">
                          {new Date(reel.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm mb-3 leading-relaxed">{reel.description}</p>

                    {/* Product Info */}
                    {reel.productName && (
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{reel.productName}</p>
                            {reel.storeName && (
                              <p className="text-xs text-gray-300">📍 {reel.storeName}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              {reel.currentPrice && reel.promotionalPrice && (
                                <>
                                  <span className="text-xs line-through text-gray-400">
                                    {formatPrice(reel.currentPrice)}
                                  </span>
                                  <span className="text-sm font-bold text-green-400">
                                    {formatPrice(reel.promotionalPrice)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          {reel.productLink && (
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                              onClick={() => window.open(reel.productLink, '_blank')}
                            >
                              <ExternalLink size={14} className="mr-1" />
                              Ver
                            </Button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Category Tag */}
                    {reel.category && (
                      <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-medium mb-3">
                        {reel.category}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute right-4 bottom-20 flex flex-col space-y-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex flex-col"
                      onClick={() => handleLike(reel.id)}
                    >
                      <Heart size={24} />
                      <span className="text-xs mt-1">{reel.likes}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white flex flex-col"
                      onClick={() => handleComment(reel.id)}
                    >
                      <MessageCircle size={24} />
                      <span className="text-xs mt-1">{reel.comments}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => handleShare(reel.id)}
                    >
                      <Share size={24} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reels;
