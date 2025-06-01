
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useConsumer } from '@/hooks/useConsumer';

interface ProductRatingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
}

export const ProductRatingDialog: React.FC<ProductRatingDialogProps> = ({
  isOpen,
  onClose,
  productName,
  productId
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();
  const { rateProduct } = useConsumer();

  const handleSubmitRating = () => {
    if (rating === 0) {
      toast({
        title: "Selecione uma avaliação",
        description: "Por favor, clique nas estrelas para avaliar o produto.",
        variant: "destructive"
      });
      return;
    }

    const success = rateProduct({
      productId,
      rating,
      review: review.trim() || undefined,
      ratedAt: new Date().toISOString(),
      helpful: 0
    });

    if (success) {
      toast({
        title: "⭐ Avaliação enviada!",
        description: "Obrigado por ajudar outros compradores!",
      });
      onClose();
      setRating(0);
      setReview('');
    } else {
      toast({
        title: "Erro ao enviar avaliação",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            ⭐ Avaliar Produto
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-2">{productName}</h3>
            <p className="text-sm text-gray-600">
              Sua opinião ajuda outros compradores a decidir!
            </p>
          </div>

          {/* Sistema de estrelas */}
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
                className="p-1 transition-colors"
              >
                <Star
                  size={32}
                  className={`${
                    star <= (hoveredStar || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          {rating > 0 && (
            <div className="text-center text-sm font-medium">
              {rating === 1 && "😞 Muito ruim"}
              {rating === 2 && "😐 Ruim"}
              {rating === 3 && "🙂 Regular"}
              {rating === 4 && "😊 Bom"}
              {rating === 5 && "🤩 Excelente"}
            </div>
          )}

          <div>
            <Textarea
              placeholder="Conte sua experiência com o produto (opcional)..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmitRating}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600"
            >
              Enviar Avaliação
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
