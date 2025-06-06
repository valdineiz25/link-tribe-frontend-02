
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share, Play, Pause, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useReels } from '@/hooks/usePosts';
import CommentSection from '@/components/CommentSection';

interface Reel {
  id: string;
  content: string;
  description?: string;
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
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
}

const Reels: React.FC = () => {
  const { toast } = useToast();
  const { reels, loading } = useReels();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [pausedVideos, setPausedVideos] = useState<Set<string>>(new Set());
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [reelStats, setReelStats] = useState<{ [key: string]: { likes: number; comments: number; shares: number } }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [reelComments, setReelComments] = useState<{ [key: string]: any[] }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  useEffect(() => {
    const stats: { [key: string]: { likes: number; comments: number; shares: number } } = {};
    reels.forEach(reel => {
      stats[reel.id] = {
        likes: reel.likes || 0,
        comments: reel.comments || 0,
        shares: reel.shares || 0
      };
    });
    setReelStats(stats);
  }, [reels]);

  const handleLike = (reelId: string) => {
    const isLiked = likedReels.has(reelId);
    
    setLikedReels(prev => {
      const newSet = new Set(prev);
      if (isLiked) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });

    setReelStats(prev => ({
      ...prev,
      [reelId]: {
        ...prev[reelId],
        likes: prev[reelId].likes + (isLiked ? -1 : 1)
      }
    }));

    toast({
      title: isLiked ? "💔 Descurtido!" : "❤️ Curtido!",
      description: isLiked ? "Você descurtiu este reel" : "Você curtiu este reel",
    });
  };

  const togglePlay = (reelId: string) => {
    const video = videoRefs.current[reelId];
    if (video) {
      if (video.paused) {
        video.play();
        setPausedVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(reelId);
          return newSet;
        });
      } else {
        video.pause();
        setPausedVideos(prev => new Set(prev).add(reelId));
      }
    }
  };

  const toggleMute = (reelId: string) => {
    const video = videoRefs.current[reelId];
    if (video) {
      video.muted = !video.muted;
      const newMutedVideos = new Set(mutedVideos);
      if (video.muted) {
        newMutedVideos.add(reelId);
      } else {
        newMutedVideos.delete(reelId);
      }
      setMutedVideos(newMutedVideos);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const getAuthorName = (reel: Reel) => reel.user?.name || 'Usuário Afiliado';

  useEffect(() => {
    const stats: { [key: string]: { likes: number; comments: number; shares: number } } = {};
    reels.forEach(reel => {
      stats[reel.id] = {
        likes: reel.likes || 0,
        comments: reel.comments || 0,
        shares: reel.shares || 0
      };
    });
    setReelStats(stats);
  }, [reels]);

  useEffect(() => {
    if (reels.length > 0 && currentReelIndex < reels.length) {
      const currentReel = reels[currentReelIndex];
      const video = videoRefs.current[currentReel.id];
      
      if (video && !pausedVideos.has(currentReel.id)) {
        video.currentTime = 0;
        video.play().catch(console.error);
      }

      Object.keys(videoRefs.current).forEach(reelId => {
        if (reelId !== currentReel.id) {
          const otherVideo = videoRefs.current[reelId];
          if (otherVideo && !otherVideo.paused) {
            otherVideo.pause();
          }
        }
      });
    }
  }, [currentReelIndex, reels, pausedVideos]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const newIndex = Math.floor(scrollPosition / windowHeight);
      
      if (newIndex !== currentReelIndex && newIndex >= 0 && newIndex < reels.length) {
        setCurrentReelIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentReelIndex, reels.length]);

  const handleComment = (reelId: string) => {
    setShowComments(prev => ({
      ...prev,
      [reelId]: !prev[reelId]
    }));
  };

  const handleAddComment = (reelId: string, content: string) => {
    const newComment = {
      id: Date.now().toString(),
      author: 'Você',
      content,
      timestamp: 'agora',
      likes: 0
    };

    setReelComments(prev => ({
      ...prev,
      [reelId]: [...(prev[reelId] || []), newComment]
    }));

    setReelStats(prev => ({
      ...prev,
      [reelId]: {
        ...prev[reelId],
        comments: prev[reelId].comments + 1
      }
    }));

    setShowComments(prev => ({
      ...prev,
      [reelId]: false
    }));
  };

  const handleShare = (reelId: string) => {
    setReelStats(prev => ({
      ...prev,
      [reelId]: {
        ...prev[reelId],
        shares: prev[reelId].shares + 1
      }
    }));

    if (navigator.share) {
      navigator.share({
        title: 'Reel incrível da AffiliateNet',
        text: 'Confira este reel incrível!',
        url: window.location.href,
      }).then(() => {
        toast({
          title: "📤 Compartilhado!",
          description: "Reel compartilhado com sucesso",
        });
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "📤 Link copiado!",
          description: "Link copiado para a área de transferência",
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "📤 Link copiado!",
        description: "Link copiado para a área de transferência",
      });
    }
  };

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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 shadow-lg">
          <h1 className="text-2xl font-bold text-center">🔥 Reels</h1>
          <p className="text-center text-orange-100 text-sm">Vídeos curtos de produtos incríveis</p>
        </div>

        {/* Reels Feed */}
        {reels.length === 0 ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Nenhum reel ainda
              </h3>
              <p className="text-gray-500 mb-4">
                Crie seu primeiro reel para aparecer aqui!
              </p>
              <Button
                onClick={() => window.location.href = '/create-post'}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Criar Reel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-4">
            {reels.map((reel, index) => (
              <Card key={reel.id} className="border-0 rounded-lg overflow-hidden shadow-lg">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Video Section */}
                    <div className="lg:w-1/2 relative bg-black aspect-[9/16] lg:aspect-video">
                      {reel.media ? (
                        <video
                          ref={(el) => { videoRefs.current[reel.id] = el; }}
                          className="w-full h-full object-cover"
                          src={reel.media}
                          loop
                          playsInline
                          muted={mutedVideos.has(reel.id)}
                          onClick={() => togglePlay(reel.id)}
                          onLoadedData={() => {
                            if (index === currentReelIndex && !pausedVideos.has(reel.id)) {
                              const video = videoRefs.current[reel.id];
                              if (video) {
                                video.currentTime = 0;
                                video.play().catch(console.error);
                              }
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                          <div className="text-center text-white p-8">
                            <div className="text-6xl mb-4">📝</div>
                            <p className="text-xl font-semibold mb-2">{reel.content}</p>
                            {reel.category && (
                              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                                {reel.category}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Play/Pause Overlay */}
                      {pausedVideos.has(reel.id) && reel.media && (
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

                    {/* Caption and Info Section */}
                    <div className="lg:w-1/2 p-6 bg-white flex flex-col justify-between">
                      {/* Author Info */}
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            {getAuthorName(reel).charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{getAuthorName(reel)}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(reel.createdAt).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-800 mb-4 leading-relaxed">{reel.content || reel.description}</p>

                        {/* Category Tag */}
                        {reel.category && (
                          <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {reel.category}
                          </div>
                        )}

                        {/* Product Info */}
                        {reel.productName && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">{reel.productName}</p>
                                {reel.storeName && (
                                  <p className="text-sm text-gray-600">📍 {reel.storeName}</p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  {reel.currentPrice && reel.promotionalPrice && (
                                    <>
                                      <span className="text-sm line-through text-gray-500">
                                        {formatPrice(reel.currentPrice)}
                                      </span>
                                      <span className="text-lg font-bold text-green-600">
                                        {formatPrice(reel.promotionalPrice)}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              {reel.productLink && (
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white ml-4"
                                  onClick={() => window.open(reel.productLink, '_blank')}
                                >
                                  <ExternalLink size={14} className="mr-1" />
                                  Ver Produto
                                </Button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - Now at the bottom */}
                  <div className="bg-white border-t px-6 py-4">
                    <div className="flex justify-around">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center space-x-2 ${
                          likedReels.has(reel.id) ? 'text-red-500' : 'text-gray-600'
                        }`}
                        onClick={() => handleLike(reel.id)}
                      >
                        <Heart size={20} className={likedReels.has(reel.id) ? 'fill-current' : ''} />
                        <span>{reelStats[reel.id]?.likes || 0}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 text-gray-600"
                        onClick={() => handleComment(reel.id)}
                      >
                        <MessageCircle size={20} />
                        <span>{reelStats[reel.id]?.comments || 0}</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 text-gray-600"
                        onClick={() => handleShare(reel.id)}
                      >
                        <Share size={20} />
                        <span>{reelStats[reel.id]?.shares || 0}</span>
                      </Button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {showComments[reel.id] && (
                    <div className="bg-gray-50 p-4 border-t">
                      <CommentSection
                        isOpen={showComments[reel.id]}
                        onClose={() => setShowComments(prev => ({ ...prev, [reel.id]: false }))}
                        comments={reelComments[reel.id] || []}
                        onAddComment={(content) => handleAddComment(reel.id, content)}
                      />
                    </div>
                  )}
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
