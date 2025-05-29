
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

interface Story {
  id: string;
  username: string;
  avatar: string;
  image: string;
  isViewed: boolean;
  isOwn?: boolean;
}

const Stories: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 'own',
      username: 'Seu Story',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      image: '',
      isViewed: false,
      isOwn: true
    },
    {
      id: '1',
      username: 'maria_silva',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=400&fit=crop',
      isViewed: false
    },
    {
      id: '2',
      username: 'joao_santos',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=400&fit=crop',
      isViewed: true
    },
    {
      id: '3',
      username: 'ana_costa',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop',
      isViewed: false
    },
    {
      id: '4',
      username: 'carlos_dev',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&h=400&fit=crop',
      isViewed: false
    },
    {
      id: '5',
      username: 'luana_style',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop',
      isViewed: true
    },
    {
      id: '6',
      username: 'pedro_tech',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=400&fit=crop',
      isViewed: false
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= stories.length - 5 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [stories.length]);

  const handleStoryClick = (story: Story) => {
    if (story.isOwn) {
      // Handle add story
      console.log('Add new story');
    } else {
      // Handle view story
      console.log('View story:', story.username);
      setStories(prev => 
        prev.map(s => s.id === story.id ? { ...s, isViewed: true } : s)
      );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-yellow-200 p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">Stories</h3>
        <div className="text-sm text-gray-500">
          {stories.filter(s => !s.isViewed && !s.isOwn).length} novos
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
          startIndex: currentIndex
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {stories.map((story, index) => (
            <CarouselItem key={story.id} className="pl-2 md:pl-4 basis-auto">
              <div 
                className="flex flex-col items-center space-y-1 cursor-pointer"
                onClick={() => handleStoryClick(story)}
              >
                <div className={`relative p-1 rounded-full ${
                  story.isOwn 
                    ? 'bg-gray-200' 
                    : story.isViewed 
                      ? 'bg-gray-300' 
                      : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'
                }`}>
                  <div className="bg-white p-1 rounded-full">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src={story.avatar} alt={story.username} />
                      <AvatarFallback>{story.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  {story.isOwn && (
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                      <Plus className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <span className={`text-xs text-center max-w-[60px] truncate ${
                  story.isViewed ? 'text-gray-500' : 'text-gray-800'
                }`}>
                  {story.isOwn ? 'Seu Story' : story.username}
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Progress indicator */}
      <div className="flex justify-center mt-3 space-x-1">
        {Array.from({ length: Math.ceil(stories.length / 5) }).map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 rounded-full transition-colors ${
              Math.floor(currentIndex / 5) === index ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;
